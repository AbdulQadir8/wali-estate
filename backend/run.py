#!/usr/bin/env python3
"""
MAAN Estate Backend - Run Script

Usage:
    python run.py              # Start the server
    python run.py --seed       # Seed database and start
    python run.py --reset      # Reset database and seed
"""
import argparse
import sys
import os

# Add the backend directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


def main():
    parser = argparse.ArgumentParser(description="MAAN Estate Backend")
    parser.add_argument("--seed", action="store_true", help="Seed database before starting")
    parser.add_argument("--reset", action="store_true", help="Reset database and seed")
    parser.add_argument("--host", default="0.0.0.0", help="Host to bind to")
    parser.add_argument("--port", type=int, default=8000, help="Port to bind to")
    parser.add_argument("--reload", action="store_true", help="Enable auto-reload")
    
    args = parser.parse_args()
    
    # Handle reset
    if args.reset:
        print("🗑️  Resetting database...")
        from app.db.database import drop_db, init_db
        drop_db()
        init_db()
        print("✅ Database reset complete")
        args.seed = True  # Seed after reset
    
    # Handle seed
    if args.seed:
        print("🌱 Seeding database...")
        from seed_data import main as seed_main
        seed_main()
        print("")
    
    # Start server
    print(f"🚀 Starting MAAN Estate API server...")
    print(f"📍 URL: http://{args.host}:{args.port}")
    print(f"📚 Docs: http://{args.host}:{args.port}/docs")
    print("=" * 50)
    
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=args.host,
        port=args.port,
        reload=args.reload
    )


if __name__ == "__main__":
    main()
