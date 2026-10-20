# Writes src/cloudConfig.js from SUPABASE_URL and SUPABASE_KEY (and the testing
# setting TIME_SPEED), taken from the environment or, failing that, from a
# .env file in the project root.
#   serve.py uses this to serve your local .env values to the game.
#   The deploy workflow runs it to build the live site's config:
#     python3 scripts/cloud_config.py > _site/src/cloudConfig.js
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NAMES = ("SUPABASE_URL", "SUPABASE_KEY", "TIME_SPEED")


def read_env_file(path):
    """KEY=VALUE lines; blank lines and # comments are skipped, quotes around values removed."""
    values = {}
    if not path.exists():
        return values
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip("'\"")
    return values


def settings():
    from_file = read_env_file(ROOT / ".env")
    return {name: os.environ.get(name) or from_file.get(name, "") for name in NAMES}


def cloud_config_js():
    s = settings()
    return (
        "// Made by scripts/cloud_config.py from .env (or the deploy's repository variables).\n"
        "// The committed src/cloudConfig.js is the empty, offline version.\n"
        f"export const SUPABASE_URL = {json.dumps(s['SUPABASE_URL'])};\n"
        f"export const SUPABASE_KEY = {json.dumps(s['SUPABASE_KEY'])};\n"
        f"export const TIME_SPEED = {json.dumps(float(s['TIME_SPEED'] or 1))};\n"
    )


if __name__ == "__main__":
    print(cloud_config_js(), end="")
