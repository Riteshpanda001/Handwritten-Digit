"""
Unit tests for API prediction routes and history endpoints.
"""
import sys
import os
import io
import base64
from PIL import Image
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app

client = TestClient(app)


def test_predict_canvas_endpoint():
    img = Image.new("L", (28, 28), color=0)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    b64_str = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("utf-8")

    response = client.post("/api/v1/predict/canvas", json={"image_data": b64_str})
    assert response.status_code == 200
    data = response.json()
    assert "predicted_digit" in data
    assert "confidence" in data
    assert "record_id" in data


def test_predict_image_endpoint():
    img = Image.new("L", (28, 28), color=255)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)

    response = client.post(
        "/api/v1/predict/image",
        files={"file": ("digit.png", buf, "image/png")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "predicted_digit" in data


def test_history_endpoints():
    response = client.get("/api/v1/history")
    assert response.status_code == 200
    data = response.json()
    assert "total_count" in data
    assert "records" in data

    # Clear history
    clear_resp = client.delete("/api/v1/history/clear")
    assert clear_resp.status_code == 200
    assert clear_resp.json()["status"] == "success"
