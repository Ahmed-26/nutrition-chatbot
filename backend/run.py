"""
run.py - Entry point to start the FastAPI backend using uvicorn.

Usage:
    python run.py

This script is intended for development use. It runs the FastAPI app defined in main.py
with automatic reload enabled.
"""

import uvicorn

if __name__ == "__main__":
    # Start the FastAPI app with development settings
    # Use import string for reload compatibility
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
