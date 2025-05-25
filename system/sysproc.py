"""System Interface"""

from string import ascii_lowercase, digits
from random import choice
import webview

from .config import APP_DESC, APP_NAME
from .db import History

CHARS = ascii_lowercase + digits
URL = "https://prnt.sc/{code}"


def generate_ids(length: int = 0):
    """Generate IDs for the resource"""
    code = choice(ascii_lowercase) + "".join(choice(CHARS) for _ in range(length))
    try:
        History.create(id=code, is_favorite=False, description="")
    except ValueError:
        return generate_ids(length)
    return code

def create_window(code):
    """Create Window based on code"""
    return webview.create_window(
        f"RANDOM - {code}",
        URL.format(code=code),
        resizable=True,
        maximized=True,
        zoomable=True,
        text_select=True,
    )

class SystemAPI:
    """SystemAPI"""
    WINDOW_LIST: list[webview.Window] = []

    def get_appname(self):
        """Get app name"""
        return APP_NAME

    def get_appdesc(self):
        """Get app description"""
        return APP_DESC

    def func(self):
        """Dummy function"""

    def fav(self, code: str):
        """Favorite an entry"""
        History.first(id=code).update(is_favorite=True)

    def unfav(self, code: str):
        """Unfavorite an entry"""
        History.first(id=code).update(is_favorite=False)

    def generate_id(self, length: int = 5):
        """Generate IDs for the resource"""
        code = generate_ids(length)
        return code

    def dispatch(self, code: str = ""):
        """Generate new window"""
        n = code or generate_ids(5)
        self.WINDOW_LIST.append(create_window(n))
        return n

    def all(self):
        """Return all entries"""
        return [a.to_dict() for a in History.all()]

    def by_favs(self):
        """Return all favorited entries"""
        return [a.to_dict() for a in History.where(is_favorite=True).fetch()]

    def by_id(self, hist_id: str):
        """Return an instance"""
        return History.where(id=hist_id).fetch_one()
