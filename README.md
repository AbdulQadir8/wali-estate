# Wali Estate

Full-stack real estate platform for MAAN Estate, focused on DHA Lahore properties.

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS + shadcn/ui

**Backend**
- Django
- Django REST Framework
- Django Admin
- Django ORM
- Simple JWT authentication
- PostgreSQL-ready via `DATABASE_URL`
- `uv` for Python dependency management

## Project Structure

```text
Wali_Estate/
├── frontend/              # React frontend
│   └── src/
├── backend/               # Django backend
│   ├── api/               # API routing
│   ├── apps/              # Django apps
│   ├── config/            # Django settings/URLs
│   ├── manage.py
│   ├── pyproject.toml
│   └── uv.lock
└── README.md
```

## Quick Start

Backend:

```bash
cd backend
uv sync
DATABASE_URL=sqlite:///./django_dev.sqlite3 uv run python manage.py migrate
DATABASE_URL=sqlite:///./django_dev.sqlite3 uv run python manage.py seed_data
DATABASE_URL=sqlite:///./django_dev.sqlite3 uv run python manage.py runserver 0.0.0.0:8000
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

URLs:
- Website: `http://localhost:5173`
- Backend API: `http://localhost:8000/api/v1/`
- Django Admin: `http://localhost:8000/admin/`

Seeded admin:
- Username: `admin`
- Password: `admin123`

Change the seeded password before production use.
