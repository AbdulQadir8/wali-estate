"""Production startup helper for Django deployments."""
import os
import subprocess
import sys


def run_command(command: list[str]) -> None:
    subprocess.run(command, check=True)


def main() -> None:
    port = os.getenv("PORT", "8000")

    run_command([sys.executable, "manage.py", "migrate", "--noinput"])
    run_command([sys.executable, "manage.py", "collectstatic", "--noinput"])

    if os.getenv("SEED_DATABASE", "false").lower() == "true":
        run_command([sys.executable, "manage.py", "seed_data"])

    run_command(
        [
            "gunicorn",
            "config.wsgi:application",
            "--bind",
            f"0.0.0.0:{port}",
            "--workers",
            os.getenv("WEB_CONCURRENCY", "3"),
        ]
    )


if __name__ == "__main__":
    main()
