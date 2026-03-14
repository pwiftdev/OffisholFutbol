import { useState, useEffect } from 'react'
import './App.css'
import { SoccerIcon, BettingIcon } from './components/Icons'

function App() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered) return
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0 && scrollTop / docHeight >= 0.5) {
        setShowPopup(true)
        setHasTriggered(true)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasTriggered])

  return (
    <div className="app">
      {/* DVD-style bouncing soccer ball background */}
      <div className="dvd-bg" aria-hidden>
        <img src="/icons/soccer.png" alt="" className="dvd-ball" />
      </div>

      {/* Whitelist Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)} aria-label="Close">×</button>
            <h3 className="popup-title">Want a Whitelist Spot?</h3>
            <p className="popup-text">Join our Telegram to get on the whitelist for the Offishol NFT mint. Don't miss your chance!</p>
            <a
              href="https://t.me/offisholfutbol"
              target="_blank"
              rel="noopener noreferrer"
              className="popup-btn"
            >
              Join Telegram
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Site Header */}
      <header className="site-header">
        <div className="header-inner">
          <img src="/offishollogo.jpg" alt="Offishol Futbol" className="header-logo" />
          <span className="header-brand">Offishol Futbol <strong>$FUTBOL</strong></span>
          <div className="header-buttons">
            <button type="button" className="header-btn header-btn-x" title="X">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button type="button" className="header-btn header-btn-buy">BUY</button>
            <a
              href="https://t.me/offisholfutbol"
              target="_blank"
              rel="noopener noreferrer"
              className="header-btn header-btn-telegram"
              title="Join us on Telegram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <img src="/offishollogo.jpg" alt="Offishol Futbol" className="logo" />
          <h1 className="main-title">
            OFFISHOL FUTBOL
            <span className="token">$FUTBOL</span>
          </h1>
          <p className="tagline">
            The Offishol Futbol Organization on Solona — Where Football Meets the Blockchain, No Cap!
          </p>
        </div>
      </section>

      {/* Breaking News */}
      <section className="breaking">
        <div className="breaking-badge">BREAKING NEWS</div>
        <h2 className="african-headline">
          OFFISHOL FUTBOL ORGANIZATION ON SOLONA DECLARES WAR ON BORING MEME COINS!
          WORLD CUP 2026 WILL NEVER BE THE SAME, NA WA O!
        </h2>
      </section>

      {/* Project Details */}
      <section className="details">
        <div className="detail-cards">
          <div className="card">
            <span className="card-label">Status</span>
            <span className="card-value typo">In Develoopin</span>
          </div>
          <div className="card">
            <span className="card-label">Chain</span>
            <span className="card-value typo">Soluna</span>
          </div>
          <div className="card">
            <span className="card-label">Launchpad</span>
            <span className="card-value typo">Pemp Fon</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2 className="section-title">What We're Building</h2>

        <div className="feature">
          <div className="feature-icon">
            <SoccerIcon />
          </div>
          <div>
            <h3>NFT Collection — FIFA World Cup 2026 Players</h3>
            <p>
              A full NFT set featuring every player competing in FIFA World Cup 2026, rendered in our
              signature drawing style. Mint before the championship, then trade, exchange, and show off
              your collection. Each player gets the Offishol treatment.
            </p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">
            <BettingIcon />
          </div>
          <div>
            <h3>Decentralized Betting Platform</h3>
            <p>
              A peer-to-peer betting platform for match outcomes. Place bets using $FUTBOL tokens with
              no central authority — smart contracts handle payouts automatically when results are
              confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section className="tokenomics">
        <h2 className="section-title">Tokenumics</h2>
        <p className="tokenomics-intro">Open market launch with 0% in presale over Pump.fun.</p>
        <div className="tokenomics-grid">
          <div className="tokenomics-card">
            <span className="tokenomics-percent">5%</span>
            <span className="tokenomics-label">Development Wallet</span>
            <span className="tokenomics-note">(locked)</span>
          </div>
          <div className="tokenomics-card">
            <span className="tokenomics-percent">15%</span>
            <span className="tokenomics-label">Betting dApp Rewards</span>
          </div>
          <div className="tokenomics-card">
            <span className="tokenomics-percent">80%</span>
            <span className="tokenomics-label">Open Market</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2 className="cta-title">E Don Cast! Join di Movement</h2>
        <p className="cta-sub">Solona. Pemp Fon. World Cup 2026. Na we dey run am.</p>
        <button className="cta-btn">Coming Soon (No Dey Rush Us)</button>
      </section>

      <footer className="footer">
        <p>Offishol Futbol $FUTBOL — The Official Fish Ball of Football</p>
        <p className="disclaimer">Disclaimer: This na meme. But di memes, dem dey serious.</p>
      </footer>
    </div>
  )
}

export default App
