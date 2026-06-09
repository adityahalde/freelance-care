import hashlib
import os
import secrets
import sqlite3
import uuid
from datetime import datetime, timedelta

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

from auth_utils import (
    admin_required,
    create_token,
    hash_password,
    login_required,
    verify_password,
)
from config import (
    ALLOWED_EXTENSIONS,
    BASE_DIR,
    MAX_CONTENT_LENGTH,
    SUPPORT_EMAIL,
    SUPPORT_HOURS,
    SUPPORT_PHONE,
    UPLOAD_FOLDER,
)
from database import get_db, init_db, row_to_dict
from validators import is_valid_email, sanitize_text, validate_password

app = Flask(__name__, static_folder="static", static_url_path="/static")
app.config["MAX_CONTENT_LENGTH"] = MAX_CONTENT_LENGTH
CORS(app, resources={r"/api/*": {"origins": "*"}})

FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def save_upload(file):
    if not file or file.filename == "":
        return None
    if not allowed_file(file.filename):
        return None
    ext = file.filename.rsplit(".", 1)[1].lower()
    filename = f"{uuid.uuid4().hex}.{ext}"
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    path = os.path.join(UPLOAD_FOLDER, secure_filename(filename))
    file.save(path)
    return f"/static/uploads/{filename}"


# ---------- Frontend routes ----------


@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.route("/<path:page>")
def frontend_pages(page):
    if page.startswith("api/") or page.startswith("static/"):
        return jsonify({"error": "Not found"}), 404
    file_path = os.path.join(FRONTEND_DIR, page)
    if os.path.isfile(file_path):
        return send_from_directory(FRONTEND_DIR, page)
    html_path = page if page.endswith(".html") else f"{page}.html"
    full = os.path.join(FRONTEND_DIR, html_path)
    if os.path.isfile(full):
        return send_from_directory(FRONTEND_DIR, html_path)
    return send_from_directory(FRONTEND_DIR, "index.html")


# ---------- Public site config ----------


def _hash_reset_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def _create_password_reset_token(user_id: int) -> str:
    token = secrets.token_urlsafe(24)
    expires_at = (datetime.utcnow() + timedelta(hours=1)).strftime("%Y-%m-%d %H:%M:%S")
    with get_db() as conn:
        conn.execute(
            "DELETE FROM password_reset_tokens WHERE user_id = ?",
            (user_id,),
        )
        conn.execute(
            "INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
            (user_id, _hash_reset_token(token), expires_at),
        )
    return token


@app.route("/api/site-config", methods=["GET"])
def site_config():
    return jsonify(
        {
            "support_phone": SUPPORT_PHONE,
            "support_email": SUPPORT_EMAIL,
            "support_hours": SUPPORT_HOURS,
        }
    )


# ---------- Auth API ----------


@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    name = sanitize_text(data.get("name"), 100)
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 400
    if not is_valid_email(email):
        return jsonify({"error": "Invalid email address"}), 400
    pwd_error = validate_password(password)
    if pwd_error:
        return jsonify({"error": pwd_error}), 400

    try:
        with get_db() as conn:
            conn.execute(
                "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
                (name, email, hash_password(password), "customer"),
            )
            user = conn.execute(
                "SELECT id, name, email, role FROM users WHERE email = ?", (email,)
            ).fetchone()
    except sqlite3.IntegrityError:
        return jsonify({"error": "Email already registered"}), 409

    user = row_to_dict(user)
    token = create_token(user["id"], user["email"], user["role"])
    return jsonify({"user": user, "token": token}), 201


@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    with get_db() as conn:
        row = conn.execute(
            "SELECT id, name, email, password_hash, role FROM users WHERE email = ?",
            (email,),
        ).fetchone()

    if not row or not verify_password(row["password_hash"], password):
        return jsonify({"error": "Invalid email or password"}), 401

    user = {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "role": row["role"],
    }
    token = create_token(user["id"], user["email"], user["role"])
    return jsonify({"user": user, "token": token})


