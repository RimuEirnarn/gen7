"""Database"""
from sqlite_database import Database, BaseModel, model, Primary
from .config import CONFIG_DIR

db = Database(CONFIG_DIR / "gen7-hist.db")

@model(db)
class History(BaseModel):
    """History"""
    __schema__ = (Primary('id'),)

    id: str
    is_favorite: bool = False
    description: str = ""

    @classmethod
    def favorites(cls):
        """Select all favorites"""
        return cls.where(is_favorite=True).fetch()
