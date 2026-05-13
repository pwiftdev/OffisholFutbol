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
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

const FAQ_ITEMS = [
  { q: 'What is $FUTBOL?', a: '$FUTBOL is the native token of Offishol Futbol — a meme project on Solana built around FIFA World Cup 2026. It powers our NFT collection and decentralized betting platform.' },
  { q: 'How do I buy?', a: 'We launch on Pump.fun with 0% presale. Connect your Solana wallet and swap SOL for $FUTBOL when we go live. Links will drop on our official X and Telegram.' },
  { q: 'When is the NFT mint?', a: 'Our FIFA World Cup 2026 player NFT collection will mint before the championship. Join Telegram for whitelist spots and updates.' },
  { q: 'What is the total supply?', a: '1,000,000,000 $FUTBOL tokens. 80% open market, 15% betting dApp rewards, 5% development (locked).' },
  { q: 'Is the betting dApp live?', a: 'The betting dApp is currently in development. It will launch ahead of the World Cup 2026 kickoff. Connect your wallet at app.offishol.futbol to stay ready.' },
  { q: 'How do I get whitelisted for the NFT mint?', a: 'Join our Telegram community and follow our X account. Whitelist spots will be announced through official channels only.' },
]

const WC_HOSTS = [
  { flag: '🇺🇸', country: 'United States', cities: '11 venues' },
  { flag: '🇲🇽', country: 'Mexico', cities: '3 venues' },
  { flag: '🇨🇦', country: 'Canada', cities: '2 venues' },
]

const WC_STATS = [
  { num: '48', label: 'Teams', sub: 'Biggest ever' },
  { num: '104', label: 'Matches', sub: 'Total games' },
  { num: '16', label: 'Host Cities', sub: '3 countries' },
  { num: '5B+', label: 'Viewers', sub: 'Global audience' },
]

function AppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5H5zm3 3h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
    </svg>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [heroRef, heroVis] = useScrollAnimation()
  const [wcRef, wcVis] = useScrollAnimation()
  const [whyRef, whyVis] = useScrollAnimation()
  const [roadmapRef, roadmapVis] = useScrollAnimation()
  const [featuresRef, featuresVis] = useScrollAnimation()
  const [artstyleRef, artstyleVis] = useScrollAnimation()
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
            <a href="https://x.com/offisholfutbol" target="_blank" rel="noopener noreferrer" className="header-btn header-btn-x" title="X">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://t.me/offisholfutbol" target="_blank" rel="noopener noreferrer" className="header-btn header-btn-telegram" title="Telegram">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
            <button type="button" className="header-btn header-btn-buy">BUY</button>
            <a href="https://app.offishol.futbol" target="_blank" rel="noopener noreferrer" className="header-btn header-btn-app">
              <AppIcon />
              <span>Open App</span>
            </a>
          </div>
        </div>
      </header>

      <section ref={heroRef} className={`hero ${heroVis ? 'visible' : ''}`}>
        <div className="hero-glow" aria-hidden />
        <div className="hero-notice" role="alert">
          <span className="hero-notice-badge">IMPORTANT</span>
          <p className="hero-notice-text">The token is <strong>not live yet</strong>. The CA will drop on our official <a href="https://x.com/offisholfutbol" target="_blank" rel="noopener noreferrer" className="hero-notice-link">X profile</a>.</p>
        </div>
        <div className="hero-split">
          <div className="hero-text">
            <div className="hero-eyebrow">On Solana · World Cup 2026</div>
            <h1 className="main-title">OFFISHOL<br/>FUTBOL<span className="token">$FUTBOL</span></h1>
            <p className="tagline">The Offishol Futbol Organization on Solana — where football culture meets the blockchain. No cap, no presale, pure vibes.</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">1B</span>
                <span className="hero-stat-label">Total Supply</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">0%</span>
                <span className="hero-stat-label">Presale</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">SOL</span>
                <span className="hero-stat-label">Chain</span>
              </div>
            </div>
            <div className="hero-ctas">
              <a href="https://app.offishol.futbol" target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta-app">
                <AppIcon />
                Open App
              </a>
              <a href="https://t.me/offisholfutbol" target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta-tg">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Join Community
              </a>
              <button type="button" className="hero-cta hero-cta-buy">Buy $FUTBOL</button>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img src="/hero1.jpeg" alt="Offishol Futbol — cartoon goalkeeper getting scored on" className="hero-img" />
            <div className="hero-img-badge">World Cup 2026</div>
          </div>
        </div>
      </section>

      <section className="breaking">
        <div className="breaking-badge">BREAKING NEWS</div>
        <h2 className="african-headline">OFFISHOL FUTBOL ORGANIZATION ON SOLANA DECLARES WAR ON BORING MEME COINS! WORLD CUP 2026 WILL NEVER BE THE SAME, NA WA O!</h2>
      </section>

      <section className="countdown-section">
        <div className="countdown-eyebrow">KICKOFF IN</div>
        <h3 className="countdown-title">FIFA World Cup 2026</h3>
        <p className="countdown-sub">June 11 – July 19, 2026 · USA · Canada · Mexico</p>
        <div className="countdown-grid">
          <div className="countdown-box"><span className="countdown-num">{countdown.days}</span><span className="countdown-unit">days</span></div>
          <div className="countdown-box"><span className="countdown-num">{countdown.hours}</span><span className="countdown-unit">hours</span></div>
          <div className="countdown-box"><span className="countdown-num">{countdown.mins}</span><span className="countdown-unit">mins</span></div>
          <div className="countdown-box"><span className="countdown-num">{countdown.secs}</span><span className="countdown-unit">secs</span></div>
        </div>
      </section>

      <section ref={wcRef} className={`worldcup ${wcVis ? 'visible' : ''}`}>
        <div className="wc-header">
          <h2 className="wc-title">The Biggest Event in Football</h2>
          <p className="wc-subtitle">FIFA World Cup 2026 — the most expanded tournament in history</p>
        </div>

        <div className="wc-stats-row">
          {WC_STATS.map((s) => (
            <div key={s.num} className="wc-stat-card">
              <span className="wc-stat-num">{s.num}</span>
              <span className="wc-stat-label">{s.label}</span>
              <span className="wc-stat-sub">{s.sub}</span>
            </div>
          ))}
        </div>

        <div className="wc-hosts-row">
          {WC_HOSTS.map((h) => (
            <div key={h.country} className="wc-host-card">
              <span className="wc-host-flag">{h.flag}</span>
              <span className="wc-host-country">{h.country}</span>
              <span className="wc-host-cities">{h.cities}</span>
            </div>
          ))}
        </div>

        <div className="wc-info-grid">
          <div className="wc-info-card">
            <h4>Format Upgrade</h4>
            <p>For the first time ever, 48 nations compete — up from 32. More upsets, more drama, more moments to bet on.</p>
          </div>
          <div className="wc-info-card">
            <h4>The Final</h4>
            <p>MetLife Stadium, New Jersey. The largest stage in football. July 19, 2026 — the $FUTBOL endgame.</p>
          </div>
          <div className="wc-info-card">
            <h4>Why It Matters for Crypto</h4>
            <p>5 billion viewers. Maximum global attention. The perfect storm for a football meme coin to take off on Solana.</p>
          </div>
          <div className="wc-info-card">
            <h4>Our Timeline</h4>
            <p>Token launch, NFT mint, and betting dApp all planned to go live before or during the tournament.</p>
          </div>
        </div>
      </section>

      <section ref={whyRef} className={`why-offishol ${whyVis ? 'visible' : ''}`}>
        <div className="why-banner-wrap">
          <img src="/banner1.jpeg" alt="Offishol Futbol Organisation — World Cup banner" className="why-banner" />
          <div className="why-banner-overlay">
            <h2 className="why-title">Why Offishol?</h2>
            <p className="why-subtitle">What makes us different</p>
          </div>
        </div>
        <div className="why-bento">
          <div className="why-item why-hero">
            <span className="why-num">01</span>
            <h3>Fair Launch — No Presale, No BS</h3>
            <p>0% presale. 0% insider allocation. When we go live on Pump.fun, everyone gets the same shot at the same price. No VCs, no early whales, no sneaky team wallets. Just the open market.</p>
          </div>
          <div className="why-item why-2">
            <span className="why-num">02</span>
            <h3>Real Utility</h3>
            <p>NFT collection + a full P2P betting dApp. $FUTBOL is the fuel. Not just another meme — we're building things people will actually use during the World Cup.</p>
          </div>
          <div className="why-item why-3">
            <span className="why-num">03</span>
            <h3>World Cup 2026</h3>
            <p>5 billion viewers. The biggest sporting event on earth. We're positioned right at the intersection of football culture and crypto at peak global attention.</p>
          </div>
          <div className="why-item why-4">
            <span className="why-num">04</span>
            <h3>Original Art</h3>
            <p>100% original hand-drawn style. Owned entirely by us. The foundation of our whole NFT collection — nobody else has this look.</p>
          </div>
          <div className="why-item why-5">
            <span className="why-num">05</span>
            <h3>Solana Speed</h3>
            <p>Near-instant transactions and near-zero fees. The only chain that makes sense for betting, minting, and trading at World Cup scale.</p>
          </div>
        </div>
      </section>

      <section className="details">
        <div className="detail-cards">
          <div className="card">
            <span className="card-label">Status</span>
            <span className="card-value typo">In Develoopin</span>
            <span className="card-sub">Token not live yet</span>
          </div>
          <div className="card">
            <span className="card-label">Chain</span>
            <span className="card-value typo">Soluna</span>
            <span className="card-sub">Fast & cheap</span>
          </div>
          <div className="card">
            <span className="card-label">Launchpad</span>
            <span className="card-value typo">Pemp Fon</span>
            <span className="card-sub">Fair launch</span>
          </div>
          <div className="card card-app">
            <span className="card-label">App</span>
            <span className="card-value card-value-app">Live Now</span>
            <a href="https://app.offishol.futbol" target="_blank" rel="noopener noreferrer" className="card-app-link">
              Open App →
            </a>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className={`features ${featuresVis ? 'visible' : ''}`}>
        <h2 className="section-title">What We're Building</h2>
        <div className="feature">
          <div className="feature-icon"><SoccerIcon /></div>
          <div className="feature-body">
            <h3>NFT Collection — FIFA World Cup 2026 Players</h3>
            <p>A full NFT set featuring every player in FIFA World Cup 2026 in our signature drawing style. Mint before the championship, trade them, flex your squad.</p>
            <div className="feature-tags">
              <span className="feature-tag">48 nations</span>
              <span className="feature-tag">Original art</span>
              <span className="feature-tag">Pre-mint whitelist</span>
            </div>
          </div>
        </div>
        <div className="feature">
          <div className="feature-icon"><BettingIcon /></div>
          <div className="feature-body">
            <h3>Decentralized Betting Platform</h3>
            <p>Peer-to-peer betting for match outcomes using $FUTBOL. No middleman, no bookmaker taking cuts. Smart contracts handle payouts automatically on Solana.</p>
            <div className="feature-tags">
              <span className="feature-tag">P2P betting</span>
              <span className="feature-tag">Smart contracts</span>
              <span className="feature-tag">$FUTBOL rewards</span>
            </div>
          </div>
        </div>
        <div className="features-app-cta">
          <p>The app is already live — connect your wallet and explore.</p>
          <a href="https://app.offishol.futbol" target="_blank" rel="noopener noreferrer" className="features-app-btn">
            <AppIcon />
            Open app.offishol.futbol
          </a>
        </div>
      </section>

      <section ref={artstyleRef} className={`artstyle ${artstyleVis ? 'visible' : ''}`}>
        <h2 className="section-title">Our Artstyle</h2>
        <div className="artstyle-featured">
          <img src="/messi1.jpeg" alt="Offishol NFT — Messi dribbling in Argentina kit" className="artstyle-featured-img" />
          <div className="artstyle-featured-text">
            <div className="artstyle-featured-tag">NFT Preview</div>
            <h3 className="artstyle-featured-title">World Cup 2026 Players</h3>
            <p>Every nation. Every star. Our signature hand-drawn cartoon style brings the biggest players on earth to the Solana blockchain — collectable, tradeable, and completely original.</p>
            <p>This is what the collection looks like. 48 nations, hundreds of players, one consistent artstyle built from scratch.</p>
          </div>
        </div>
        <div className="artstyle-images">
          <img src="/nft1.jpeg" alt="Offishol NFT art example 1" className="artstyle-img" />
          <img src="/nft2.jpeg" alt="Offishol NFT art example 2" className="artstyle-img" />
          <img src="/nft3.png" alt="Offishol NFT art example 3" className="artstyle-img" />
          <img src="/nft4.png" alt="Offishol NFT art example 4" className="artstyle-img" />
          <img src="/nft5.png" alt="Offishol NFT art example 5" className="artstyle-img" />
        </div>
        <div className="artstyle-copy">
          <p>This look is <strong>100% ours</strong>. We own the creative idea and the art — the vibes, the whole Offishol Futbol identity. What you see here is the real deal.</p>
          <p>We are <strong>not affiliated</strong> with any other project or token that tries to copy or replicate our art or brand. If it's not from our official X and Telegram, it's not us. Stay sharp and only trust links from our official channels.</p>
        </div>
      </section>

      <section ref={tokenomicsRef} className={`tokenomics ${tokenomicsVis ? 'visible' : ''}`}>
        <h2 className="tokenomics-title">Tokenumics</h2>
        <p className="tokenomics-intro">Open market launch with 0% in presale over Pump.fun.</p>

        <div className="tokenomics-supply-row">
          <div className="tokenomics-supply-card">
            <span className="supply-label">Total Supply</span>
            <span className="supply-num">1,000,000,000</span>
            <span className="supply-ticker">$FUTBOL</span>
          </div>
          <div className="tokenomics-supply-card">
            <span className="supply-label">Presale</span>
            <span className="supply-num supply-zero">0%</span>
            <span className="supply-ticker">No presale ever</span>
          </div>
          <div className="tokenomics-supply-card">
            <span className="supply-label">Dev tokens</span>
            <span className="supply-num supply-locked">5%</span>
            <span className="supply-ticker">Locked</span>
          </div>
        </div>

        <div className="tokenomics-chart">
          <div className="tokenomics-pie" />
          <div className="tokenomics-legend">
            <div className="legend-item legend-80">
              <span className="legend-dot" />
              <div>
                <strong>80% — Open Market</strong>
                <p>Fair launch on Pump.fun. No insiders, no VC allocation.</p>
              </div>
            </div>
            <div className="legend-item legend-15">
              <span className="legend-dot" />
              <div>
                <strong>15% — Betting dApp Rewards</strong>
                <p>Distributed to $FUTBOL holders who use the betting platform.</p>
              </div>
            </div>
            <div className="legend-item legend-5">
              <span className="legend-dot" />
              <div>
                <strong>5% — Development</strong>
                <p>Locked tokens for ongoing development. Transparent & time-locked.</p>
              </div>
            </div>
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
              <h4>Launch & Community</h4>
              <p>Fair launch on Pump.fun. 0% presale, equal access for everyone. Community building on Telegram and X. CA drop on official channels only.</p>
            </div>
          </div>
          <div className="roadmap-step">
            <div className="roadmap-dot" />
            <div className="roadmap-content">
              <span className="roadmap-phase">Phase 2</span>
              <h4>NFT Collection Drop</h4>
              <p>World Cup 2026 player NFT mint. Full collection featuring players from all 48 nations. Whitelist spots for early community members. Trade & flex on-chain.</p>
            </div>
          </div>
          <div className="roadmap-step">
            <div className="roadmap-dot" />
            <div className="roadmap-content">
              <span className="roadmap-phase">Phase 3</span>
              <h4>Betting dApp Live</h4>
              <p>Decentralized P2P betting platform goes live ahead of World Cup kickoff. Bet on match outcomes using $FUTBOL. Smart contract payouts, no middleman.</p>
            </div>
          </div>
          <div className="roadmap-step">
            <div className="roadmap-dot roadmap-dot-future" />
            <div className="roadmap-content roadmap-content-future">
              <span className="roadmap-phase">Phase 4</span>
              <h4>World Cup Season</h4>
              <p>Full tournament coverage. Live betting, NFT trading at peak volume. The $FUTBOL ecosystem running at full capacity during the biggest sporting event on earth.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq">
        <h2 className="section-title">FAQ</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {item.q}
                <span className="faq-chevron">{openFaq === i ? '▲' : '▼'}</span>
              </button>
              <div className="faq-a"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section ref={ctaRef} className={`cta ${ctaVis ? 'visible' : ''}`}>
        <h2 className="cta-title">Ready to Play?</h2>
        <p className="cta-sub">Connect your wallet, join the community, and be early to the biggest football meme coin on Solana.</p>
        <div className="cta-buttons">
          <a href="https://app.offishol.futbol" target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn-app">
            <AppIcon />
            <span>Open App</span>
          </a>
          <a href="https://t.me/offisholfutbol" target="_blank" rel="noopener noreferrer" className="cta-btn header-btn header-btn-telegram" title="Telegram">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            <span>Join Telegram</span>
          </a>
          <a href="https://x.com/offisholfutbol" target="_blank" rel="noopener noreferrer" className="cta-btn header-btn header-btn-x" title="X">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <span>Follow on X</span>
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <img src="/offishollogo.jpg" alt="Offishol Futbol" className="footer-logo" />
          <p className="footer-brand">Offishol Futbol <strong>$FUTBOL</strong></p>
          <p className="footer-tagline">The Offishol Futbol organisation on Solana · World Cup 2026</p>
          <div className="footer-buttons">
            <a href="https://x.com/offisholfutbol" target="_blank" rel="noopener noreferrer" className="header-btn header-btn-x" title="X"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <button type="button" className="header-btn header-btn-buy">BUY</button>
            <a href="https://t.me/offisholfutbol" target="_blank" rel="noopener noreferrer" className="header-btn header-btn-telegram" title="Telegram"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>
            <a href="https://app.offishol.futbol" target="_blank" rel="noopener noreferrer" className="header-btn header-btn-app footer-app-btn">
              <AppIcon />
              <span>App</span>
            </a>
          </div>
          <p className="footer-disclaimer">Not financial advice. Meme project. NFA. Do your own research.</p>
        </div>
      </footer>
    </div>
    </>
  )
}

export default App
