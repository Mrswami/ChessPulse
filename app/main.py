from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="ChessPulse API",
    description="The Global Chess Tournament Aggregator",
    version="0.1.0",
)

class ChessEvent(BaseModel):
    event_id: str
    title: str
    platform: str
    type: str
    start_time: str
    status: str
    watch_links: List[str]
    participants: List[str]
    hype_score: Optional[int] = 0

@app.get("/")
def read_root():
    return {"message": "Welcome to ChessPulse API. Explore /docs for more information."}

@app.get("/tournaments", response_model=List[ChessEvent])
def get_tournaments():
    # Stub response representing our intended normalized output
    return [
        ChessEvent(
            event_id="uid_123",
            title="Titled Tuesday",
            platform="Chess.com",
            type="Online / Blitz",
            start_time="2026-03-24T18:00:00Z",
            status="Upcoming",
            watch_links=["twitch.tv/chess", "chess.com/tv"],
            participants=["Hikaru", "Magnus"],
            hype_score=100
        )
    ]
