
# Task Manager – Full Stack Application

## Overview
A production-ready task management web app with JWT authentication, CRUD operations, AI-powered task suggestions (Gemini), and dark mode. Built for the Full Stack Developer assignment.

## Tech Stack & Why
| Layer | Technology | Reason |
|-------|------------|--------|
| Frontend | React + React Router + Axios | Fast, component-based, and widely used. Context API for state (lightweight). |
| Styling | TailwindCSS | Utility-first for rapid, responsive UI with dark mode support. |
| Backend | FastAPI | Python, async support, automatic OpenAPI docs, and fast development. |
| ORM | SQLAlchemy | Full-featured ORM with Alembic for migrations. |
| Database | PostgreSQL (SQLite for local dev) | Reliable, production-ready, and free on Render. |
| Auth | JWT + Bcrypt | Stateless, secure, and standard. |
| AI | Google Gemini (1.5 Flash) | Free tier, easy API, and great for generating text. |

## Features
- User signup/login with JWT (password hashed with Bcrypt).
- Full CRUD for tasks: title, description, due date, priority (LOW/MEDIUM/HIGH), status (TODO/IN_PROGRESS/DONE).
- Filter tasks by status or priority.
- **AI Suggest**: type a rough title, click the button – Gemini generates a professional description and suggests priority.
- Dark mode toggle (persisted in localStorage).
- Fully responsive (mobile, tablet, desktop).

## Project Structure
backend/
├── app/
│ ├── api/v1/ # Auth, Tasks, AI endpoints
│ ├── core/ # Config, DB, Security
│ ├── models/ # SQLAlchemy models
│ ├── schemas/ # Pydantic schemas
│ ├── services/ # Business logic (Auth, Task, AI)
│ ├── repositories/ # DB operations
│ └── utils/ # Exception handlers
├── .env # Environment variables
└── requirements.txt

frontend/
├── src/
│ ├── components/ # Reusable UI (Login, Signup, TaskList, TaskForm, etc.)
│ ├── context/ # AuthContext, ThemeContext
│ ├── pages/ # Dashboard, LoginPage, SignupPage
│ ├── services/ # API calls (auth, tasks, ai)
│ └── utils/ # Constants
├── .env # REACT_APP_API_URL
└── package.json

### Prerequisites
- Python 3.10+, Node.js 18+, npm, git.

