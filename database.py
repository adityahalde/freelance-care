import os
import sqlite3
from contextlib import contextmanager

from werkzeug.security import generate_password_hash

from config import (
    DATABASE_PATH,
    DEFAULT_ADMIN_EMAIL,
    DEFAULT_ADMIN_NAME,
    DEFAULT_ADMIN_PASSWORD,
)


def get_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


@contextmanager
def get_db():
    conn = get_connection()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def ensure_placeholder_images():
    upload_dir = os.path.join(os.path.dirname(__file__), "static", "uploads")
    os.makedirs(upload_dir, exist_ok=True)
    items = [
        ("hoodie.svg", "#2d2d2d", "HOODIE"),
        ("tee.svg", "#3a3a3a", "TEE"),
        ("cargo.svg", "#252525", "CARGO"),
        ("cap.svg", "#1f1f1f", "CAP"),
        ("jacket.svg", "#333333", "JACKET"),
        ("skate-hoodie.svg", "#2a2a2a", "SKATE"),
    ]
    for filename, bg, label in items:
        path = os.path.join(upload_dir, filename)
        if os.path.isfile(path):
            continue
        svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <rect fill="{bg}" width="600" height="600"/>
  <text x="300" y="280" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">{label}</text>
  <text x="300" y="330" font-family="Arial,sans-serif" font-size="14" fill="#c9a962" text-anchor="middle">URBAN EDGE</text>
</svg>'''
        with open(path, "w", encoding="utf-8") as f:
            f.write(svg)


def seed_products(conn):
    ensure_placeholder_images()
    products = [
        (
            "Urban Oversized Hoodie",
            4999,
            "/static/uploads/hoodie.svg",
            "Heavyweight cotton blend hoodie with embroidered logo. Relaxed street fit.",
            "Hoodies",
        ),
        (
            "Classic Logo Tee",
            2499,
            "/static/uploads/tee.svg",
            "Premium soft cotton tee. Minimal front print, bold back graphic.",
            "T-Shirts",
        ),
        (
            "Cargo Street Pants",
            6299,
            "/static/uploads/cargo.svg",
            "Multi-pocket cargo pants with adjustable cuffs. Durable twill fabric.",
            "Pants",
        ),
        (
            "Snapback Cap",
            1999,
            "/static/uploads/cap.svg",
            "Structured 6-panel cap with embroidered patch. One size fits most.",
            "Accessories",
        ),
        (
            "Puffer Street Jacket",
            10999,
            "/static/uploads/jacket.svg",
            "Lightweight insulated puffer with water-resistant shell.",
            "Jackets",
        ),
        (
            "Graphic Skate Hoodie",
            5499,
            "/static/uploads/skate-hoodie.svg",
            "Fleece-lined hoodie with all-over skate-inspired print.",
            "Hoodies",
        ),
    ]
    conn.executemany(
        "INSERT INTO products (name, price, image, description, category) VALUES (?, ?, ?, ?, ?)",
        products,
    )


def migrate_schema(conn):
    """Apply migrations for existing databases."""
    cols = {r[1] for r in conn.execute("PRAGMA table_info(orders)").fetchall()}
    if "shipping_address" not in cols:
        conn.execute("ALTER TABLE orders ADD COLUMN shipping_address TEXT")
    if "phone" not in cols:
        conn.execute("ALTER TABLE orders ADD COLUMN phone TEXT")
    if "city" not in cols:
        conn.execute("ALTER TABLE orders ADD COLUMN city TEXT")
    if "pincode" not in cols:
        conn.execute("ALTER TABLE orders ADD COLUMN pincode TEXT")

    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
        """
    )

    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS password_reset_tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token_hash TEXT NOT NULL UNIQUE,
            expires_at TEXT NOT NULL,
            used_at TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        """
    )

    # Convert legacy USD prices (under ₹500) to INR approximations
    rows = conn.execute("SELECT id, price FROM products WHERE price < 500").fetchall()
    usd_to_inr = {
        59.99: 4999,
        29.99: 2499,
        74.99: 6299,
        24.99: 1999,
        129.99: 10999,
        64.99: 5499,
    }
    for row in rows:
        price = row["price"]
        new_price = usd_to_inr.get(round(price, 2), round(price * 83))
        conn.execute("UPDATE products SET price = ? WHERE id = ?", (new_price, row["id"]))


def init_db():
    ensure_placeholder_images()
    with get_db() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'customer',
                created_at TEXT NOT NULL DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                image TEXT NOT NULL,
                description TEXT NOT NULL,
                category TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                total REAL NOT NULL,
                status TEXT NOT NULL DEFAULT 'pending',
                shipping_address TEXT,
                phone TEXT,
                city TEXT,
                pincode TEXT,
                created_at TEXT NOT NULL DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS order_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                price REAL NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id)
            );

            CREATE TABLE IF NOT EXISTS newsletter_subscribers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                created_at TEXT NOT NULL DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS password_reset_tokens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                token_hash TEXT NOT NULL UNIQUE,
                expires_at TEXT NOT NULL,
                used_at TEXT,
                created_at TEXT NOT NULL DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            """
        )

        migrate_schema(conn)

        admin = conn.execute(
            "SELECT id FROM users WHERE email = ?", (DEFAULT_ADMIN_EMAIL,)
        ).fetchone()
        if not admin:
            conn.execute(
                "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
                (
                    DEFAULT_ADMIN_NAME,
                    DEFAULT_ADMIN_EMAIL,
                    generate_password_hash(DEFAULT_ADMIN_PASSWORD),
                    "admin",
                ),
            )

        count = conn.execute("SELECT COUNT(*) AS c FROM products").fetchone()["c"]
        if count == 0:
            seed_products(conn)


def row_to_dict(row):
    if row is None:
        return None
    return dict(row)
