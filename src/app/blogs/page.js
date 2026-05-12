'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const BLUE = '#1690CE';
const BLUE_DARK = '#0E7AB8';
const BLUE_LIGHT = 'rgba(22, 144, 206, 0.15)';
const DARK = '#133B49';
const TEXT_BODY = '#4C617B';
const BG = '#F8F5F1';
const WHITE = '#ffffff';
const BORDER = '#DCE2EA';

const CATEGORIES = ['All', 'Publishing Tips', 'Author Stories', 'Industry News', 'Writing Craft', 'Marketing'];

export default function BlogPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) setSubscribed(true);
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --blue: ${BLUE};
          --blue-dark: ${BLUE_DARK};
          --blue-light: ${BLUE_LIGHT};
          --dark: ${DARK};
          --body: ${TEXT_BODY};
          --bg: ${BG};
          --white: ${WHITE};
          --border: ${BORDER};
        }

        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; color: var(--dark); background: var(--bg); }
        a { text-decoration: none; color: inherit; }
        img { display: block; max-width: 100%; }

        /* ─── HEADER ─── */
        .header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          background: ${WHITE};
          transition: box-shadow .3s;
          border-bottom: 1px solid ${BORDER};
        }
        .header.scrolled { box-shadow: 0 2px 24px rgba(19,59,73,.08); }
        .header-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24px; height: 70px;
        }
        .logo { font-size: 20px; font-weight: 700; color: var(--dark); letter-spacing: -.4px; }
        .logo span { color: var(--blue); }
        .nav { display: flex; gap: 32px; align-items: center; }
        .nav a { font-size: 15px; color: var(--body); transition: color .2s; font-weight: 500; }
        .nav a:hover { color: var(--blue); }
        .nav a.active { color: var(--blue); }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--dark); border-radius: 2px; transition: all .3s; }
        .mobile-menu {
          display: none; position: fixed; top: 70px; left: 0; right: 0; bottom: 0;
          background: white; z-index: 998; padding: 24px;
          flex-direction: column; gap: 16px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { font-size: 18px; font-weight: 500; color: var(--dark); padding: 8px 0; border-bottom: 1px solid var(--border); }

        @media (max-width: 768px) {
          .nav { display: none; }
          .hamburger { display: flex; }
        }

        /* ─── SHARED ─── */
        .container { max-width: 1200px; margin: 0 auto; }
        .section-label {
          display: inline-block; background: var(--blue-light); color: var(--blue);
          font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 20px; margin-bottom: 16px;
        }
        .section-title { font-size: clamp(32px, 4vw, 48px); font-weight: 700; color: var(--dark); line-height: 1.15; }
        .section-title .accent { color: var(--blue); }
        .btn-primary {
          background: var(--blue); color: white;
          padding: 14px 28px; border-radius: 10px;
          font-size: 16px; font-weight: 600;
          display: inline-flex; align-items: center; gap: 8px;
          transition: background .2s, transform .15s;
          border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover { background: var(--blue-dark); transform: translateY(-1px); }
        .btn-secondary {
          color: var(--dark); font-size: 15px; font-weight: 500;
          display: inline-flex; align-items: center; gap: 6px;
          border: 1.5px solid var(--border); padding: 13px 22px; border-radius: 10px;
          transition: border-color .2s, color .2s; background: transparent; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-secondary:hover { border-color: var(--blue); color: var(--blue); }

        /* ─── HERO ─── */
        .blog-hero {
          padding-top: 140px; padding-bottom: 72px; padding-left: 24px; padding-right: 24px;
          background: var(--bg);
          position: relative; overflow: hidden;
        }
        .hero-blob1 {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: rgba(22,144,206,0.10); filter: blur(120px);
          top: -80px; left: -150px; pointer-events: none;
        }
        .hero-blob2 {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: rgba(68,169,207,0.08); filter: blur(100px);
          top: -40px; right: -100px; pointer-events: none;
        }
        .blog-hero-inner {
          max-width: 720px; margin: 0 auto; text-align: center; position: relative; z-index: 1;
        }
        .blog-hero-inner h1 {
          font-size: clamp(36px, 5vw, 56px); font-weight: 800; color: var(--dark);
          line-height: 1.1; margin-bottom: 18px; letter-spacing: -.03em;
        }
        .blog-hero-inner p {
          font-size: 18px; color: var(--body); line-height: 1.65; max-width: 560px; margin: 0 auto;
        }

        /* ─── SEARCH BAR ─── */
        .search-bar-wrap {
          background: white; padding: 28px 24px;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .search-bar-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; gap: 12px; align-items: center; flex-wrap: wrap;
        }
        .search-input-wrap {
          position: relative; flex: 1; min-width: 240px;
        }
        .search-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #BDC8D6;
        }
        .search-input {
          width: 100%; padding: 12px 16px 12px 42px;
          border: 1.5px solid var(--border); border-radius: 10px;
          font-size: 15px; color: var(--dark); background: var(--bg);
          font-family: 'DM Sans', sans-serif; outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .search-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(22,144,206,.1); }
        .search-input::placeholder { color: #BDC8D6; }

        /* ─── CATEGORY PILLS ─── */
        .category-pills {
          display: flex; gap: 8px; flex-wrap: wrap; padding: 20px 24px;
          max-width: 1200px; margin: 0 auto;
        }
        .pill {
          padding: 8px 18px; border-radius: 20px; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all .2s; border: 1.5px solid var(--border);
          background: white; color: var(--body); font-family: 'DM Sans', sans-serif;
        }
        .pill:hover { border-color: var(--blue); color: var(--blue); }
        .pill.active {
          background: var(--blue); color: white; border-color: var(--blue);
        }

        /* ─── BLOG GRID SECTION ─── */
        .blog-section { padding: 16px 24px 80px; }
        .blog-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        @media (max-width: 960px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .blog-grid { grid-template-columns: 1fr; } }

        /* ─── EMPTY STATE ─── */
        .empty-state {
          max-width: 1200px; margin: 0 auto;
          padding: 80px 24px;
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .empty-icon-ring {
          width: 100px; height: 100px; border-radius: 50%;
          background: var(--blue-light);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
          position: relative;
        }
        .empty-icon-ring::before {
          content: '';
          position: absolute; inset: -8px; border-radius: 50%;
          border: 1.5px dashed rgba(22,144,206,.3);
        }
        .empty-title {
          font-size: 26px; font-weight: 700; color: var(--dark); margin-bottom: 12px;
        }
        .empty-text {
          font-size: 16px; color: var(--body); line-height: 1.65;
          max-width: 440px; margin-bottom: 32px;
        }
        .empty-cats {
          display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 36px;
        }
        .empty-cat-chip {
          padding: 6px 16px; border-radius: 20px;
          background: white; border: 1px solid var(--border);
          font-size: 13px; font-weight: 600; color: var(--body);
        }

        /* ─── NEWSLETTER ─── */
        .newsletter-section {
          background: white; padding: 80px 24px;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .newsletter-card {
          max-width: 680px; margin: 0 auto;
          background: linear-gradient(135deg, var(--dark) 0%, #0d2e3a 100%);
          border-radius: 24px; padding: 56px 48px; text-align: center;
          position: relative; overflow: hidden;
        }
        .newsletter-card::before {
          content: '';
          position: absolute; top: -80px; right: -80px;
          width: 250px; height: 250px; border-radius: 50%;
          background: rgba(22,144,206,.18); filter: blur(60px);
        }
        .newsletter-card::after {
          content: '';
          position: absolute; bottom: -60px; left: -60px;
          width: 200px; height: 200px; border-radius: 50%;
          background: rgba(22,144,206,.10); filter: blur(50px);
        }
        .newsletter-label {
          display: inline-block; background: rgba(22,144,206,.2); color: #7DD3F8;
          font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 20px; margin-bottom: 16px;
          position: relative; z-index: 1;
        }
        .newsletter-title {
          font-size: clamp(24px, 3vw, 34px); font-weight: 800; color: white;
          line-height: 1.2; margin-bottom: 12px; position: relative; z-index: 1;
        }
        .newsletter-title .accent { color: ${BLUE}; }
        .newsletter-sub {
          font-size: 15px; color: rgba(255,255,255,.65); line-height: 1.6;
          margin-bottom: 28px; position: relative; z-index: 1;
        }
        .newsletter-form {
          display: flex; gap: 10px; max-width: 440px; margin: 0 auto;
          position: relative; z-index: 1;
        }
        .newsletter-input {
          flex: 1; padding: 13px 16px; border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,.15); background: rgba(255,255,255,.1);
          color: white; font-size: 15px; font-family: 'DM Sans', sans-serif; outline: none;
          transition: border-color .2s;
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,.4); }
        .newsletter-input:focus { border-color: var(--blue); }
        .newsletter-btn {
          padding: 13px 22px; background: var(--blue); border: none;
          border-radius: 10px; color: white; font-size: 15px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif; white-space: nowrap;
          transition: background .2s;
        }
        .newsletter-btn:hover { background: var(--blue-dark); }
        .newsletter-success {
          position: relative; z-index: 1;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          color: white; font-size: 16px; font-weight: 600;
        }
        .newsletter-check {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(22,144,206,.3);
          display: flex; align-items: center; justify-content: center;
        }
        .newsletter-note { font-size: 13px; color: rgba(255,255,255,.4); margin-top: 14px; position: relative; z-index: 1; }
        @media (max-width: 560px) {
          .newsletter-card { padding: 40px 24px; }
          .newsletter-form { flex-direction: column; }
          .newsletter-btn { width: 100%; }
        }

        /* ─── TOPICS SECTION ─── */
        .topics-section { padding: 80px 24px; background: var(--bg); }
        .topics-inner { max-width: 1200px; margin: 0 auto; }
        .topics-header { margin-bottom: 40px; }
        .topics-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }
        .topic-card {
          background: white; border: 1px solid var(--border); border-radius: 16px;
          padding: 28px 24px; display: flex; align-items: flex-start; gap: 16px;
          transition: box-shadow .25s, transform .25s;
          position: relative; overflow: hidden;
        }
        .topic-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, ${BLUE}, #44B8F0);
          opacity: 0; transition: opacity .25s;
        }
        .topic-card:hover { box-shadow: 0 12px 40px rgba(22,144,206,.1); transform: translateY(-2px); }
        .topic-card:hover::before { opacity: 1; }
        .topic-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: var(--blue-light); display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 20px;
        }
        .topic-title { font-size: 16px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
        .topic-desc { font-size: 14px; color: var(--body); line-height: 1.55; }
        .topic-coming { font-size: 12px; font-weight: 700; color: var(--blue); margin-top: 8px; letter-spacing: .04em; text-transform: uppercase; }
        @media (max-width: 900px) { .topics-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .topics-grid { grid-template-columns: 1fr; } }

        /* ─── WHY READ SECTION ─── */
        .why-section { background: white; padding: 80px 24px; border-top: 1px solid var(--border); }
        .why-inner { max-width: 1200px; margin: 0 auto; }
        .why-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .why-visual {
          background: linear-gradient(135deg, var(--bg) 0%, rgba(22,144,206,.06) 100%);
          border: 1px solid var(--border); border-radius: 24px; padding: 40px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .why-stat-box {
          background: white; border: 1px solid var(--border); border-radius: 14px;
          padding: 24px 20px; text-align: center;
        }
        .why-stat-box.accent-box { background: var(--blue); border-color: var(--blue); }
        .why-stat-val { font-size: 32px; font-weight: 800; color: var(--dark); }
        .why-stat-box.accent-box .why-stat-val { color: white; }
        .why-stat-label { font-size: 13px; color: var(--body); margin-top: 4px; font-weight: 500; }
        .why-stat-box.accent-box .why-stat-label { color: rgba(255,255,255,.75); }
        .why-list { display: flex; flex-direction: column; gap: 20px; margin-top: 28px; }
        .why-item { display: flex; gap: 14px; align-items: flex-start; }
        .why-item-dot {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--blue-light); display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
        }
        .why-item-title { font-size: 16px; font-weight: 700; color: var(--dark); margin-bottom: 3px; }
        .why-item-desc { font-size: 14px; color: var(--body); line-height: 1.55; }
        @media (max-width: 900px) { .why-layout { grid-template-columns: 1fr; } .why-visual { display: none; } }

        /* ─── CTA BANNER ─── */
        .cta-section { background: linear-gradient(135deg, ${DARK} 0%, #0d2e3a 100%); padding: 80px 24px; text-align: center; }
        .cta-title { font-size: clamp(30px, 4vw, 48px); font-weight: 800; color: white; margin-bottom: 16px; }
        .cta-title .accent { color: var(--blue); }
        .cta-sub { font-size: 18px; color: rgba(255,255,255,.65); margin-bottom: 36px; max-width: 500px; margin-left: auto; margin-right: auto; }
        .btn-primary-lg {
          background: var(--blue); color: white;
          padding: 16px 36px; border-radius: 12px;
          font-size: 17px; font-weight: 700;
          display: inline-flex; align-items: center; gap: 10px;
          transition: background .2s, transform .15s;
          border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .btn-primary-lg:hover { background: var(--blue-dark); transform: translateY(-1px); }

        /* ─── FOOTER ─── */
        .footer { background: ${DARK}; color: rgba(255,255,255,.7); padding: 64px 24px 32px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; max-width: 1200px; margin: 0 auto; }
        .footer-logo { font-size: 20px; font-weight: 700; color: white; margin-bottom: 14px; }
        .footer-logo span { color: var(--blue); }
        .footer-desc { font-size: 14px; line-height: 1.65; }
        .footer-col-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: white; margin-bottom: 16px; }
        .footer-links { display: flex; flex-direction: column; gap: 10px; }
        .footer-links a { font-size: 14px; color: rgba(255,255,255,.6); transition: color .2s; }
        .footer-links a:hover { color: white; }
        .footer-bottom { max-width: 1200px; margin: 48px auto 0; border-top: 1px solid rgba(255,255,255,.1); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: rgba(255,255,255,.4); }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } }
      `}</style>

            {/* ── HEADER ── */}
            <header className={`header${scrolled ? ' scrolled' : ''}`}>
                <div className="header-inner">
                    <div className="logo">Alpine <span>Publishing</span> Studios</div>
                    <nav className="nav">
                        <a href="/services">Services</a>
                        <a href="/#how-it-works">How It Works</a>
                        <a href="/about-us">About Us</a>
                        <Link href="/contact-us">Contact</Link>
                        <a href="/blogs" className="active">Blogs</a>
                    </nav>
                    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        <span /><span /><span />
                    </div>
                </div>
                <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                    <a href="/services" onClick={() => setMenuOpen(false)}>Services</a>
                    <a href="/#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
                    <a href="/about-us" onClick={() => setMenuOpen(false)}>About Us</a>
                    <a href="/contact-us" onClick={() => setMenuOpen(false)}>Contact</a>
                    <a href="/blogs" onClick={() => setMenuOpen(false)}>Blogs</a>
                </div>
            </header>

            {/* ── HERO ── */}
            <section className="blog-hero">
                <div className="hero-blob1" />
                <div className="hero-blob2" />
                <div className="blog-hero-inner">
                    <span className="section-label">The Alpine Blog</span>
                    <h1>
                        Publishing Insights &amp; <span style={{ color: BLUE }}>Author Resources</span>
                    </h1>
                    <p>
                        Tips, guides, and stories to help you write better, publish smarter, and reach more readers — straight from the Alpine team.
                    </p>
                </div>
            </section>

            {/* ── SEARCH BAR ── */}
            <div className="search-bar-wrap">
                <div className="search-bar-inner">
                    <div className="search-input-wrap">
                        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input className="search-input" type="text" placeholder="Search articles, topics, tips…" readOnly />
                    </div>
                    <button className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="12" y1="18" x2="20" y2="18" />
                        </svg>
                        Filter
                    </button>
                </div>
            </div>

            {/* ── CATEGORY PILLS ── */}
            <div style={{ background: 'white', borderBottom: `1px solid ${BORDER}` }}>
                <div className="category-pills">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            className={`pill${activeCategory === cat ? ' active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── BLOG GRID / EMPTY STATE ── */}
            <section className="blog-section">
                <div className="empty-state">
                    <div className="empty-icon-ring">
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.5">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            <line x1="9" y1="7" x2="15" y2="7" />
                            <line x1="9" y1="11" x2="13" y2="11" />
                        </svg>
                    </div>
                    <div className="empty-title">No Blogs Are Currently Available</div>
                    <div className="empty-text">
                        We're working on some great content for you. Our team is crafting articles on publishing tips, author stories, writing craft, and industry insights. Check back soon!
                    </div>
                    <div className="empty-cats">
                        {CATEGORIES.filter(c => c !== 'All').map(cat => (
                            <span className="empty-cat-chip" key={cat}>{cat}</span>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Link href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                            Back to Home
                        </Link>
                        <Link href="/contact-us" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            Get Notified
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── NEWSLETTER ── */}
            <section className="newsletter-section">
                <div className="newsletter-card">
                    <div className="newsletter-label">Stay in the Loop</div>
                    <div className="newsletter-title">
                        Be the First to Read<br /><span className="accent">Our New Articles</span>
                    </div>
                    <div className="newsletter-sub">
                        Subscribe and get notified the moment we publish new guides, author stories, and publishing insights.
                    </div>
                    {subscribed ? (
                        <div className="newsletter-success">
                            <div className="newsletter-check">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            You're subscribed! We'll notify you when we publish.
                        </div>
                    ) : (
                        <>
                            <form className="newsletter-form" onSubmit={handleSubscribe}>
                                <input
                                    className="newsletter-input"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                <button className="newsletter-btn" type="submit">Notify Me</button>
                            </form>
                            <div className="newsletter-note">No spam, ever. Unsubscribe anytime.</div>
                        </>
                    )}
                </div>
            </section>

            {/* ── TOPICS SECTION ── */}
            <section className="topics-section">
                <div className="topics-inner">
                    <div className="topics-header">
                        <span className="section-label">Coming Soon</span>
                        <h2 className="section-title">Topics We'll Be <span className="accent">Covering</span></h2>
                    </div>
                    <div className="topics-grid">
                        {[
                            { icon: '✍️', title: 'Writing Craft', desc: 'Techniques and strategies to sharpen your storytelling, develop compelling characters, and structure your narrative.' },
                            { icon: '📖', title: 'Publishing Tips', desc: 'Step-by-step guides to navigate the publishing process — from manuscript prep to final print.' },
                            { icon: '🌍', title: 'Global Distribution', desc: "How to get your book into readers hands across 150+ countries and onto the world's biggest retail platforms." },
                            { icon: '🎨', title: 'Cover Design', desc: 'What makes a book cover sell? Design principles and real examples from our published authors.' },
                            { icon: '📈', title: 'Author Marketing', desc: 'Build your author brand, grow your audience, and drive book sales with proven marketing strategies.' },
                            { icon: '💬', title: 'Author Stories', desc: 'Real journeys from writers who took the leap and published their books with Alpine Publishing Studios.' },
                        ].map((t, i) => (
                            <div className="topic-card" key={i}>
                                <div className="topic-icon">{t.icon}</div>
                                <div>
                                    <div className="topic-title">{t.title}</div>
                                    <div className="topic-desc">{t.desc}</div>
                                    <div className="topic-coming">Articles Coming Soon</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHY READ SECTION ── */}
            <section className="why-section">
                <div className="why-inner">
                    <div className="why-layout">
                        <div>
                            <span className="section-label">Why Read Our Blog</span>
                            <h2 className="section-title" style={{ marginBottom: 8 }}>
                                Insights Built for <span className="accent">Real Authors</span>
                            </h2>
                            <p style={{ fontSize: 16, color: TEXT_BODY, lineHeight: 1.65, marginBottom: 0, marginTop: 12 }}>
                                Every article we publish is grounded in real publishing experience — written by people who have helped over 30,000 authors bring their books to life.
                            </p>
                            <div className="why-list">
                                {[
                                    { title: 'Practical, Actionable Advice', desc: 'No fluff. Every article gives you steps you can apply to your own publishing journey today.' },
                                    { title: 'Written by Industry Experts', desc: 'Our team of editors, designers, and publishing specialists share what actually works.' },
                                    { title: 'Covers the Full Journey', desc: 'From your first draft to global bookstore shelves — we cover every stage of the author journey.' },
                                ].map((item, i) => (
                                    <div className="why-item" key={i}>
                                        <div className="why-item-dot">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="why-item-title">{item.title}</div>
                                            <div className="why-item-desc">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="why-visual">
                            {[
                                { val: '30K+', label: 'Authors Published', accent: false },
                                { val: '150+', label: 'Countries Reached', accent: true },
                                { val: '4.9★', label: 'Author Satisfaction', accent: false },
                                { val: '72hr', label: 'Avg. Time to Publish', accent: false },
                            ].map((s, i) => (
                                <div className={`why-stat-box${s.accent ? ' accent-box' : ''}`} key={i}>
                                    <div className="why-stat-val">{s.val}</div>
                                    <div className="why-stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="cta-section">
                <div className="cta-title">Ready to Write Your <span className="accent">Next Chapter?</span></div>
                <div className="cta-sub">Start publishing today with Alpine Publishing Studios — the platform built by authors, for authors.</div>
                <Link href="/" className="btn-primary-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                    Get Started for Free
                </Link>
            </section>

            {/* ── FOOTER ── */}
            <footer className="footer">
                <div className="footer-grid">
                    <div>
                        <div className="footer-logo">Alpine <span>Publishing</span> Studios</div>
                        <div className="footer-desc">The professional publishing platform for independent authors. Seamless. Affordable. Powerful.</div>
                    </div>
                    <div>
                        <div className="footer-col-title">Platform</div>
                        <div className="footer-links">
                            <a href="/services">Services</a>
                            <a href="/#how-it-works">How It Works</a>
                            <a href="/contact-us">Contact Us</a>
                            <a href="/#faq">FAQ</a>
                        </div>
                    </div>
                    <div>
                        <div className="footer-col-title">Company</div>
                        <div className="footer-links">
                            <a href="/about-us">About Us</a>
                            <a href="/blogs">Blog</a>
                            <a href="#careers">Careers</a>
                        </div>
                    </div>
                    <div>
                        <div className="footer-col-title">Legal</div>
                        <div className="footer-links">
                            <a href="#privacy">Privacy Policy</a>
                            <a href="#terms">Terms of Service</a>
                            <a href="#cookies">Cookie Policy</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} Alpine Publishing Studios. All rights reserved.</span>
                    <span>Made with ❤️ for authors everywhere</span>
                </div>
            </footer>
        </>
    );
}