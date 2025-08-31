import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_AI_API_KEY = os.getenv("GOOGLE_AI_API_KEY")

assert (
    GOOGLE_AI_API_KEY
), "Google AI API key not found in .env file. Please set GOOGLE_AI_API_KEY."
