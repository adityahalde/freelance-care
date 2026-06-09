# Urban Edge — Premium Indian Streetwear

A full-stack e-commerce store for **Urban Edge**, built with Flask, SQLite, and vanilla HTML/CSS/JavaScript. All prices are in **Indian Rupees (₹)**.

## Quick Start

```bash
pip install -r requirements.txt
python app.py
```

| Page | URL |
|------|-----|
| Store | http://127.0.0.1:5000/ |
| Shop | http://127.0.0.1:5000/products.html |
| Admin | http://127.0.0.1:5000/admin/login.html |

**Admin:** `admin@streetwear.com` / `admin123`

## Features

- Premium homepage (hero, featured products, categories, testimonials, newsletter)
- Product listing with search & category filters
- Product detail pages (click image/title — does not auto-add to cart)
- Cart with quantity controls & free shipping over ₹999
- Dedicated checkout with Indian shipping fields (PIN, phone)
- JWT auth, password validation, order history
- Admin dashboard with revenue/orders stats & product management

## Run Tests

```bash
python -m tests.test_api
```

## Support contact (footer)

Set in environment or copy `.env.example`:

- `SUPPORT_PHONE` — shown in footer; if empty, displays **Contact Support** (email link)
- `SUPPORT_EMAIL` — default `support@urbanedge.in`
- `SUPPORT_HOURS` — default `Mon–Sat, 10am–7pm IST`

## Production Notes

- Set `SECRET_KEY` environment variable
- Change default admin password
- Use gunicorn or similar WSGI server
