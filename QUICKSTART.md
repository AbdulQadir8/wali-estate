# Quick Start

## Prerequisites

- Python 3.11+
- `uv`
- Node.js 18+
- npm

## Backend

```bash
cd backend
uv sync
DATABASE_URL=sqlite:///./django_dev.sqlite3 uv run python manage.py migrate
DATABASE_URL=sqlite:///./django_dev.sqlite3 uv run python manage.py seed_data
DATABASE_URL=sqlite:///./django_dev.sqlite3 uv run python manage.py runserver 0.0.0.0:8000
```

Backend API: `http://localhost:8000/api/v1/`

Django Admin: `http://localhost:8000/admin/`

Seeded admin: `admin` / `admin123`

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Working Areas

- Property listings with search and filters
- Property detail pages
- Agent profiles
- Blog posts
- Featured, hot, and new listings
- Django Admin content management
