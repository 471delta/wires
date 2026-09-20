import { useEffect, useRef, useState } from "react"
import {
  ArrowDown,
  ArrowUpRight,
  Archive,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Gem,
  Hand,
  Instagram,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react"

const EMAIL = "wiresandstone@gmail.com"
const IG = "https://instagram.com/wiresandstone"
const DESIGNER = "https://jaeden.pages.dev"

// Public CC0 SVG Repo mineral assets; see ASSET-SOURCES.md.
const PUBLIC_CRYSTAL = "https://www.svgrepo.com/show/353620/crystal.svg"
const PUBLIC_MINERAL = "https://www.svgrepo.com/show/318271/crystal-jewel-gemstone-mineral.svg"
const PUBLIC_GEM = "https://www.svgrepo.com/show/472635/gem.svg"

const NAV = [
  { label: "HOME", href: "#home", icon: Sparkles },
  { label: "THE CRAFT", href: "#craft", icon: Hand },
  { label: "CATALOG STATUS", href: "#catalog", icon: Archive },
  { label: "PRIVATE INQUIRY", href: "#inquiry", icon: Mail },
]

const SPECIMENS = [
  { no: "I", title: "Raw Crystals", copy: "Authentic natural mineral points", icon: Sparkles, asset: PUBLIC_CRYSTAL },
  { no: "II", title: "Custom Wraps", copy: "Hand-manipulated wire weaving", icon: Hand, asset: PUBLIC_MINERAL },
  { no: "III", title: "Private Request", copy: "Arranged by direct email", icon: Mail, asset: PUBLIC_GEM },
]

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce || typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible")
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible")
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -7% 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  )
}