@app.route("/api/auth/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()

    if not email or not is_valid_email(email):
        return jsonify({"error": "Please provide a valid email address."}), 400

    with get_db() as conn:
        user = conn.execute(
            "SELECT id, email FROM users WHERE email = ?",
            (email,),
        ).fetchone()

    if user:
        _create_password_reset_token(user["id"])

    return jsonify({"message": "If an account exists, a reset link has been prepared."})


@app.route("/api/auth/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json() or {}
    token = (data.get("token") or "").strip()
    password = data.get("password") or ""

    if not token or not password:
        return jsonify({"error": "A reset token and new password are required."}), 400

    pwd_error = validate_password(password)
    if pwd_error:
        return jsonify({"error": pwd_error}), 400

    token_hash = _hash_reset_token(token)
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    with get_db() as conn:
        reset_record = conn.execute(
            "SELECT id, user_id, expires_at FROM password_reset_tokens WHERE token_hash = ? AND used_at IS NULL",
            (token_hash,),
        ).fetchone()

        if not reset_record or now > reset_record["expires_at"]:
            return jsonify({"error": "This reset link is invalid or has expired."}), 400

        conn.execute(
            "UPDATE users SET password_hash = ? WHERE id = ?",
            (hash_password(password), reset_record["user_id"]),
        )
        conn.execute(
            "UPDATE password_reset_tokens SET used_at = ? WHERE id = ?",
            (now, reset_record["id"]),
        )

    return jsonify({"message": "Password updated successfully."})


@app.route("/api/auth/me", methods=["GET"])
@login_required
def me():
    return jsonify({"user": request.current_user})


# ---------- Newsletter ----------


@app.route("/api/newsletter", methods=["POST"])
def newsletter_subscribe():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    if not is_valid_email(email):
        return jsonify({"error": "Please enter a valid email address"}), 400

    try:
        with get_db() as conn:
            conn.execute(
                "INSERT INTO newsletter_subscribers (email) VALUES (?)", (email,)
            )
    except sqlite3.IntegrityError:
        return jsonify({"message": "You are already subscribed!"}), 200

    return jsonify({"message": "Successfully subscribed to Urban Edge newsletter!"}), 201


# ---------- Products API ----------


@app.route("/api/products", methods=["GET"])
def list_products():
    category = request.args.get("category", "").strip()
    search = request.args.get("search", "").strip()
    featured = request.args.get("featured", "")

    query = "SELECT * FROM products WHERE 1=1"
    params = []
    if category:
        query += " AND category = ?"
        params.append(category)
    if search:
        query += " AND (name LIKE ? OR description LIKE ? OR category LIKE ?)"
        term = f"%{search}%"
        params.extend([term, term, term])
    query += " ORDER BY created_at DESC"
    if featured == "1":
        query += " LIMIT 4"

    with get_db() as conn:
        rows = conn.execute(query, params).fetchall()
    return jsonify({"products": [row_to_dict(r) for r in rows]})


@app.route("/api/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    with get_db() as conn:
        row = conn.execute(
            "SELECT * FROM products WHERE id = ?", (product_id,)
        ).fetchone()
    if not row:
        return jsonify({"error": "Product not found"}), 404
    return jsonify({"product": row_to_dict(row)})


@app.route("/api/products/categories", methods=["GET"])
def categories():
    with get_db() as conn:
        rows = conn.execute(
            "SELECT category, COUNT(*) AS count FROM products GROUP BY category ORDER BY category"
        ).fetchall()
    return jsonify(
        {"categories": [{"name": r["category"], "count": r["count"]} for r in rows]}
    )


# ---------- Admin products ----------


@app.route("/api/admin/products", methods=["POST"])
@admin_required
def create_product():
    if request.content_type and "multipart/form-data" in request.content_type:
        name = sanitize_text(request.form.get("name"), 150)
        price = request.form.get("price")
        description = sanitize_text(request.form.get("description"), 1000)
        category = sanitize_text(request.form.get("category"), 80)
        image_url = save_upload(request.files.get("image"))
    else:
        data = request.get_json() or {}
        name = sanitize_text(data.get("name"), 150)
        price = data.get("price")
        description = sanitize_text(data.get("description"), 1000)
        category = sanitize_text(data.get("category"), 80)
        image_url = data.get("image")

    if not name or price is None or not description or not category:
        return jsonify({"error": "All product fields are required"}), 400

    try:
        price = float(price)
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid price"}), 400

    if price <= 0:
        return jsonify({"error": "Price must be greater than zero"}), 400

    if not image_url:
        image_url = "/static/uploads/placeholder.svg"

    with get_db() as conn:
        cur = conn.execute(
            "INSERT INTO products (name, price, image, description, category) VALUES (?, ?, ?, ?, ?)",
            (name, price, image_url, description, category),
        )
        product_id = cur.lastrowid
        row = conn.execute(
            "SELECT * FROM products WHERE id = ?", (product_id,)
        ).fetchone()

    return jsonify({"product": row_to_dict(row)}), 201


@app.route("/api/admin/products/<int:product_id>", methods=["PUT"])
@admin_required
def update_product(product_id):
    with get_db() as conn:
        existing = conn.execute(
            "SELECT * FROM products WHERE id = ?", (product_id,)
        ).fetchone()
        if not existing:
            return jsonify({"error": "Product not found"}), 404

    if request.content_type and "multipart/form-data" in request.content_type:
        name = sanitize_text(request.form.get("name") or existing["name"], 150)
        price = request.form.get("price", existing["price"])
        description = sanitize_text(
            request.form.get("description") or existing["description"], 1000
        )
        category = sanitize_text(
            request.form.get("category") or existing["category"], 80
        )
        image_url = save_upload(request.files.get("image")) or existing["image"]
    else:
        data = request.get_json() or {}
        name = sanitize_text(data.get("name") or existing["name"], 150)
        price = data.get("price", existing["price"])
        description = sanitize_text(
            data.get("description") or existing["description"], 1000
        )
        category = sanitize_text(data.get("category") or existing["category"], 80)
        image_url = data.get("image", existing["image"])

    try:
        price = float(price)
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid price"}), 400

    with get_db() as conn:
        conn.execute(
            """UPDATE products SET name=?, price=?, image=?, description=?, category=?
               WHERE id=?""",
            (name, price, image_url, description, category, product_id),
        )
        row = conn.execute(
            "SELECT * FROM products WHERE id = ?", (product_id,)
        ).fetchone()

    return jsonify({"product": row_to_dict(row)})


@app.route("/api/admin/products/<int:product_id>", methods=["DELETE"])
@admin_required
def delete_product(product_id):
    with get_db() as conn:
        row = conn.execute(
            "SELECT id FROM products WHERE id = ?", (product_id,)
        ).fetchone()
        if not row:
            return jsonify({"error": "Product not found"}), 404
        conn.execute("DELETE FROM products WHERE id = ?", (product_id,))
    return jsonify({"message": "Product deleted"})


# ---------- Admin stats ----------


@app.route("/api/admin/stats", methods=["GET"])
@admin_required
def admin_stats():
    with get_db() as conn:
        products_count = conn.execute("SELECT COUNT(*) AS c FROM products").fetchone()["c"]
        orders_count = conn.execute("SELECT COUNT(*) AS c FROM orders").fetchone()["c"]
        customers_count = conn.execute(
            "SELECT COUNT(*) AS c FROM users WHERE role = 'customer'"
        ).fetchone()["c"]
        revenue = conn.execute(
            "SELECT COALESCE(SUM(total), 0) AS total FROM orders WHERE status != 'cancelled'"
        ).fetchone()["total"]
        pending_orders = conn.execute(
            "SELECT COUNT(*) AS c FROM orders WHERE status = 'pending'"
        ).fetchone()["c"]
        subscribers = conn.execute(
            "SELECT COUNT(*) AS c FROM newsletter_subscribers"
        ).fetchone()["c"]
        recent_orders = conn.execute(
            """SELECT o.id, o.total, o.status, o.created_at, u.name AS user_name
               FROM orders o JOIN users u ON o.user_id = u.id
               ORDER BY o.created_at DESC LIMIT 5"""
        ).fetchall()

    return jsonify(
        {
            "products_count": products_count,
            "orders_count": orders_count,
            "customers_count": customers_count,
            "revenue": revenue,
            "pending_orders": pending_orders,
            "subscribers_count": subscribers,
            "recent_orders": [row_to_dict(r) for r in recent_orders],
        }
    )


# ---------- Orders API ----------


@app.route("/api/orders", methods=["POST"])
@login_required
def place_order():
    data = request.get_json() or {}
    items = data.get("items") or []
    shipping_address = sanitize_text(data.get("shipping_address"), 300)
    city = sanitize_text(data.get("city"), 80)
    pincode = sanitize_text(data.get("pincode"), 10)
    phone = sanitize_text(data.get("phone"), 15)

    if not items:
        return jsonify({"error": "Cart is empty"}), 400
    if not shipping_address or not city or not pincode or not phone:
        return jsonify({"error": "Shipping address, city, pincode, and phone are required"}), 400
    if not pincode.isdigit() or len(pincode) != 6:
        return jsonify({"error": "Pincode must be a 6-digit Indian PIN code"}), 400
    if len(phone) < 10:
        return jsonify({"error": "Please enter a valid phone number"}), 400

    user_id = request.current_user["id"]
    total = 0.0
    order_lines = []

    with get_db() as conn:
        for item in items:
            product_id = item.get("product_id")
            try:
                quantity = int(item.get("quantity", 1))
            except (TypeError, ValueError):
                return jsonify({"error": "Invalid quantity"}), 400
            if quantity < 1 or quantity > 20:
                return jsonify({"error": "Quantity must be between 1 and 20"}), 400

            product = conn.execute(
                "SELECT id, price, name FROM products WHERE id = ?", (product_id,)
            ).fetchone()
            if not product:
                return jsonify({"error": f"Product not found"}), 400
            line_total = product["price"] * quantity
            total += line_total
            order_lines.append(
                {
                    "product_id": product["id"],
                    "quantity": quantity,
                    "price": product["price"],
                }
            )

        if not order_lines:
            return jsonify({"error": "No valid items in order"}), 400

        cur = conn.execute(
            """INSERT INTO orders (user_id, total, status, shipping_address, phone, city, pincode)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (user_id, total, "pending", shipping_address, phone, city, pincode),
        )
        order_id = cur.lastrowid

        for line in order_lines:
            conn.execute(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                (order_id, line["product_id"], line["quantity"], line["price"]),
            )

        order = conn.execute(
            "SELECT * FROM orders WHERE id = ?", (order_id,)
        ).fetchone()

    return jsonify({"order": row_to_dict(order), "message": "Order placed successfully"}), 201


@app.route("/api/orders", methods=["GET"])
@login_required
def my_orders():
    user = request.current_user
    with get_db() as conn:
        if user["role"] == "admin" and request.args.get("all") == "1":
            orders = conn.execute(
                "SELECT o.*, u.name AS user_name, u.email AS user_email FROM orders o "
                "JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC"
            ).fetchall()
        else:
            orders = conn.execute(
                "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
                (user["id"],),
            ).fetchall()

        result = []
        for order in orders:
            order_dict = row_to_dict(order)
            items = conn.execute(
                """SELECT oi.*, p.name AS product_name, p.image AS product_image
                   FROM order_items oi
                   JOIN products p ON oi.product_id = p.id
                   WHERE oi.order_id = ?""",
                (order["id"],),
            ).fetchall()
            order_dict["items"] = [row_to_dict(i) for i in items]
            result.append(order_dict)

    return jsonify({"orders": result})


@app.route("/api/admin/orders/<int:order_id>/status", methods=["PUT"])
@admin_required
def update_order_status(order_id):
    data = request.get_json() or {}
    status = (data.get("status") or "").strip().lower()
    allowed = {"pending", "processing", "shipped", "delivered", "cancelled"}
    if status not in allowed:
        return jsonify({"error": "Invalid status"}), 400

    with get_db() as conn:
        row = conn.execute("SELECT id FROM orders WHERE id = ?", (order_id,)).fetchone()
        if not row:
            return jsonify({"error": "Order not found"}), 404
        conn.execute("UPDATE orders SET status = ? WHERE id = ?", (status, order_id))
        order = conn.execute("SELECT * FROM orders WHERE id = ?", (order_id,)).fetchone()

    return jsonify({"order": row_to_dict(order)})


@app.errorhandler(413)
def too_large(e):
    return jsonify({"error": "File too large (max 8MB)"}), 413


@app.errorhandler(404)
def not_found(e):
    if request.path.startswith("/api/"):
        return jsonify({"error": "Not found"}), 404
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    init_db()
    print("\n" + "=" * 50)
    print("  URBAN EDGE — Premium Streetwear Store")
    print("=" * 50)
    print("  Shop:   http://127.0.0.1:5000/")
    print("  Admin:  http://127.0.0.1:5000/admin/login.html")
    print("  Admin:  admin@streetwear.com / admin123")
    print("=" * 50 + "\n")
    app.run(debug=True, host="0.0.0.0", port=5000)
