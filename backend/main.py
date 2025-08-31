from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import chat, analyze, mealplan, calories
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(chat.router, prefix="/v1/chat")
app.include_router(analyze.router, prefix="/v1/analyze")
app.include_router(mealplan.router)
app.include_router(calories.router, prefix="/v1/calories")


@app.get("/")
def root():
    return {"message": "Nutrition Chatbot API is running."}
