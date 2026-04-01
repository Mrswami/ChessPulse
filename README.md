# ♟️ ChessPulse: The Global Aggrigator

## The Problem
The chess world is a fragmented mess. If you want to know what's happening at the highest levels, you have to follow discord pings, Twitter (X) announcements, buried "Events" tabs on Chess.com and Lichess, scroll through FIDE rating portals, or catch podcast drops from C-Squared or GothamChess.

There are existing GitHub repositories and tools out there (such as *The-Chess-Centre/events* or *TourneyRadar*), but they often suffer from the following:
- **Hyper-Localized:** They only track local UK, US, or regional Over-the-Board (OTB) club tournaments.
- **Platform Siloed:** They are strictly locked to Lichess data or Chess.com data, ignoring the global picture.
- **No Media Context:** They lack modern integration, missing when top streamers or GMs are actively participating or hyping an event in real-time.

## The ChessPulse Mission (Our Value Proposition)
**ChessPulse** provides a single, streamlined "News & Schedule" feed that synthesizes online, physical, and media-driven chess events into a single heartbeat. 

We differ from existing projects by focusing on a **Unified Event Schema** and the introduction of a **"Hype Meter" algorithm**. 
Instead of just a boring calendar, ChessPulse ranks tournaments by momentum: Are top players live-streaming it? Did major podcasts just talk about it? How many GMs are registered?

### The Data Sources (The Ingestors)
1. **Major Online:** Titled Tuesday, Arena Kings, Bullet Brawls (via Chess.com PubAPI).
2. **Community Online:** Lichess Titled Arenas, Team Battles (via Lichess API).
3. **Official OTB:** FIDE Candidates, Grand Chess Tour, Olympiad (via FIDE Ratings Portal Scraper).
4. **National/Club:** USCF Nationals, ECF events, State Opens.
5. **Media/Social:** Twitch/YouTube stream stats, C-Squared/Chicken Chess podcast transcript tags.

## Core Infrastructure
ChessPulse relies on a normalization pipeline:
- **FastAPI / Python Backend:** Pulls, standardizes (JSON schemas), and deduplicates overlapping broadcasts.
- **Deduplication Logic:** Fuzzy matching on title and date to merge sources (e.g., FIDE + Lichess + Chess.com broadcasts of the Candidates Tournament become ONE entry).
- **Redis / PostgreSQL / Firebase:** Securely caches external API calls and acts as our robust data layer.

## How to Get Started Locally
1. Clone the repository.
2. Ensure you have Python 3.10+ installed.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

Welcome to the future of chess spectating.
