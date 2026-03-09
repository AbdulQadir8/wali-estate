"""
Production-ready run script for Render deployment
"""
import os
import sys

def main():
    """Run the application"""
    # Check if we should seed the database
    should_seed = os.getenv('SEED_DATABASE', 'false').lower() == 'true'

    if should_seed and '--seed' not in sys.argv:
        print("🌱 Seeding database on first deployment...")
        from seed_data import main as seed_main
        try:
            seed_main()
        except Exception as e:
            print(f"⚠️  Seeding failed (may already be seeded): {e}")

    # Start the server
    print("🚀 Starting FastAPI server...")
    import uvicorn

    # Get port from environment (Render provides this)
    port = int(os.getenv('PORT', 8000))

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        log_level="info"
    )

if __name__ == "__main__":
    main()
