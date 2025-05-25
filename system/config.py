"""Config"""

from os import getenv
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

APP_NAME = "Gen7"
APP_DESC = "Gamble your way; seeing whatever"

IS_PROD = getenv("PROD", "false") == "true"
CONFIG_NAME = "gen7.rimuaerisya.net"
CONFIG_DIR = (Path("~").expanduser().resolve() if IS_PROD else Path("transient")) / (
    f".{CONFIG_NAME}" if IS_PROD else CONFIG_NAME
)

if not CONFIG_DIR.exists():
    CONFIG_DIR.mkdir()
