"""Run: python -m tests.test_api"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import init_db

init_db()

import app as app_module

client = app_module.app.test_client()


def test_products_list():
    r = client.get("/api/products")
    assert r.status_code == 200
    products = r.get_json()["products"]
    assert len(products) >= 1
    assert products[0]["price"] >= 500  # INR prices


def test_categories():
    r = client.get("/api/products/categories")
    assert r.status_code == 200
    assert "categories" in r.get_json()


def test_register_login_order():
    import uuid
    email = f"pytest_{uuid.uuid4().hex[:8]}@urbanedge.test"
    client.post("/api/auth/register", json={
        "name": "Py Test",
        "email": email,
        "password": "Testpass1",
    })
    r = client.post("/api/auth/login", json={"email": email, "password": "Testpass1"})
    assert r.status_code == 200
    token = r.get_json()["token"]

    products = client.get("/api/products").get_json()["products"]
    r = client.post(
        "/api/orders",
        json={
            "items": [{"product_id": products[0]["id"], "quantity": 1}],
            "shipping_address": "123 Test Street",
            "city": "Mumbai",
            "pincode": "400001",
            "phone": "9876543210",
        },
        headers={"Authorization": f"Bearer {token}"},
    )
    assert r.status_code == 201


def test_newsletter():
    r = client.post("/api/newsletter", json={"email": "news@test.in"})
    assert r.status_code in (200, 201)


def test_admin_stats():
    r = client.post("/api/auth/login", json={
        "email": "admin@streetwear.com",
        "password": "admin123",
    })
    token = r.get_json()["token"]
    r = client.get("/api/admin/stats", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    data = r.get_json()
    assert "revenue" in data
    assert "products_count" in data


def test_frontend_pages():
    for path in ["/", "/products.html", "/cart.html", "/checkout.html", "/admin/login.html"]:
        assert client.get(path).status_code == 200, path


def test_site_config():
    r = client.get("/api/site-config")
    assert r.status_code == 200
    data = r.get_json()
    assert "support_phone" in data
    assert "support_email" in data


def test_admin_orders_visible():
    r = client.post("/api/auth/login", json={
        "email": "admin@streetwear.com",
        "password": "admin123",
    })
    token = r.get_json()["token"]
    r = client.get("/api/orders?all=1", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert "orders" in r.get_json()


def test_customer_cannot_access_admin_stats():
    import uuid
    email = f"pytest_cust_{uuid.uuid4().hex[:8]}@urbanedge.test"
    client.post("/api/auth/register", json={
        "name": "Cust",
        "email": email,
        "password": "Testpass1",
    })
    r = client.post("/api/auth/login", json={"email": email, "password": "Testpass1"})
    token = r.get_json()["token"]
    r = client.get("/api/admin/stats", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 403


if __name__ == "__main__":
    test_products_list()
    test_categories()
    test_register_login_order()
    test_newsletter()
    test_admin_stats()
    test_site_config()
    test_admin_orders_visible()
    test_customer_cannot_access_admin_stats()
    test_frontend_pages()
    print("All tests passed.")
