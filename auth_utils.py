from datetime import datetime, timedelta, timezone
from functools import wraps

import jwt
from flask import request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash

from config import JWT_ALGORITHM, JWT_EXPIRY_HOURS, SECRET_KEY
from database import get_db, row_to_dict


def hash_password(password):
    return generate_password_hash(password)


def verify_password(password_hash, password):
    return check_password_hash(password_hash, password)


def create_token(user_id, email, role):
    payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=JWT_ALGORITHM)


def decode_token(token):
    return jwt.decode(token, SECRET_KEY, algorithms=[JWT_ALGORITHM])


def get_token_from_header():
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        return auth[7:].strip()
    return None


def get_current_user():
    token = get_token_from_header()
    if not token:
        return None
    try:
        payload = decode_token(token)
        user_id = int(payload.get("sub"))
        with get_db() as conn:
            row = conn.execute(
                "SELECT id, name, email, role FROM users WHERE id = ?", (user_id,)
            ).fetchone()
        return row_to_dict(row)
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user = get_current_user()
        if not user:
            return jsonify({"error": "Authentication required"}), 401
        request.current_user = user
        return f(*args, **kwargs)

    return decorated


def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user = get_current_user()
        if not user:
            return jsonify({"error": "Authentication required"}), 401
        if user.get("role") != "admin":
            return jsonify({"error": "Admin access required"}), 403
        request.current_user = user
        return f(*args, **kwargs)

    return decorated
