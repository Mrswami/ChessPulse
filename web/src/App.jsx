import { useState, useEffect } from 'react'
import './App.css'
import './index.css'

function App() {
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      title: "Titled Tuesday (Blitz)",
      platform: "Chess.com",
      status: "Starting in 2h",
      hype: 85,
      participants: ["Hikaru", "Magnus", "Alireza"],
      type: "Online"
    },
    {
      id: 2,
      title: "FIDE Candidates Tournament",
      platform: "FIDE",
      status: "LIVE",
      hype: 98,
      participants: ["Gukesh", "Caruana", "Nepo"],
      type: "OTB"
    },
    {
      id: 3,
      title: "Lichess Titled Arena",
      platform: "Lichess",
      status: "Tomorrow",
      hype: 72,
      participants: ["Tang", "Zhigalko"],
      type: "Online"
    }
  ])

  return (
    <>
      <nav className="glass-nav">
        <div className="nav-brand">♟️ CHESSPULSE</div>
        <div className="nav-links" style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 600 }}>
          <span>LIVE</span>
          <span>UPCOMING</span>
          <span>ARCHIVE</span>
          <button style={{ background: '#646cff', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px' }}>
            CONNECT
          </button>
        </div>
      </nav>

      <main style={{ marginTop: '5rem' }}>
        <header style={{ marginBottom: '4rem' }}>
          <h1>The Global Chess Pipeline</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Synthesizing OTB, Online, and Streamer events into a single, high-momentum heartbeat.
          </p>
        </header>

        <section className="tournament-grid">
          {tournaments.map((t) => (
            <div key={t.id} className="tournament-card">
              <span className={`platform-tag ${t.platform.toLowerCase().replace('.', '-')}`}>
                {t.platform}
              </span>
              <span className="status-badge" style={{ color: t.status === 'LIVE' ? '#ff4646' : '#646cff' }}>
                {t.status === 'LIVE' && <span style={{ marginRight: '0.5rem', display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ff4646', boxShadow: '0 0 10px #ff4646' }}></span>}
                {t.status}
              </span>
              <h3 style={{ margin: '0.5rem 0', fontWeight: 800, fontSize: '1.4rem' }}>{t.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: '0' }}>{t.type} • {t.participants.length} Grandmasters</p>
              
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>HYPE INDEX</span>
                  <span style={{ color: t.hype > 80 ? '#ff4646' : '#646cff' }}>{t.hype}%</span>
                </div>
                <div className="hype-meter">
                  <div className="hype-fill" style={{ width: `${t.hype}%`, background: t.hype > 80 ? 'linear-gradient(90deg, #646cff, #ff4646)' : '#646cff' }}></div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                {t.participants.map(p => (
                  <span key={p} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer style={{ marginTop: '8rem', paddingBottom: '4rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
        CHESSPULSE v0.1.0 • POWERED BY FASTAPI & FIREBASE
      </footer>
    </>
  )
}

export default App
