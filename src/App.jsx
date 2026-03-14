import { useState, useEffect, useRef } from 'react'
import './App.css'
import { SoccerIcon, BettingIcon } from './components/Icons'

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })
  useEffect(() => {
    const target = new Date(targetDate).getTime()
    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, target - now)
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])
  return timeLeft
}

function useScrollAnimation() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

const FAQ_ITEMS = [
  { q: 'What is $FUTBOL?', a: '$FUTBOL is the native token of Offishol Futbol — a meme project on Solana built around FIFA World Cup 2026. It powers our NFT collection and decentralized betting platform.' },
  { q: 'How do I buy?', a: 'We launch on Pump.fun with 0% presale. Connect your Solana wallet and swap SOL for $FUTBOL when we go live. Links coming soon!' },
  { q: 'When is the NFT mint?', a: 'Our FIFA World Cup 2026 player NFT collection will mint before the championship. Join Telegram for whitelist spots and updates.' },
]

function App() {
  const [loaded, setLoaded] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [heroRef, heroVis] = useScrollAnimation()
  const [whyRef, whyVis] = useScrollAnimation()
  const [roadmapRef, roadmapVis] = useScrollAnimation()
  const [featuresRef, featuresVis] = useScrollAnimation()
  const [tokenomicsRef, tokenomicsVis] = useScrollAnimation()
  const [ctaRef, ctaVis] = useScrollAnimation()
  const countdown = useCountdown('2026-06-11T00:00:00Z')

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loaded) {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    } else {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [loaded])

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
    <>
      {!loaded && (
        <div className="loader">
          <div className="loader-inner">
            <img src="/offishollogo.jpg" alt="" className="loader-logo" />
            <h2 className="loader-title">OFFISHOL FUTBOL</h2>
            <span className="loader-token">$FUTBOL</span>
            <div className="loader-bar">
              <div className="loader-progress" />
            </div>
          </div>
        </div>
      )}
      <div className={`app ${loaded ? 'loaded' : ''}`}>
      <div className="dvd-bg" aria-hidden>
        <img src="/icons/soccer.png" alt="" className="dvd-ball" />
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)} aria-label="Close">×</button>
            <h3 className="popup-title">Want a Whitelist Spot?</h3>
            <p className="popup-text">Join our Telegram to get on the whitelist for the Offishol NFT mint.</p>
            <a href="https://t.me/offisholfutbol" target="_blank" rel="noopener noreferrer" className="popup-btn">
              Join Telegram
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>
        </div>
      )}

      <header className="site-header">
        <div className="header-inner">
          <img src="/offishollogo.jpg" alt="Offishol Futbol" className="header-logo" />
          <span className="header-brand">Offishol Futbol <strong>$FUTBOL</strong></span>
          <div className="header-buttons">
            <button type="button" className="header-btn header-btn-x" title="X"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></button>
            <button type="button" className="header-btn header-btn-buy">BUY</button>
            <a href="https://t.me/offisholfutbol" target="_blank" rel="noopener noreferrer" className="header-btn header-btn-telegram" title="Telegram"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>
          </div>
        </div>
      </header>

      <section ref={heroRef} className={`hero ${heroVis ? 'visible' : ''}`}>
        <div className="hero-glow" aria-hidden />
        <div className="hero-content">
          <img src="/offishollogo.jpg" alt="Offishol Futbol" className="logo" />
          <h1 className="main-title">OFFISHOL FUTBOL<span className="token">$FUTBOL</span></h1>
          <p className="tagline">The Offishol Futbol Organization on Solona — Where Football Meets the Blockchain, No Cap!</p>
        </div>
      </section>

      <section className="breaking">
        <div className="breaking-badge">BREAKING NEWS</div>
        <h2 className="african-headline">OFFISHOL FUTBOL ORGANIZATION ON SOLONA DECLARES WAR ON BORING MEME COINS! WORLD CUP 2026 WILL NEVER BE THE SAME, NA WA O!        </h2>
      </section>

      <section className="countdown-section">
        <h3 className="countdown-title">Kickoff: FIFA World Cup 2026</h3>
        <div className="countdown-grid">
          <div className="countdown-box"><span className="countdown-num">{countdown.days}</span><span className="countdown-unit">days</span></div>
          <div className="countdown-box"><span className="countdown-num">{countdown.hours}</span><span className="countdown-unit">hours</span></div>
          <div className="countdown-box"><span className="countdown-num">{countdown.mins}</span><span className="countdown-unit">mins</span></div>
          <div className="countdown-box"><span className="countdown-num">{countdown.secs}</span><span className="countdown-unit">secs</span></div>
        </div>
      </section>

      <section ref={whyRef} className={`why-offishol ${whyVis ? 'visible' : ''}`}>
        <div className="why-header">
          <h2 className="why-title">Why Offishol?</h2>
          <p className="why-subtitle">Three reasons we're different</p>
        </div>
        <div className="why-grid">
          <div className="why-item why-1">
            <span className="why-num">01</span>
            <h3>Fair Launch</h3>
            <p>0% presale. Everyone gets the same shot on Pump.fun.</p>
          </div>
          <div className="why-item why-2">
            <span className="why-num">02</span>
            <h3>Real Utility</h3>
            <p>NFTs + betting dApp. Not just another meme.</p>
          </div>
          <div className="why-item why-3">
            <span className="why-num">03</span>
            <h3>World Cup 2026</h3>
            <p>Timing meets culture. Football season never ends.</p>
          </div>
        </div>
      </section>

      <section className="details">
        <div className="detail-cards">
          <div className="card"><span className="card-label">Status</span><span className="card-value typo">In Develoopin</span></div>
          <div className="card"><span className="card-label">Chain</span><span className="card-value typo">Soluna</span></div>
          <div className="card"><span className="card-label">Launchpad</span><span className="card-value typo">Pemp Fon</span></div>
        </div>
      </section>

      <section ref={featuresRef} className={`features ${featuresVis ? 'visible' : ''}`}>
        <h2 className="section-title">What We're Building</h2>
        <div className="feature">
          <div className="feature-icon"><SoccerIcon /></div>
          <div>
            <h3>NFT Collection — FIFA World Cup 2026 Players</h3>
            <p>A full NFT set featuring every player in FIFA World Cup 2026 in our signature drawing style. Mint before the championship, trade, flex.</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-icon"><BettingIcon /></div>
          <div>
            <h3>Decentralized Betting Platform</h3>
            <p>Peer-to-peer betting for match outcomes using $FUTBOL. No middleman. Smart contracts handle payouts.</p>
          </div>
        </div>
      </section>

      <section ref={tokenomicsRef} className={`tokenomics ${tokenomicsVis ? 'visible' : ''}`}>
        <h2 className="tokenomics-title">Tokenumics</h2>
        <p className="tokenomics-intro">Open market launch with 0% in presale over Pump.fun.</p>
        <div className="tokenomics-chart">
          <div className="tokenomics-pie" />
          <div className="tokenomics-grid">
            <div className="tokenomics-card tokenomics-80"><span className="tokenomics-percent">80%</span><span className="tokenomics-label">Open Market</span></div>
            <div className="tokenomics-card tokenomics-15"><span className="tokenomics-percent">15%</span><span className="tokenomics-label">Betting dApp Rewards</span></div>
            <div className="tokenomics-card tokenomics-5"><span className="tokenomics-percent">5%</span><span className="tokenomics-label">Development</span><span className="tokenomics-note">(locked)</span></div>
          </div>
        </div>
      </section>

      <section ref={roadmapRef} className={`roadmap-section ${roadmapVis ? 'visible' : ''}`}>
        <h2 className="roadmap-main-title">The Plan</h2>
        <div className="roadmap-timeline">
          <div className="roadmap-step">
            <div className="roadmap-dot" />
            <div className="roadmap-content">
              <span className="roadmap-phase">Phase 1</span>
              <h4>Launch</h4>
              <p>Fair launch on Pump.fun. Community build.</p>
            </div>
          </div>
          <div className="roadmap-step">
            <div className="roadmap-dot" />
            <div className="roadmap-content">
              <span className="roadmap-phase">Phase 2</span>
              <h4>NFTs</h4>
              <p>Player collection mint. Trade & flex.</p>
            </div>
          </div>
          <div className="roadmap-step">
            <div className="roadmap-dot" />
            <div className="roadmap-content">
              <span className="roadmap-phase">Phase 3</span>
              <h4>Betting dApp</h4>
              <p>Decentralized betting goes live.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq">
        <h2 className="section-title">FAQ</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>{item.q}</button>
              <div className="faq-a"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section ref={ctaRef} className={`cta ${ctaVis ? 'visible' : ''}`}>
        <h2 className="cta-title">E Don Cast! Join di Movement</h2>
        <p className="cta-sub">Solona. Pemp Fon. World Cup 2026. Na we dey run am.</p>
        <a href="https://t.me/offisholfutbol" target="_blank" rel="noopener noreferrer" className="cta-btn">Join Telegram for Updates</a>
      </section>

      <footer className="footer">
        <p>Offishol Futbol $FUTBOL — The Official Fish Ball of Football</p>
        <p className="disclaimer">Disclaimer: This na meme. But di memes, dem dey serious. NFA.</p>
      </footer>
    </div>
    </>
  )
}

export default App
