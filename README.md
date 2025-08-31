# Nutrition Chatbot

A full-stack web application for nutrition analysis, meal planning, and chat-based guidance. Backend is built with FastAPI (Python), frontend uses React and Tailwind CSS.

## Features

- Chatbot for nutrition advice
- Food analysis and calorie calculation
- Personalized meal planning
- Modern, responsive UI

## Project Structure

```
nutrition-chatbot/
├── backend/        # FastAPI backend (Python)
│   ├── main.py     # FastAPI app entry point
│   ├── run.py      # Script to run backend (development)
│   ├── requirements.txt
│   ├── routes/     # API route modules
│   └── ...
├── frontend/       # React frontend (JavaScript)
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md       # Project documentation
```

## How to Run the Project

### Prerequisites

- Python 3.10+
- Node.js (v16+ recommended)
- npm (comes with Node.js)

### 1. Backend (FastAPI)

1. Open a terminal and navigate to the `backend` directory:
   ```powershell
   cd backend
   ```
2. Install Python dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
3. Start the backend server (development):
   ```powershell
   python run.py
   ```
   The FastAPI server will run at http://localhost:8000

### 2. Frontend (React)

1. Open a terminal and navigate to the `frontend` directory:
   ```powershell
   cd frontend
   ```
2. Install Node.js dependencies:
   ```powershell
   npm install
   ```
3. Start the frontend development server:
   ```powershell
   npm start
   ```
   The React app will run at http://localhost:3000

## Deployment

- For production, deploy the backend on a cloud platform (e.g., Fly.io, Render, AWS) and use Cloudflare for DNS, SSL, and proxying.
- The frontend can be deployed on Vercel, Netlify, or Cloudflare Pages.

## License

This project is for educational purposes. Please review and update the license as needed.
