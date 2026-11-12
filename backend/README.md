# Handwritten Digit Classifier — Backend

For full project documentation, architecture, API endpoints, and frontend setup, see the [root README](../README.md).

## Backend Commands

From the `backend/` directory:

1. **Create and activate a virtual environment**

   ```bash
   python -m venv venv
   ```

   - Windows (PowerShell): `.\venv\Scripts\Activate.ps1`
   - Windows (CMD): `venv\Scripts\activate.bat`
   - macOS / Linux: `source venv/bin/activate`

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**

   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env

   # macOS / Linux
   cp .env.example .env
   ```

   Set a strong `SECRET_KEY` in `.env` before running in production.

4. **Run the API server**

   ```bash
   uvicorn app.main:app --reload
   ```

5. **Run the test suite**

   ```bash
   python -m pytest
   ```
