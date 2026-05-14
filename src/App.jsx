import { useState, useEffect, useRef, useCallback } from 'react'
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
  { q: 'What is $FUTBOL?', a: '$FUTBOL is the native token of Offishol Futbol — a meme project on Solana built around FIFA World Cup 2026. It powers live-match token burns tied to the tournament and our decentralized betting platform.' },
  { q: 'How do I buy?', a: 'We launch on Pump.fun with 0% presale. Connect your Solana wallet and swap SOL for $FUTBOL when we go live. Links will drop on our official X and Telegram.' },
  { q: 'How do live-match burns work?', a: 'Throughout the World Cup, real match events trigger on-chain burn transactions from the live-match allocation. Every goal burns 250,000 $FUTBOL; every yellow or red card burns 100,000 $FUTBOL. Follow our official channels for execution details and schedules.' },
  { q: 'What is the total supply?', a: '1,000,000,000 $FUTBOL tokens. 80% open market, 10% live-match burns, 7% betting, 3% development (locked).' },
  { q: 'Is the betting dApp live?', a: 'The betting dApp is currently in development. It will launch ahead of the World Cup 2026 kickoff. Connect your wallet at bet.offishol.futbol to stay ready.' },
  { q: 'How do I stay in the loop?', a: 'Join our Telegram community and follow our X account. Burn schedules, app updates, and announcements are shared through official channels only.' },
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