function PublicGem({ src, className = "", alt = "" }: { src: string; className?: string; alt?: string }) {
  return (
    <img
      className={`public-gem ${className}`}
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
    />
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <a className="skip-link" href="#home">Skip to content</a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-header__inner">
          <a className="brand" href="#home" aria-label="Wires & Stone — home">
            <span className="brand__mark"><PublicGem src={PUBLIC_GEM} /></span>
            <span className="brand__wordmark">Wires &amp; <b>STONE</b></span>
          </a>
          <nav className="desktop-nav" aria-label="Primary">
            {NAV.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} className="nav-link"><Icon size={13} strokeWidth={1.45} /><span>{label}</span></a>
            ))}
            <a className="nav-link nav-link--email" href={`mailto:${EMAIL}`}><Mail size={13} strokeWidth={1.45} /><span>DIRECT EMAIL</span></a>
          </nav>
          <button type="button" className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
            <Menu size={20} strokeWidth={1.35} />
          </button>
        </div>
      </header>

      <div className={`mobile-nav ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <button className="mobile-nav__backdrop" onClick={() => setOpen(false)} aria-label="Close menu" />
        <aside className="mobile-nav__panel" aria-label="Mobile navigation">
          <div className="mobile-nav__head">
            <span className="brand__wordmark">Wires &amp; <b>STONE</b></span>
            <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Close menu"><X size={19} strokeWidth={1.35} /></button>
          </div>
          <nav className="mobile-nav__links">
            {NAV.map(({ label, href, icon: Icon }, index) => (
              <a key={label} href={href} onClick={() => setOpen(false)}>
                <span className="mobile-nav__index">{String(index + 1).padStart(2, "0")}</span>
                <Icon size={16} strokeWidth={1.35} /><span>{label}</span><ChevronRight size={14} strokeWidth={1.3} />
              </a>
            ))}
            <a href={`mailto:${EMAIL}`} onClick={() => setOpen(false)}>
              <span className="mobile-nav__index">→</span><Mail size={16} strokeWidth={1.35} /><span>DIRECT EMAIL</span><ExternalLink size={14} strokeWidth={1.3} />
            </a>
          </nav>
          <div className="mobile-nav__meta">
            <span>ALBERTA, CANADA • EST. 2021</span>
            <a href={DESIGNER} target="_blank" rel="noreferrer">DESIGNER - HTTPS://JAEDEN.PAGES.DEV</a>
          </div>
        </aside>
      </div>
    </>
  )
}

function MetaStrip() {
  return (
    <div className="meta-strip">
      <span className="meta-strip__left"><span className="status-dot" />ALBERTA, CANADA • EST. 2021</span>
      <span className="meta-strip__designer">DESIGNER - <a href={DESIGNER} target="_blank" rel="noreferrer">HTTPS://JAEDEN.PAGES.DEV</a></span>
    </div>
  )
}

function Hero() {
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const node = heroRef.current
    if (!node || window.matchMedia("(pointer: coarse)").matches) return
    const onMove = (event: MouseEvent) => {
      node.style.setProperty("--mx", `${(event.clientX / window.innerWidth - 0.5) * 2}`)
      node.style.setProperty("--my", `${(event.clientY / window.innerHeight - 0.5) * 2}`)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__architecture" aria-hidden="true"><div /><div /><div /></div>
      <div className="wrap hero__wrap">
        <div className="hero__eyebrow"><span className="hero__eyebrow-line" /><span>Wires &amp; Stone</span><span className="hero__eyebrow-code">01</span></div>
        <div className="hero__grid">
          <div className="hero__copy">
            <Reveal><h1 className="hero__title">Be elegant,<br /><em>feel elegant.</em></h1></Reveal>
            <Reveal delay={110}><p className="hero__script">Connect with the wires, and walk with the stones.</p></Reveal>
            <Reveal delay={200}><p className="hero__body">Bespoke, handcrafted mineral wire art by Wires &amp; Stone. Hand-wrapped around natural raw crystals and unheated gems. Tailored by private arrangement.</p></Reveal>
            <Reveal delay={290}>
              <div className="hero__actions">
                <a className="button button--solid" href={IG} target="_blank" rel="noreferrer"><Instagram size={15} strokeWidth={1.5} />VISIT @WIRESANDSTONE<ArrowUpRight size={15} strokeWidth={1.45} /></a>
                <a className="button button--outline" href="#inquiry">PRIVATE COMMISSION<ArrowDown size={14} strokeWidth={1.45} /></a>
              </div>
            </Reveal>
            <div className="hero__signature"><span>RAW MINERAL ART</span><i /><span>ALBERTA, CANADA • EST. 2021</span></div>
          </div>

          <Reveal delay={160} className="hero__visual">
            <div className="display-case">
              <div className="display-case__topline"><span>Wires &amp; Stone</span><span>RAW MINERAL ART</span></div>
              <div className="display-case__stage">
                <div className="display-case__halo" /><div className="display-case__beam display-case__beam--a" /><div className="display-case__beam display-case__beam--b" />
                <PublicGem src={PUBLIC_GEM} className="display-case__gem display-case__gem--back" />
                <PublicGem src={PUBLIC_CRYSTAL} className="display-case__gem display-case__gem--main" />
                <PublicGem src={PUBLIC_MINERAL} className="display-case__gem display-case__gem--front" />
                <div className="wire-orbit wire-orbit--one" /><div className="wire-orbit wire-orbit--two" />
              </div>
              <div className="display-case__base"><span className="display-case__caption">Artisan hand-woven wire wrapping around natural gemstones and raw mineral points.</span><span className="display-case__location">Alberta, Canada • Est. 2021</span></div>
            </div>
            <div className="hero__floating-tag"><Gem size={14} strokeWidth={1.35} /><span>MINERAL / WIRE</span></div>
          </Reveal>
        </div>
        <a href="#craft" className="hero__scroll"><span>SCROLL</span><span className="hero__scroll-line" /><ArrowDown size={13} strokeWidth={1.3} /></a>
      </div>
    </section>
  )
}

function Craft() {
  return (
    <section className="section craft" id="craft">
      <div className="wrap">
        <div className="section-head"><Reveal><span className="section-kicker">THE CRAFT</span><h2>Handcrafted Precision</h2></Reveal><Reveal delay={100} className="section-index"><span>02</span></Reveal></div>
        <div className="craft__layout">
          <Reveal className="history-card">
            <div className="history-card__top"><span>HISTORY</span><span className="history-card__year">2021</span></div>
            <div className="history-card__center">
              <div className="history-card__crystal"><PublicGem src={PUBLIC_MINERAL} /></div>
              <div className="history-card__ring history-card__ring--one" /><div className="history-card__ring history-card__ring--two" />
            </div>
            <div className="history-card__bottom"><h3>Based in Alberta, Canada</h3><span>Established 2021</span></div>
          </Reveal>

          <Reveal delay={100} className="craft__copy">
            <div className="craft__lead"><span className="craft__rule" /><p>Founded in 2021, Wires &amp; Stone was created to connect <em>raw mineral beauty</em> with intricate wire wrapping.</p></div>
            <div className="craft__chips"><span><Sparkles size={13} strokeWidth={1.4} />Established 2021</span><span><Hand size={13} strokeWidth={1.4} />Handcrafted Precision</span></div>
            <div className="craft__information">
              <div className="craft__information-head"><span>Here&apos;s Some Information:</span><span>W &amp; S</span></div>
              <p>At Wires &amp; Stone, each piece begins with hand-selected raw crystals. Through delicate wire wrapping, and precise cold tension techniques, every design highlights the natural beauty of the stone(s), and gem(s) chosen, for your own beautiful piece.</p>
              <p>Specific metallic wire selections, chain styles, and custom gem requests are tailored entirely by private arrangement. Reach out directly to discuss bespoke commissions or special stone wraps.</p>
            </div>
          </Reveal>
        </div>

        <div className="specimen-grid">
          {SPECIMENS.map(({ no, title, copy, icon: Icon, asset }, index) => (
            <Reveal key={title} delay={index * 90} className="specimen-card">
              <article>
                <div className="specimen-card__head"><span>SPECIMEN — {no}</span><Icon size={15} strokeWidth={1.35} /></div>
                <div className="specimen-card__visual"><span className="specimen-card__shadow" /><PublicGem src={asset} /></div>
                <div className="specimen-card__copy"><h3>{title}</h3><p>{copy}</p></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Catalog() {
  return (
    <section className="section catalog" id="catalog">
      <div className="catalog__backdrop" aria-hidden="true"><span>W</span><span>S</span></div>
      <div className="wrap">
        <div className="section-head"><Reveal><span className="section-kicker">Digital Catalog</span><h2>Gallery Status</h2></Reveal><Reveal delay={100} className="section-index"><span>03</span></Reveal></div>
        <Reveal className="catalog-sheet">
          <div className="catalog-sheet__rail"><span>Wires &amp; Stone</span><span>GALLERY STATUS</span></div>
          <div className="catalog-sheet__main">
            <div className="catalog-sheet__orb"><div className="catalog-sheet__orb-ring catalog-sheet__orb-ring--one" /><div className="catalog-sheet__orb-ring catalog-sheet__orb-ring--two" /><PublicGem src={PUBLIC_CRYSTAL} /></div>
            <div className="catalog-sheet__content">
              <span className="catalog-sheet__tick"><Check size={13} strokeWidth={1.4} />GALLERY UNDER CONSTRUCTION</span>
              <h3>Work in Progress</h3>
              <p>The web catalog is currently under construction, while I navigate production of the website. All custom requests and available inventory are managed by private arrangement.</p>
              <p>To view my beautiful pieces, crystal wraps, and past work, please visit my official Instagram account directly at @wiresandstone.</p>
              <a className="button button--gold" href={IG} target="_blank" rel="noreferrer"><Instagram size={15} strokeWidth={1.45} />VISIT INSTAGRAM @WIRESANDSTONE<ExternalLink size={14} strokeWidth={1.35} /></a>
            </div>
          </div>
          <div className="catalog-sheet__edge"><span>©</span><span>2026</span></div>
        </Reveal>
      </div>
    </section>
  )
}

function Inquiry() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(EMAIL)
      else { const textarea = document.createElement("textarea"); textarea.value = EMAIL; textarea.style.position = "fixed"; textarea.style.opacity = "0"; document.body.appendChild(textarea); textarea.select(); document.execCommand("copy"); textarea.remove() }
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2200)
    } catch { setCopied(false) }
  }
  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <section className="section inquiry" id="inquiry">
      <div className="wrap">
        <div className="inquiry__plate">
          <Reveal className="inquiry__left">
            <div className="inquiry__seal"><div className="inquiry__seal-ring inquiry__seal-ring--one" /><div className="inquiry__seal-ring inquiry__seal-ring--two" /><Mail size={21} strokeWidth={1.25} /></div>
            <span className="section-kicker">Inquiries</span><h2>Private Arrangement</h2>
          </Reveal>
          <Reveal delay={130} className="inquiry__right">
            <p>For custom raw stone wraps, commission details, or private inquiries, please reach out directly via email.</p>
            <div className="inquiry__actions">
              <a className="button button--solid" href={`mailto:${EMAIL}`}><Mail size={15} strokeWidth={1.45} />OPEN E-MAIL SERVICE<ArrowUpRight size={14} strokeWidth={1.35} /></a>
              <button className="button button--ghost-dark" type="button" onClick={copyEmail}>{copied ? <Check size={15} strokeWidth={1.5} /> : <Copy size={15} strokeWidth={1.5} />}COPY EMAIL ADDRESS</button>
            </div>
            <div className="inquiry__email-row"><span>Direct Email:</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span className={`inquiry__copied ${copied ? "is-visible" : ""}`}>Copied</span></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const plaques = [
    { tag: "[ LEAD ARCHITECT & DEVELOPER ]", seal: "VERIFIED DESIGNER", title: "SYSTEM ARCHITECT & LEAD ENGINEER", by: "DESIGNED AND CODED BY MR. JAEDEN VALLÉE", icon: Gem, accent: "green" },
    { tag: "[ CYBERSECURITY SERVICES ]", seal: "GUARANTEED SAFETY", title: "SECURITY INFRASTRUCTURE & PROTOCOL", by: "SECURED BY VALLÉE CYBER-DEFENCE", icon: ShieldCheck, accent: "cyan" },
  ]
  return (
    <footer className="footer">
      <div className="wrap">
        <Reveal className="footer__top"><div className="footer__brand"><span>Wires &amp; <b>STONE</b></span><small>Alberta, Canada • Est. 2021</small></div><a href="#home" className="footer__up"><span>BACK TO TOP</span><ArrowUpRight size={14} strokeWidth={1.3} /></a></Reveal>
        <div className="footer__plaques">
          {plaques.map(({ tag, seal, title, by, icon: Icon, accent }, index) => (
            <Reveal key={tag} delay={index * 110} className="footer__plaque-wrap">
              <section className={`footer__plaque footer__plaque--${accent}`} aria-label={tag}>
                <div className="footer__plaque-corner footer__plaque-corner--tl" /><div className="footer__plaque-corner footer__plaque-corner--tr" /><div className="footer__plaque-corner footer__plaque-corner--bl" /><div className="footer__plaque-corner footer__plaque-corner--br" />
                <div className="footer__plaque-head"><span>{tag}</span><span>0{index + 1}</span></div>
                <div className="footer__plaque-seal"><Icon size={22} strokeWidth={1.25} /><span>{seal}</span></div>
                <h3>{title}</h3><p>{by}</p>
                <div className="footer__plaque-foot"><span>W&amp;S / 2026</span><span>ACTIVE</span></div>
              </section>
            </Reveal>
          ))}
        </div>
        <div className="footer__base"><p>© 2026 Wires &amp; Stone. All Rights Reserved.</p><div className="footer__base-links"><a href={IG} target="_blank" rel="noreferrer"><Instagram size={13} strokeWidth={1.4} />@wiresandstone</a><a href={`mailto:${EMAIL}`}><Mail size={13} strokeWidth={1.4} />{EMAIL}</a></div></div>
      </div>
    </footer>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0) }
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll)
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll) }
  }, [])
  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
}

export default function App() {
  return <div className="app"><ScrollProgress /><Header /><MetaStrip /><main><Hero /><Craft /><Catalog /><Inquiry /></main><Footer /></div>
}
