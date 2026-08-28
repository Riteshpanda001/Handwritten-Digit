"""
Unit tests for API prediction routes and history endpoints.
"""
import sys
import os
import io
import uuid
import base64
from PIL import Image
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app

client = TestClient(app)


def get_auth_headers():
    email = f"testpred_{uuid.uuid4().hex[:8]}@example.com"
    password = "securepassword123"
    reg_resp = client.post("/api/v1/auth/register", json={
        "full_name": "Prediction Tester",
        "email": email,
        "password": password
    })
    token = reg_resp.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_predict_unauthenticated_returns_401():
    img = Image.new("L", (28, 28), color=0)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    b64_str = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")

    response = client.post("/api/v1/predict/canvas", json={"image_data": b64_str})
    assert response.status_code == 401


def test_predict_canvas_endpoint():
    headers = get_auth_headers()
    from PIL import ImageDraw
    img = Image.new("L", (28, 28), color=0)
    draw = ImageDraw.Draw(img)
    draw.line((5, 5, 20, 20), fill=255, width=4)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    b64_str = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")

    response = client.post("/api/v1/predict/canvas", json={"image_data": b64_str}, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "predicted_digit" in data
    assert "confidence" in data
    assert "record_id" in data


def test_predict_empty_canvas_returns_400():
    headers = get_auth_headers()
    img = Image.new("L", (28, 28), color=0)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    b64_str = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")

    response = client.post("/api/v1/predict/canvas", json={"image_data": b64_str}, headers=headers)
    assert response.status_code == 400


def test_predict_image_endpoint():
    headers = get_auth_headers()
    img = Image.new("L", (28, 28), color=255)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)

    response = client.post(
        "/api/v1/predict/image",
        files={"file": ("digit.png", buf, "image/png")},
        headers=headers
    )
    assert response.status_code == 200
    data = response.json()
    assert "predicted_digit" in data


def test_history_endpoints():
    headers = get_auth_headers()
    response = client.get("/api/v1/history", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "total_count" in data
    assert "records" in data

    # Clear history
    clear_resp = client.delete("/api/v1/history/clear", headers=headers)
    assert clear_resp.status_code == 200
    assert clear_resp.json()["status"] == "success"
