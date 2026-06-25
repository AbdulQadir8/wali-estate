#!/usr/bin/env python3
"""Local Django run helper."""
import argparse
import os
import subprocess
import sys


def run_command(command: list[str]) -> None:
    subprocess.run([sys.executable, "manage.py", *command], check=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="MAAN Estate Django Backend")
    parser.add_argument("--seed", action="store_true", help="Seed database before starting")
    parser.add_argument("--migrate", action="store_true", help="Run migrations before starting")
    parser.add_argument("--host", default="0.0.0.0", help="Host to bind to")
    parser.add_argument("--port", type=int, default=int(os.getenv("PORT", "8000")), help="Port to bind to")
    args = parser.parse_args()

    if args.migrate:
        run_command(["migrate"])

    if args.seed:
        run_command(["seed_data"])

    run_command(["runserver", f"{args.host}:{args.port}"])


if __name__ == "__main__":
    main()
