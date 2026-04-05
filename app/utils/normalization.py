import re
from typing import List, Dict

def normalize_title(title: str) -> str:
    """Simplifies titles for fuzzy matching comparisons."""
    # Lowercase, remove year (e.g., 2024, 2026), remove 'Tournament', 'Broadcast', etc.
    s = title.lower()
    s = re.sub(r'20\d{2}', '', s) # Remove years
    s = re.sub(r'\b(tournament|broadcast|fide|championship|open|masters|festival)\b', '', s)
    s = re.sub(r'\s+', '', s) # Strip whitespace for ultimate matching
    return s

def deduplicate_events(events: List[Dict]) -> List[Dict]:
    """
    Merges redundant events into single 'Super Cards'.
    If two events have similar normalized titles, they are merged.
    """
    seen = {}
    merged = []

    for event in events:
        norm_title = normalize_title(event['title'])
        
        if norm_title in seen:
            # Match found! This is the 'Super Card' moment.
            existing = seen[norm_title]
            
            # Merge watch links (uniquely)
            existing['watch_links'] = list(set(existing['watch_links'] + event['watch_links']))
            
            # Append platform tags (uniquely, though the schema is still single-platform for now)
            # We'll adapt it to 'Multi' later
            if event['platform'] not in existing['platform']:
                existing['platform'] = f"{existing['platform']} + {event['platform']}"
            
            # Keep the highest hype score
            existing['hype_score'] = max(existing['hype_score'], event['hype_score'])
            
            # Merge participants
            existing['participants'] = list(set(existing['participants'] + event['participants']))
        else:
            # New event, track it
            # We copy it so we don't modify the source list in place
            seen[norm_title] = event.copy()
            merged.append(seen[norm_title])
            
    return merged
