from fastapi import APIRouter, Request
import os
import requests

router = APIRouter()


@router.post("/")
async def chat_with_bot(request: Request):
    data = await request.json()
    user_message = data.get("message", "")
    session_id = data.get("session_id", "")
    api_key = os.getenv("GOOGLE_AI_API_KEY")
    if not api_key:
        return {
            "reply": "API key not found. Please set GOOGLE_AI_API_KEY in .env.",
            "session_id": session_id,
        }
    try:
        response = requests.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
            params={"key": api_key},
            json={
                "contents": [{"parts": [{"text": user_message}]}],
            },
            timeout=10,
        )
        try:
            response.raise_for_status()
        except Exception as http_err:
            print(f"[ERROR] Google AI API HTTP error: {http_err}")
            print(f"[ERROR] Response content: {response.text}")
            return {"reply": f"API error: {response.text}", "session_id": session_id}
        data = response.json()
        ai_reply = (
            data.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "Sorry, I couldn't process that.")
        )
        return {"reply": ai_reply, "session_id": session_id}
    except Exception as e:
        print(f"[ERROR] Google AI API call failed: {e}")
        return {
            "reply": f"Sorry, I couldn't process that (API error: {e})",
            "session_id": session_id,
        }
