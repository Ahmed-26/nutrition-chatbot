# Nutrition Chatbot

A full-stack AI-powered nutrition chatbot with a modern React + TailwindCSS frontend and a FastAPI backend. The bot acts as a professional, friendly nutritionist, providing personalized plans, meal suggestions, and nutrition info.

## Features

- Dynamic chat UI with emoji and typing effects
- Sequential Q&A for user profiling
- Personalized dashboard: calories, macros, meal plans, charts
- Google AI Studio API integration
- Real-time updates and smooth animations
- Professional, friendly nutritionist personality

## Project Structure

```
nutrition-chatbot/
│── frontend/ (React + Tailwind)
│    ├── src/components/ChatUI.jsx
│    ├── src/components/NutritionDashboard.jsx
│    ├── src/pages/Home.jsx
│    └── ...
│
│── backend/ (FastAPI)
│    ├── main.py
│    ├── routes/chat.py
│    ├── routes/analyze.py
│    ├── routes/mealplan.py
│    └── ...
│
│── .env (store Google AI API key)
│── README.md
```

## Setup

See each folder for setup instructions. Store your Google AI API key in `.env`.