const BET_APP_URL = 'https://bet.offishol.futbol'
const WC_STREAM_URL = 'https://offishol.futbol'
const LIVE_SCORE_API_URL = 'https://live-score-api.com/'

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
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const navToggleRef = useRef(null)
  const [heroRef, heroVis] = useScrollAnimation()
  const [wcRef, wcVis] = useScrollAnimation()
  const [whyRef, whyVis] = useScrollAnimation()
  const [roadmapRef, roadmapVis] = useScrollAnimation()
  const [prioritiesRef, prioritiesVis] = useScrollAnimation()
  const [artstyleRef, artstyleVis] = useScrollAnimation()
  const [tokenomicsRef, tokenomicsVis] = useScrollAnimation()
  const [ctaRef, ctaVis] = useScrollAnimation()
  const countdown = useCountdown('2026-06-11T00:00:00Z')

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false)
    requestAnimationFrame(() => {
      navToggleRef.current?.focus()
    })
  }, [])

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

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const onChange = () => setMobileNavOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!mobileNavOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeMobileNav()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [mobileNavOpen, closeMobileNav])

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

      <div className="wc-top-banner" role="region" aria-label="World Cup coverage">
        <p className="wc-top-banner-text">
          Live-stream and full coverage of all World Cup matches. Watch World Cup at{' '}
          <a href={WC_STREAM_URL} target="_blank" rel="noopener noreferrer" className="wc-top-banner-link">
            offishol.futbol
          </a>
        </p>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)} aria-label="Close">×</button>
            <h3 className="popup-title">Join the squad</h3>
            <p className="popup-text">Join our Telegram for burn updates, app news, and everything Offishol during the World Cup.</p>
            <a href="https://t.me/offisholfutbol" target="_blank" rel="noopener noreferrer" className="popup-btn">
              Join Telegram
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>
        </div>
      )}

      <header className="site-header">
        <div className="header-inner">
          <div className="header-left">
            <img src="/offishollogo.jpg" alt="Offishol Futbol" className="header-logo" />
            <span className="header-brand">Offishol Futbol <strong>$FUTBOL</strong></span>
          </div>
          <div className="header-countdown" aria-live="polite">
            <span className="header-countdown-label">World Cup</span>
            <div className="header-countdown-units">
              <span className="header-countdown-unit" title="Days"><strong>{countdown.days}</strong>d</span>
              <span className="header-countdown-unit" title="Hours"><strong>{countdown.hours}</strong>h</span>
              <span className="header-countdown-unit" title="Minutes"><strong>{countdown.mins}</strong>m</span>
              <span className="header-countdown-unit" title="Seconds"><strong>{countdown.secs}</strong>s</span>
            </div>
          </div>
          <div className="header-buttons">
            <a href="https://x.com/offisholfutbol" target="_blank" rel="noopener noreferrer" className="header-btn header-btn-x" title="X">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://t.me/offisholfutbol" target="_blank" rel="noopener noreferrer" className="header-btn header-btn-telegram" title="Telegram">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
            <button type="button" className="header-btn header-btn-buy">BUY</button>
            <a href={BET_APP_URL} target="_blank" rel="noopener noreferrer" className="header-btn header-btn-app">
              <AppIcon />
              <span>Open App</span>
            </a>
          </div>
          <button
            ref={navToggleRef}
            type="button"
            className="header-menu-toggle"
            aria-expanded={mobileNavOpen}
            aria-controls="site-nav-drawer"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="header-menu-bar" aria-hidden />
            <span className="header-menu-bar" aria-hidden />
            <span className="header-menu-bar" aria-hidden />
          </button>
        </div>
      </header>

      <div
        className={`nav-drawer-overlay ${mobileNavOpen ? 'nav-drawer-overlay--open' : ''}`}
        onClick={closeMobileNav}
        aria-hidden={!mobileNavOpen}
      />
      <aside
        id="site-nav-drawer"
        className={`nav-drawer ${mobileNavOpen ? 'nav-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!mobileNavOpen}
      >
        <div className="nav-drawer-header">
          <span className="nav-drawer-title">Menu</span>
          <button type="button" className="nav-drawer-close" onClick={closeMobileNav} aria-label="Close menu">
            ×
          </button>
        </div>
        <nav className="nav-drawer-nav">
          <div className="nav-drawer-countdown" aria-live="polite">
            <span className="nav-drawer-countdown-label">World Cup kickoff</span>
            <div className="nav-drawer-countdown-units">
              <span><strong>{countdown.days}</strong> d</span>
              <span><strong>{countdown.hours}</strong> h</span>
              <span><strong>{countdown.mins}</strong> m</span>
              <span><strong>{countdown.secs}</strong> s</span>
            </div>
          </div>
          <a
            href={WC_STREAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-drawer-link"
            onClick={closeMobileNav}
          >
            Watch World Cup — offishol.futbol
          </a>
          <a href={BET_APP_URL} target="_blank" rel="noopener noreferrer" className="nav-drawer-link nav-drawer-link--highlight" onClick={closeMobileNav}>
            <AppIcon />
            Open App (bet.offishol.futbol)
          </a>
          <a href="https://x.com/offisholfutbol" target="_blank" rel="noopener noreferrer" className="nav-drawer-link" onClick={closeMobileNav}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Follow on X
          </a>
          <a href="https://t.me/offisholfutbol" target="_blank" rel="noopener noreferrer" className="nav-drawer-link" onClick={closeMobileNav}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            Join Telegram
          </a>
          <button type="button" className="nav-drawer-link nav-drawer-link--buy" onClick={closeMobileNav}>
            Buy $FUTBOL
          </button>
        </nav>
      </aside>

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
            <p className="tagline">Fair launch on Solana: live-match token burns tied to World Cup 2026, plus peer-to-peer betting — no presale.</p>
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
              <a href={BET_APP_URL} target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta-app">
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

      <section ref={prioritiesRef} className={`priorities ${prioritiesVis ? 'visible' : ''}`} aria-labelledby="priorities-heading">
        <div className="priorities-shell">
          <header className="priorities-shell-head">
            <p className="priorities-shell-eyebrow">What we ship</p>
            <h2 id="priorities-heading" className="priorities-shell-title">Burns &amp; betting</h2>
            <p className="priorities-shell-lede">Live-match burns and Solana-first gameplay — the two reasons $FUTBOL exists for this World Cup.</p>
          </header>

          <div className="priorities-body">
            <section className="priorities-lane priorities-lane--burn" aria-labelledby="prio-burn-title">
              <div className="priorities-lane-rail" aria-hidden>
                <span className="priorities-rail-icon"><SoccerIcon /></span>
                <span className="priorities-rail-text">Burns</span>
              </div>
              <div className="priorities-lane-main">
                <h3 id="prio-burn-title" className="priorities-lane-title">Live-match burns</h3>
                <p className="priorities-lane-copy">
                  Tokens leave circulation for good. During the World Cup, official match events pull from the live-match allocation — more drama on the pitch, less float on-chain.
                </p>
                <p className="priorities-lane-highlight">
                  <strong>Every goal</strong> and <strong>every yellow or red card</strong> is a burn event.
                </p>
                <dl className="priorities-metrics" aria-label="Burn size per event">
                  <div className="priorities-metric priorities-metric--goal">
                    <dt>Goal</dt>
                    <dd>250,000 <span className="priorities-metric-ticker">$FUTBOL</span></dd>
                  </div>
                  <div className="priorities-metric priorities-metric--card">
                    <dt>Yellow / red</dt>
                    <dd>100,000 <span className="priorities-metric-ticker">$FUTBOL</span></dd>
                  </div>
                </dl>
                <p className="priorities-lane-foot">FIFA World Cup 2026 · Proof-of-burn cadence on official channels before kickoff.</p>
              </div>
            </section>

            <div className="priorities-spine" aria-hidden />

            <section className="priorities-lane priorities-lane--bet" aria-labelledby="prio-bet-title">
              <div className="priorities-lane-rail" aria-hidden>
                <span className="priorities-rail-icon"><BettingIcon /></span>
                <span className="priorities-rail-text">Play</span>
              </div>
              <div className="priorities-lane-main">
                <h3 id="prio-bet-title" className="priorities-lane-title">Leaderboards &amp; betting</h3>
                <p className="priorities-lane-copy">
                  Solana gaming, football-first: create a simple account, get 1,000 free Futbol Points, and bet your way to the top of the leaderboards.
                </p>
                <div className="priorities-cta-block">
                  <a href={BET_APP_URL} target="_blank" rel="noopener noreferrer" className="priorities-app-btn">
                    <AppIcon />
                    Open bet.offishol.futbol
                  </a>
                  <p className="priorities-powered">
                    Match data via{' '}
                    <a href={LIVE_SCORE_API_URL} target="_blank" rel="noopener noreferrer">live-score-api.com</a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section ref={wcRef} className={`worldcup ${wcVis ? 'visible' : ''}`}>
        <div className="wc-shell">
          <header className="wc-shell-header">
            <p className="wc-shell-kicker">FIFA World Cup 2026</p>
            <h2 className="wc-shell-title">The biggest event in football</h2>
            <p className="wc-shell-sub">June 11 – July 19 · USA, Canada, Mexico · 48 teams</p>
          </header>

          <div className="wc-stat-strip" role="list" aria-label="Tournament scale">
            {WC_STATS.map((s) => (
              <div key={s.label} className="wc-stat-item" role="listitem">
                <span className="wc-stat-item-num">{s.num}</span>
                <span className="wc-stat-item-label">{s.label}</span>
                <span className="wc-stat-item-sub">{s.sub}</span>
              </div>
            ))}
          </div>

          <div className="wc-host-bar" aria-label="Host nations">
            <span className="wc-host-bar-label">Hosts</span>
            <div className="wc-host-pills">
              {WC_HOSTS.map((h) => (
                <div key={h.country} className="wc-host-pill">
                  <span className="wc-host-pill-flag" aria-hidden>{h.flag}</span>
                  <span className="wc-host-pill-text">
                    <strong>{h.country}</strong>
                    <span>{h.cities}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="wc-story">
            <div className="wc-story-block">
              <span className="wc-story-num" aria-hidden>01</span>
              <div className="wc-story-body">
                <h3 className="wc-story-heading">Format upgrade</h3>
                <p>48 nations for the first time — up from 32. More upsets, more drama, more moments to care about on the app.</p>
              </div>
            </div>
            <div className="wc-story-block">
              <span className="wc-story-num" aria-hidden>02</span>
              <div className="wc-story-body">
                <h3 className="wc-story-heading">The final</h3>
                <p>MetLife Stadium, New Jersey · July 19, 2026 — the biggest single night in the sport.</p>
              </div>
            </div>
            <div className="wc-story-block">
              <span className="wc-story-num" aria-hidden>03</span>
              <div className="wc-story-body">
                <h3 className="wc-story-heading">Why it matters here</h3>
                <p>A month of wall-to-wall football and billions of viewers — the window where burns and leaderboards actually mean something.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={tokenomicsRef} className={`tokenomics ${tokenomicsVis ? 'visible' : ''}`}>
        <h2 className="tokenomics-title">Tokenumics</h2>
        <p className="tokenomics-intro">1B supply · 0% presale · Pump.fun fair launch.</p>

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
            <span className="supply-label">Development</span>
            <span className="supply-num supply-locked">3%</span>
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
                <p>Public distribution — no insider allocation.</p>
              </div>
            </div>
            <div className="legend-item legend-10">
              <span className="legend-dot" />
              <div>
                <strong>10% — Live-Match Burns</strong>
                <p>Allocated for tournament-time burns (see above for per-event sizes).</p>
              </div>
            </div>
            <div className="legend-item legend-7">
              <span className="legend-dot" />
              <div>
                <strong>7% — Betting</strong>
                <p>Ecosystem and rewards around the decentralized betting platform.</p>
              </div>
            </div>
            <div className="legend-item legend-3">
              <span className="legend-dot" />
              <div>
                <strong>3% — Development</strong>
                <p>Creator fees, marketing, and buybacks — locked and released on a transparent schedule.</p>
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
              <p>Telegram, X, and the CA when we go live — official channels only.</p>
            </div>
          </div>
          <div className="roadmap-step">
            <div className="roadmap-dot" />
            <div className="roadmap-content">
              <span className="roadmap-phase">Phase 2</span>
              <h4>Live-match burn engine</h4>
              <p>Wire official match data to on-chain burns from the 10% pool — verifiable at tournament scale.</p>
            </div>
          </div>
          <div className="roadmap-step">
            <div className="roadmap-dot" />
            <div className="roadmap-content">
              <span className="roadmap-phase">Phase 3</span>
              <h4>Betting dApp Live</h4>
              <p>Ship the full P2P flow ahead of kickoff — contract-settled stakes in $FUTBOL.</p>
            </div>
          </div>
          <div className="roadmap-step">
            <div className="roadmap-dot roadmap-dot-future" />
            <div className="roadmap-content roadmap-content-future">
              <span className="roadmap-phase">Phase 4</span>
              <h4>World Cup Season</h4>
              <p>Run the stack under real match load — the month the project is built for.</p>
            </div>
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
            <h3>Built for matchday</h3>
            <p>$FUTBOL is meant to be interesting when the TV is on — not a whitepaper fantasy. The mechanics line up with real fixtures and real volume.</p>
          </div>
          <div className="why-item why-3">
            <span className="why-num">03</span>
            <h3>Football culture</h3>
            <p>Memes, banter, and the global conversation around the tournament — we lean into the fun without pretending the sport is an afterthought.</p>
          </div>
          <div className="why-item why-4">
            <span className="why-num">04</span>
            <h3>Original Art</h3>
            <p>100% original hand-drawn style. Owned entirely by us — the face of Offishol on socials, the site, and everything we ship. Nobody else has this look.</p>
          </div>
          <div className="why-item why-5">
            <span className="why-num">05</span>
            <h3>Solana Speed</h3>
            <p>Near-instant transactions and near-zero fees. The only chain that makes sense for betting, burns, and trading at World Cup scale.</p>
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
        </div>
      </section>

      <section ref={artstyleRef} className={`artstyle ${artstyleVis ? 'visible' : ''}`}>
        <h2 className="section-title">Our Artstyle</h2>
        <div className="artstyle-featured">
          <img src="/messi1.jpeg" alt="Offishol Futbol — Messi dribbling in Argentina kit, hand-drawn style" className="artstyle-featured-img" />
          <div className="artstyle-featured-text">
            <div className="artstyle-featured-tag">Art preview</div>
            <h3 className="artstyle-featured-title">World Cup 2026 on canvas</h3>
            <p>Every nation. Every star — our hand-drawn cartoon line, built from scratch for Offishol across brand, content, and product.</p>
          </div>
        </div>
        <div className="artstyle-images">
          <img src="/nft1.jpeg" alt="Offishol Futbol hand-drawn player art example 1" className="artstyle-img" />
          <img src="/nft2.jpeg" alt="Offishol Futbol hand-drawn player art example 2" className="artstyle-img" />
          <img src="/nft3.png" alt="Offishol Futbol hand-drawn player art example 3" className="artstyle-img" />
          <img src="/nft4.png" alt="Offishol Futbol hand-drawn player art example 4" className="artstyle-img" />
          <img src="/nft5.png" alt="Offishol Futbol hand-drawn player art example 5" className="artstyle-img" />
        </div>
        <div className="artstyle-copy">
          <p>This look is <strong>100% ours</strong>. We own the creative idea and the art — the vibes, the whole Offishol Futbol identity. What you see here is the real deal.</p>
          <p>We are <strong>not affiliated</strong> with any other project or token that tries to copy or replicate our art or brand. If it's not from our official X and Telegram, it's not us. Stay sharp and only trust links from our official channels.</p>
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
          <a href={BET_APP_URL} target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn-app">
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
            <a href={BET_APP_URL} target="_blank" rel="noopener noreferrer" className="header-btn header-btn-app footer-app-btn">
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
