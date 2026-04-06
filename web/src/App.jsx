import { useState, useEffect } from 'react'
import './App.css'
import './index.css'

function App() {
  const [tournaments, setTournaments] = useState([])
  const [filteredTournaments, setFilteredTournaments] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState(null) // null, 'loading', 'success', 'error'

  useEffect(() => {
    fetch('http://localhost:8000/tournaments')
      .then(res => res.json())
      .then(data => {
        setTournaments(data)
        setFilteredTournaments(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const query = searchQuery.toLowerCase()
    const filtered = tournaments.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.platform.toLowerCase().includes(query) ||
      t.type.toLowerCase().includes(query)
    )
    setFilteredTournaments(filtered)
  }, [searchQuery, tournaments])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setSubStatus('loading')
    try {
      const res = await fetch('http://localhost:8000/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (res.ok) {
        setSubStatus('success')
        setEmail('')
      } else {
        setSubStatus('error')
      }
    } catch (err) {
      setSubStatus('error')
    }
  }

  return (
    <>
      <nav className="glass-nav">
        <div className="nav-brand">♟️ CHESSPULSE</div>
        <div className="nav-links">
          <div className="search-container">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="SEARCH PULSE..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <span className="nav-item">LIVE</span>
          <span className="nav-item">UPCOMING</span>
          <button className="connect-btn">CONNECT</button>
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
          ) : filteredTournaments.length > 0 ? filteredTournaments.map((t) => (
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
              {t.participants?.length > 0 && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', fontWeight: 800, marginBottom: '0.5rem' }}>ACTIVE RADIUS</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {t.participants.slice(0, 3).map(p => (
                            <span key={p} style={{ fontSize: '0.6rem', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', opacity: 0.6 }}>{p}</span>
                        ))}
                    </div>
                </div>
              )}
            </div>
          )) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '10rem 0', opacity: 0.3 }}>
              <h2 style={{ letterSpacing: '2px' }}>NO PULSE FOUND</h2>
            </div>
          )}
        </section>

        <section className="subscribe-section">
            <div className="subscribe-content">
                <h2>Never Miss a Move.</h2>
                <p>Get the Daily Pulse delivered to your inbox every morning at 8:00 AM.</p>
                <form className="subscribe-form" onSubmit={handleSubscribe}>
                    <input 
                        type="email" 
                        required 
                        placeholder="your@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="sub-input"
                    />
                    <button type="submit" className="sub-btn" disabled={subStatus === 'loading'}>
                        {subStatus === 'loading' ? 'JOINING...' : 'JOIN THE PULSE'}
                    </button>
                </form>
                {subStatus === 'success' && <p className="status-msg success">Pulsing Delivery Confirmed!</p>}
                {subStatus === 'error' && <p className="status-msg error">Pipeline error. Please try again.</p>}
            </div>
        </section>
      </main>

      <footer style={{ marginTop: '4rem', paddingBottom: '4rem', color: 'rgba(255,255,255,0.1)', fontSize: '0.7rem', letterSpacing: '2px', fontWeight: 700, textAlign: 'center' }}>
        CHESSPULSE v0.3.5 • POWERED BY FASTAPI & RESEND
      </footer>
    </>
  )
}

export default App
