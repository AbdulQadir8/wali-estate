# Wali Estate

Full-stack real estate platform for MAAN Estate - DHA Lahore properties.

## 🌐 Live Demo
- **Frontend:** [Coming Soon]
- **Backend API:** [Coming Soon]
- **API Docs:** [Coming Soon]

## 🚀 Tech Stack

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

## 📁 Project Structure

```
Wali_Estate/
├── app/                    # React Frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # API service
│   │   └── ...
│   └── vercel.json        # Vercel config
│
├── backend/               # FastAPI Backend
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── models/       # Database models
│   │   ├── services/     # Business logic
│   │   └── ...
│   ├── requirements.txt
│   └── run.py
│
└── DEPLOYMENT.md         # Deployment guide
```

## 🏃 Quick Start

### Local Development

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python run.py --seed
```
Backend: http://localhost:8000

**Frontend:**
```bash
cd app
npm install
npm run dev
```
Frontend: http://localhost:5173

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
1. Push to GitHub
2. Deploy backend to Render
3. Deploy frontend to Vercel

## 📚 Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [SETUP.md](SETUP.md) - Setup instructions

## 🔑 Default Credentials

- Username: `admin`
- Password: `admin123`

⚠️ Change in production!

## 📄 License

MIT License
