# MAAN Estate Backend API

A complete REST API for the MAAN Estate real estate platform built with FastAPI and SQLAlchemy.

## Features

- **Property Management**: CRUD operations for property listings
- **Mark as Sold/Rented**: Special endpoints to update property status
- **Agent Management**: Manage real estate agents
- **Blog System**: Create and manage blog posts
- **User Authentication**: JWT-based authentication
- **File Uploads**: Image upload for properties, agents, and blog posts
- **Filtering & Search**: Advanced filtering for properties
- **Pagination**: Paginated responses for large datasets

## Tech Stack

- **FastAPI**: Modern, fast web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **Pydantic**: Data validation
- **SQLite**: Database (easily switchable to PostgreSQL)
- **Python-Jose**: JWT token handling
- **Passlib**: Password hashing

## Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your settings
```

### 3. Run with Database Seeding

```bash
# Seed database and start server
python run.py --seed

# Or reset database and seed
python run.py --reset
```

### 4. Access the API

- API Base URL: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Alternative Docs: `http://localhost:8000/redoc`

## Default Credentials

After seeding, you can login with:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Important**: Change the default password in production!

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login with username/password
- `POST /api/v1/auth/register` - Register new user
- `GET /api/v1/auth/me` - Get current user info

### Properties
- `GET /api/v1/properties/` - List all properties (with filters)
- `GET /api/v1/properties/featured` - Get featured properties
- `GET /api/v1/properties/hot` - Get hot properties
- `GET /api/v1/properties/new` - Get new properties
- `GET /api/v1/properties/stats` - Get property statistics
- `GET /api/v1/properties/{id}` - Get property by ID
- `GET /api/v1/properties/slug/{slug}` - Get property by slug
- `POST /api/v1/properties/` - Create property (Admin)
- `PUT /api/v1/properties/{id}` - Update property (Admin)
- `DELETE /api/v1/properties/{id}` - Delete property (Admin)
- `POST /api/v1/properties/{id}/mark-sold` - Mark as sold (Admin)
- `POST /api/v1/properties/{id}/mark-rented` - Mark as rented (Admin)
- `PATCH /api/v1/properties/{id}/status` - Change status (Admin)
- `POST /api/v1/properties/{id}/upload-image` - Upload image (Admin)

### Agents
- `GET /api/v1/agents/` - List all agents
- `GET /api/v1/agents/{id}` - Get agent by ID
- `POST /api/v1/agents/` - Create agent (Admin)
- `PUT /api/v1/agents/{id}` - Update agent (Admin)
- `DELETE /api/v1/agents/{id}` - Delete agent (Admin)
- `POST /api/v1/agents/{id}/upload-image` - Upload image (Admin)

### Blog
- `GET /api/v1/blog/` - List all blog posts
- `GET /api/v1/blog/featured` - Get featured posts
- `GET /api/v1/blog/{id}` - Get post by ID
- `GET /api/v1/blog/slug/{slug}` - Get post by slug
- `POST /api/v1/blog/` - Create post (Admin)
- `PUT /api/v1/blog/{id}` - Update post (Admin)
- `DELETE /api/v1/blog/{id}` - Delete post (Admin)
- `POST /api/v1/blog/{id}/upload-image` - Upload image (Admin)

### Users
- `GET /api/v1/users/` - List all users (Admin)
- `GET /api/v1/users/me` - Get current user
- `GET /api/v1/users/{id}` - Get user by ID (Admin)
- `POST /api/v1/users/` - Create user (Admin)
- `PUT /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Delete user (Admin)

## Property Filters

The properties endpoint supports these query parameters:

- `search` - Search in title, location, description
- `property_type` - `sale` or `rent`
- `category` - `Residential Plots`, `Commercial Plots`, `Houses`, etc.
- `status` - `active`, `sold`, `rented`, `pending`, `inactive`
- `location` - Filter by location
- `phase` - Filter by DHA phase
- `min_price` / `max_price` - Price range
- `bedrooms` - Minimum bedrooms
- `is_hot` - Hot listings only
- `is_new` - New listings only
- `is_featured` - Featured listings only
- `page` - Page number (default: 1)
- `page_size` - Items per page (default: 10)
- `sort_by` - Sort field (default: created_at)
- `sort_order` - `asc` or `desc` (default: desc)

## Example Requests

### Create Property (Admin)

```bash
curl -X POST "http://localhost:8000/api/v1/properties/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1 Kanal House in DHA Phase 6",
    "description": "Beautiful house with modern design",
    "price": "PKR 45,000,000",
    "price_numeric": 45000000,
    "location": "DHA Phase 6, Lahore",
    "phase": "Phase 6",
    "property_type": "sale",
    "category": "Houses",
    "bedrooms": 4,
    "bathrooms": 5,
    "area": "1 Kanal",
    "images": ["/images/properties/house1.jpg"],
    "features": ["Modern Design", "Garden", "Security"]
  }'
```

### Mark Property as Sold

```bash
curl -X POST "http://localhost:8000/api/v1/properties/PROPERTY_ID/mark-sold" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sold_price": "PKR 42,000,000",
    "notes": "Sold to Mr. Ahmed"
  }'
```

### List Properties with Filters

```bash
curl "http://localhost:8000/api/v1/properties/?property_type=sale&phase=Phase%206&is_hot=true"
```

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── auth.py          # Authentication endpoints
│   │   │   ├── properties.py    # Property endpoints
│   │   │   ├── agents.py        # Agent endpoints
│   │   │   ├── blog.py          # Blog endpoints
│   │   │   └── users.py         # User endpoints
│   │   └── deps.py              # Dependencies
│   ├── core/
│   │   ├── config.py            # Configuration
│   │   └── security.py          # Security utilities
│   ├── db/
│   │   └── database.py          # Database setup
│   ├── models/
│   │   ├── user.py              # User model
│   │   ├── property.py          # Property model
│   │   ├── agent.py             # Agent model
│   │   └── blog.py              # Blog post model
│   ├── schemas/
│   │   ├── user.py              # User schemas
│   │   ├── property.py          # Property schemas
│   │   ├── agent.py             # Agent schemas
│   │   └── blog.py              # Blog schemas
│   ├── services/
│   │   ├── property_service.py  # Property CRUD
│   │   ├── user_service.py      # User CRUD
│   │   ├── agent_service.py     # Agent CRUD
│   │   └── blog_service.py      # Blog CRUD
│   └── main.py                  # FastAPI app
├── uploads/                     # Uploaded files
├── .env                         # Environment variables
├── requirements.txt             # Dependencies
├── seed_data.py                 # Database seeding
└── run.py                       # Run script
```

## Switching to PostgreSQL

To use PostgreSQL instead of SQLite:

1. Install psycopg2:
```bash
pip install psycopg2-binary
```

2. Update `.env`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/maan_estate
```

## License

MIT License
