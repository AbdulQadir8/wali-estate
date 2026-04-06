# Quick Start Guide

## Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

## Setup (5 minutes)

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python run.py --seed
```
✅ Backend running at `http://localhost:8000`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend running at `http://localhost:5173`

### 3. Access the Application
- **Website:** http://localhost:5173
- **API Docs:** http://localhost:8000/docs
- **Admin Login:** username: `admin`, password: `admin123`

## What's Working

✅ Property listings with search & filters
✅ Property detail pages
✅ Agent profiles
✅ Blog with posts
✅ Featured properties on home
✅ Full API integration

## Project Structure

```
Wali_Estate/
├── frontend/              # React Frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── sections/      # Page sections
│   │   ├── lib/           # API service & utilities
│   │   └── data/          # Static data (fallback)
│   └── .env               # Frontend config
│
├── backend/               # FastAPI Backend
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── services/     # Business logic
│   │   └── core/         # Config & security
│   ├── seed_data.py      # Database seeding
│   └── .env.example      # Backend config template
│
└── README.md             # Full documentation
```

## Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite 7
- Tailwind CSS + shadcn/ui
- Custom routing

**Backend:**
- FastAPI
- SQLAlchemy + SQLite
- JWT Authentication
- Pydantic validation

## Need Help?

Check the full documentation in `README.md`
