"""Generate product placeholder images. Run once after clone."""
import os

BASE = os.path.join(os.path.dirname(__file__), "..", "static", "uploads")
PRODUCTS = [
    ("hoodie.jpg", "#2d2d2d", "HOODIE"),
    ("tee.jpg", "#3a3a3a", "TEE"),
    ("cargo.jpg", "#252525", "CARGO"),
    ("cap.jpg", "#1f1f1f", "CAP"),
    ("jacket.jpg", "#333333", "JACKET"),
    ("skate-hoodie.jpg", "#2a2a2a", "SKATE"),
]


def svg(label, bg):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <rect fill="{bg}" width="600" height="600"/>
  <text x="300" y="280" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">{label}</text>
  <text x="300" y="330" font-family="Arial,sans-serif" font-size="14" fill="#888" text-anchor="middle">STREETWEAR</text>
</svg>'''


def main():
    os.makedirs(BASE, exist_ok=True)
    for name, bg, label in PRODUCTS:
        path = os.path.join(BASE, name.replace(".jpg", ".svg"))
        with open(path, "w", encoding="utf-8") as f:
            f.write(svg(label, bg))
    print("Created placeholder SVGs in static/uploads/")


if __name__ == "__main__":
    main()
