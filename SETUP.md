# Setup

## Backend

```bash
cd backend
cp .env.example .env
uv sync
uv run python manage.py migrate
uv run python manage.py seed_data
uv run python manage.py runserver 0.0.0.0:8000
```

For local SQLite without editing `.env`:

```bash
DATABASE_URL=sqlite:///./django_dev.sqlite3 uv run python manage.py migrate
DATABASE_URL=sqlite:///./django_dev.sqlite3 uv run python manage.py seed_data
DATABASE_URL=sqlite:///./django_dev.sqlite3 uv run python manage.py runserver 0.0.0.0:8000
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints Used By The Frontend

- `GET /api/v1/properties/`
- `GET /api/v1/properties/<id>`
- `GET /api/v1/properties/slug/<slug>`
- `GET /api/v1/properties/featured`
- `GET /api/v1/properties/hot`
- `GET /api/v1/properties/new`
- `GET /api/v1/agents/`
- `GET /api/v1/blog/`
- `GET /api/v1/blog/featured`
- `POST /api/v1/auth/login`

## Admin

Use `http://localhost:8000/admin/` to manage properties, agents, blog posts, and users.
