import re

EMAIL_RE = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")


def is_valid_email(email):
    return bool(email and EMAIL_RE.match(email))


def sanitize_text(text, max_length=500):
    if not text:
        return ""
    text = str(text).strip()
    text = re.sub(r"<[^>]+>", "", text)
    return text[:max_length]


def validate_password(password):
    if len(password) < 8:
        return "Password must be at least 8 characters"
    if not re.search(r"[A-Za-z]", password):
        return "Password must contain at least one letter"
    if not re.search(r"\d", password):
        return "Password must contain at least one number"
    return None
