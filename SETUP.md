# Wali Estate - Setup Instructions

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file (optional, defaults work fine):
```bash
cp .env.example .env
```

5. Run the backend with database seeding:
```bash
python run.py --seed
```

The backend will start at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Default credentials: username: `admin`, password: `admin123`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The frontend will start at `http://localhost:5173`

## What's Connected

✅ **Properties API** - Listings page fetches from backend
✅ **Property Details** - Individual property pages load from API
✅ **Agents API** - Agents page fetches from backend
✅ **Blog API** - Blog page fetches from backend
✅ **Featured Properties** - Home page shows featured listings from API
✅ **Filtering & Search** - All filters work with backend API

## API Endpoints Being Used

- `GET /api/v1/properties/` - List properties with filters
- `GET /api/v1/properties/{id}` - Get property details
- `GET /api/v1/properties/featured` - Get featured properties
- `GET /api/v1/agents/` - List all agents
- `GET /api/v1/blog/` - List blog posts
- `GET /api/v1/blog/featured` - Get featured blog posts

## Testing the Integration

1. Start the backend server (port 8000)
2. Start the frontend server (port 5173)
3. Visit `http://localhost:5173`
4. Navigate to:
   - `/listings` - See properties from database
   - `/agents` - See agents from database
   - `/blog` - See blog posts from database
   - Click any property to see details

## Notes

- The frontend gracefully handles loading states
- Error messages display if the backend is unavailable
- All static data imports have been replaced with API calls
- CORS is configured in the backend to allow frontend requests
