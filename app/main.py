from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import requests
import firebase_admin
from ingestors.lichess import fetch_lichess_broadcasts
from ingestors.chesscom import fetch_chess_com_events
from ingestors.fide import fetch_fide_major_events
from utils.normalization import deduplicate_events
from utils.cache import get_cached_tournaments, set_cached_tournaments

# Automatic initialization for Cloud Run (uses Default Service Credentials)
try:
    firebase_admin.initialize_app()
except ValueError:
    pass # Already initialized

app = FastAPI(
    title="ChessPulse API",
    description="The Global Chess Tournament Aggregator",
    version="0.2.0", # Bumped version for OTB & Cache update
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

@app.get("/")
def read_root():
    return {"message": "Welcome to ChessPulse API. Explore /docs for more information."}

@app.get("/tournaments", response_model=List[ChessEvent])
def get_tournaments():
    # 1. CHECK CACHE FIRST (Speed & Reliability)
    cached_data = get_cached_tournaments()
    if cached_data:
        return cached_data

    # 2. CACHING MISS: Fetch all raw data from current sources
    # Pulse is now fully global: Online (2 major) + OTB (Official FIDE)
    all_raw_events = (
        fetch_lichess_broadcasts() + 
        fetch_chess_com_events() + 
        fetch_fide_major_events()
    )
    
    # 3. NORMALIZE: Apply the 'Super Card' deduplication engine
    unified_events = deduplicate_events(all_raw_events)
    
    # 4. SORT: Ensure they are sorted globally by the final hype score
    unified_events.sort(key=lambda x: x['hype_score'], reverse=True)
    
    # 5. UPDATE CACHE: Save for the next users
    set_cached_tournaments(unified_events)
    
    return unified_events
