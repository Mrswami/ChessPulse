import { useState, useEffect } from 'react'
import './App.css'
import './index.css'

function App() {
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8000/tournaments')
      .then(res => res.json())
      .then(data => {
        setTournaments(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <nav className="glass-nav">
        <div className="nav-brand">♟️ CHESSPULSE</div>
        <div className="nav-links" style={{ display: 'flex', gap: '2rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px' }}>
          <span>LIVE</span>
          <span>UPCOMING</span>
          <span>ARCHIVE</span>
          <button style={{ background: '#646cff', color: 'white', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 800 }}>
            CONNECT
          </button>
        </div>
      </nav>

      <main style={{ marginTop: '8rem' }}>
        <header style={{ marginBottom: '6rem' }}>
          <span className="mission-text">
            <span className="mission-acronym">P.U.L.S.E</span> • Proactive Unified Live Streamlined Elite
          </span>
          <h1>The Global Chess Pipeline</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', fontWeight: 500, lineHeight: 1.6 }}>
            Synthesizing OTB, Online, and Streamer events into a single, high-momentum heartbeat.
          </p>
        </header>

        <section className="tournament-grid">
          {loading ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '10rem 0', opacity: 0.5 }}>
              <div className="pulse-dot" style={{ margin: '0 auto 2rem', width: '20px', height: '20px' }}></div>
              <h2 style={{ letterSpacing: '4px', fontSize: '0.8rem' }}>PULSING THE GLOBE...</h2>
            </div>
          ) : tournaments.map((t) => (
            <div key={t.event_id} className="tournament-card">
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {t.platform?.split(' + ').map(p => (
                    <span key={p} className={`platform-tag ${p.toLowerCase().replace('.', '-') || 'unknown'}`} style={{ marginBottom: '4px' }}>
                      {p}
                    </span>
                  ))}
                </div>
                <span className={`status-badge ${t.status === 'LIVE' ? 'status-live' : ''}`}>
                  {t.status === 'LIVE' && <span className="pulse-dot"></span>}
                  {t.status}
                </span>
              </div>

              <h3 style={{ margin: '0.5rem 0', fontWeight: 800, fontSize: '1.4rem', lineHeight: 1.3 }}>{t.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', margin: '0', fontWeight: 500 }}>
                {t.type} • {t.participants?.length || 0} Registered
              </p>
              
              <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>HYPE INDEX</span>
                  <span style={{ color: t.hype_score > 80 ? '#ff4646' : '#646cff' }}>{t.hype_score}%</span>
                </div>
                <div className="hype-meter">
                  <div className="hype-fill" style={{ width: `${t.hype_score}%`, background: t.hype_score > 80 ? 'linear-gradient(90deg, #646cff, #ff4646)' : '#646cff' }}></div>
                </div>
              </div>

              <button 
                className="watch-btn" 
                onClick={() => t.watch_links?.[0] && window.open(t.watch_links[0], '_blank')}
                style={{ opacity: t.watch_links?.[0] ? 1 : 0.4, cursor: t.watch_links?.[0] ? 'pointer' : 'not-allowed' }}
              >
                {t.status === 'LIVE' ? 'WATCH LIVE' : 'VIEW DETAILS'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
              {t.watch_links?.length > 1 && (
                <div style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.7rem', opacity: 0.3, fontWeight: 700 }}>
                  +{t.watch_links.length - 1} MORE SOURCES
                </div>
              )}
            </div>
          ))}
        </section>
      </main>

      <footer style={{ marginTop: '8rem', paddingBottom: '4rem', color: 'rgba(255,255,255,0.1)', fontSize: '0.7rem', letterSpacing: '2px', fontWeight: 700 }}>
        CHESSPULSE v0.1.0 • POWERED BY FASTAPI & FIREBASE
      </footer>
    </>
  )
}

export default App
