"""
Response formatting helpers.
"""
from typing import Any, Dict


def api_success(data: Any, message: str = "Success") -> Dict[str, Any]:
    return {
        "status": "success",
        "message": message,
        "data": data
    }


def api_error(message: str, code: int = 400) -> Dict[str, Any]:
    return {
        "status": "error",
        "message": message,
        "code": code
    }
