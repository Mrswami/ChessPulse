from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import requests

app = FastAPI(
    title="ChessPulse API",
    description="The Global Chess Tournament Aggregator",
    version="0.1.0",
)

# CORS configuration for local React development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your hosting URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

def fetch_chess_com_tournaments():
    """Simple stub for pulling from Chess.com PubAPI"""
    # Real URL: https://api.chess.com/pub/tournament/ - requires specific tournament subpaths
    # For now, mirroring our unified schema with a small dynamic twist
    return [
        {
            "event_id": "com_tt_01",
            "title": "Titled Tuesday (Blitz)",
            "platform": "Chess.com",
            "type": "Online / Blitz",
            "start_time": "2026-03-24T18:00:00Z",
            "status": "Upcoming",
            "watch_links": ["https://twitch.tv/chess", "https://chess.com/tv"],
            "participants": ["Hikaru", "Magnus", "Alireza"],
            "hype_score": 92
        }
    ]

def fetch_lichess_broadcasts():
    """Simple stub for pulling from Lichess Broadcast API"""
    return [
        {
            "event_id": "li_candidates_01",
            "title": "FIDE Candidates Tournament",
            "platform": "Lichess",
            "type": "OTB",
            "start_time": "2026-04-02T13:00:00Z",
            "status": "LIVE",
            "watch_links": ["https://lichess.org/broadcast"],
            "participants": ["Gukesh", "Caruana", "Nepo"],
            "hype_score": 98
        }
    ]

@app.get("/")
def read_root():
    return {"message": "Welcome to ChessPulse API. Explore /docs for more information."}

@app.get("/tournaments", response_model=List[ChessEvent])
def get_tournaments():
    # In a full ingestor cycle, this would be fueled by a Redis/Firestore cache
    events = fetch_chess_com_tournaments() + fetch_lichess_broadcasts()
    return events
