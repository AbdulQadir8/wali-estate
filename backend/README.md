# MAAN Estate Backend API

Django REST API for the MAAN Estate real estate platform. This backend exposes the `/api/v1/...` API contract with Django, Django REST Framework, Django Admin, and Django ORM.

## Tech Stack

- Django
- Django REST Framework
- Django Admin
- Simple JWT
- PostgreSQL via `DATABASE_URL` in production
- SQLite for local development
- `uv` for dependency management

## Quick Start

```bash
cd backend
uv sync
DATABASE_URL=sqlite:///./django_dev.sqlite3 uv run python manage.py migrate
DATABASE_URL=sqlite:///./django_dev.sqlite3 uv run python manage.py seed_data
DATABASE_URL=sqlite:///./django_dev.sqlite3 uv run python manage.py runserver 0.0.0.0:8000
```

Admin panel:

- URL: `http://localhost:8000/admin/`
- Seeded username: `admin`
- Seeded password: `admin123`

Change the seeded password before production use.

## API Endpoints

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`
- `GET /api/v1/auth/me`
- `GET /api/v1/properties/`
- `GET /api/v1/properties/featured`
- `GET /api/v1/properties/hot`
- `GET /api/v1/properties/new`
- `GET /api/v1/properties/stats`
- `GET /api/v1/properties/<id>`
- `GET /api/v1/properties/slug/<slug>`
- `POST /api/v1/properties/`
- `PUT /api/v1/properties/<id>`
- `DELETE /api/v1/properties/<id>`
- `POST /api/v1/properties/<id>/mark-sold`
- `POST /api/v1/properties/<id>/mark-rented`
- `PATCH /api/v1/properties/<id>/status`
- `POST /api/v1/properties/<id>/upload-image`
- `GET /api/v1/agents/`
- `GET /api/v1/blog/`
- `GET /api/v1/users/`

Trailing slashes are optional for API routes.

## Production

Set these environment variables:

```bash
DEBUG=false
SECRET_KEY=change-me
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
ALLOWED_HOSTS=yourdomain.com
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

Run with:

```bash
uv run python start.py
```
