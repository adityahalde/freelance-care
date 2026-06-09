import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE_PATH = os.path.join(BASE_DIR, "store.db")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp"}
MAX_CONTENT_LENGTH = 8 * 1024 * 1024

SECRET_KEY = os.environ.get("SECRET_KEY", "streetwear-secret-change-in-production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 72

DEFAULT_ADMIN_EMAIL = "admin@streetwear.com"
DEFAULT_ADMIN_PASSWORD = "admin123"
DEFAULT_ADMIN_NAME = "Store Admin"

# Storefront support (set SUPPORT_PHONE in environment or .env)
SUPPORT_PHONE = os.environ.get("SUPPORT_PHONE", "").strip()
SUPPORT_EMAIL = os.environ.get("SUPPORT_EMAIL", "support@urbanedge.in").strip()
SUPPORT_HOURS = os.environ.get("SUPPORT_HOURS", "Mon–Sat, 10am–7pm IST").strip()
