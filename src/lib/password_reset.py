import hashlib
import os


def generate_reset_token():
    return os.urandom(24).hex()


def hash_token(token):
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def is_reset_token_expired(expires_in_ms):
    return expires_in_ms <= 0
