'use client';

import { useState, useEffect, useRef } from 'react';

const BLUE = '#1690CE';
const BLUE_DARK = '#0E7AB8';
const BLUE_LIGHT = 'rgba(22, 144, 206, 0.15)';
const DARK = '#133B49';
const TEXT_BODY = '#4C617B';
const BG = '#F8F5F1';
const WHITE = '#ffffff';
const BORDER = '#DCE2EA';

function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', project: '' });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [focused, setFocused] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formType: 'project', ...form }),
            });
            if (!res.ok) throw new Error('Failed to send');
            setSubmitted(true);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: BLUE_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: DARK, marginBottom: 10 }}>You're on the list!</div>
                <div style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.6 }}>We'll be in touch within 24 hours to help you get started.</div>
            </div>
        );
    }

    const inputStyle = (field) => ({
        width: '100%', padding: '13px 16px', borderRadius: 10,
        border: `1.5px solid ${focused === field ? BLUE : BORDER}`,
        fontSize: 15, color: DARK, background: WHITE, outline: 'none',
        transition: 'border-color .2s, box-shadow .2s',
        boxShadow: focused === field ? `0 0 0 3px rgba(22,144,206,0.12)` : 'none',
        fontFamily: "'DM Sans', sans-serif",
    });

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Full Name</label>
                    <input type="text" required placeholder="Jane Smith" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} style={inputStyle('name')} />
                </div>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Email Address</label>
                    <input type="email" required placeholder="jane@example.com" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} style={inputStyle('email')} />
                </div>
            </div>
            <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} style={inputStyle('phone')} />
            </div>
            <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Tell us about your project</label>
                <textarea required
                    placeholder="Share your story — what's your book about, where are you in the process, and what do you need help with?"
                    value={form.project} onChange={e => setForm({ ...form, project: e.target.value })}
                    onFocus={() => setFocused('project')} onBlur={() => setFocused(null)}
                    rows={4} style={{ ...inputStyle('project'), resize: 'none', lineHeight: 1.55 }} />
            </div>
            {error && <p style={{ fontSize: 13, color: '#e53e3e', textAlign: 'center' }}>{error}</p>}
            <button type="submit" disabled={submitting} style={{
                background: submitting ? '#aaa' : BLUE, color: WHITE, border: 'none',
                padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 700,
                cursor: submitting ? 'not-allowed' : 'pointer', width: '100%',
                transition: 'background .2s, transform .15s', fontFamily: "'DM Sans', sans-serif",
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
                onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = BLUE_DARK; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                onMouseLeave={e => { if (!submitting) { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = 'translateY(0)'; } }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                {submitting ? 'Sending...' : 'Start My Publishing Journey'}
            </button>
            <p style={{ fontSize: 12, color: TEXT_BODY, textAlign: 'center', marginTop: -4 }}>No credit card required · Free to get started</p>
        </form>
    );
}

export default function AboutUsPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [countersStarted, setCountersStarted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (menuOpen || showPopup) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen, showPopup]);

    // Popup auto-trigger
    useEffect(() => {
        const isFirstLoad = !sessionStorage.getItem('alpine_visited');
        sessionStorage.setItem('alpine_visited', '1');
        const delay = isFirstLoad ? 0 : 5000;
        const timer = setTimeout(() => setShowPopup(true), delay);
        return () => clearTimeout(timer);
    }, []);

    // Scroll animations
    useEffect(() => {
        const els = document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('anim-visible'); observer.unobserve(e.target); }
            });
        }, { threshold: 0.12 });
        els.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setCountersStarted(true); },
            { threshold: 0.3 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    const values = [
        {
            title: 'Authors First',
            desc: 'Every decision we make starts with one question: is this good for authors? You retain your rights, your royalties, and your creative vision — always.',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
            ),
        },
        {
            title: 'Quality Without Compromise',
            desc: "We hold every book to the same standard as the world's top publishers. Professional editing, stunning design, and flawless production — every time.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ),
        },
        {
            title: 'Radical Transparency',
            desc: 'No hidden fees. No confusing royalty structures. No surprises. We believe authors deserve clear, honest pricing and earnings from day one.',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            ),
        },
        {
            title: 'Global Reach',
            desc: "Your story shouldn't be limited by geography. We distribute to 150+ countries and 2,000+ retailers so readers everywhere can discover your work.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
            ),
        },
        {
            title: 'Innovation at Heart',
            desc: 'We combine AI-powered tools with human expertise to give authors capabilities that were once exclusive to major publishing houses.',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
            ),
        },
        {
            title: 'Community Driven',
            desc: "We're more than a platform — we're a community of 30,000+ authors supporting each other. Your success is our success.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
            ),
        },
    ];

    const stats = [
        { value: 30000, suffix: '+', label: 'Published Authors' },
        { value: 150, suffix: '+', label: 'Countries Reached' },
        { value: 2000, suffix: '+', label: 'Retail Partners' },
        { value: 72, suffix: 'hr', label: 'Avg. Time to Publish' },
    ];

    function AnimatedCounter({ target, suffix }) {
        const [count, setCount] = useState(0);
        useEffect(() => {
            if (!countersStarted) return;
            let start = 0;
            const increment = target / (1800 / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) { setCount(target); clearInterval(timer); }
                else setCount(Math.floor(start));
            }, 16);
            return () => clearInterval(timer);
        }, [countersStarted, target]);
        return <>{count.toLocaleString()}{suffix}</>;
    }

    const pressLogos = ['Forbes', 'TechCrunch', "Publisher's Weekly", 'The Guardian', 'Inc. Magazine'];

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

        /* --- ANIMATIONS --- */
        .anim-fade-up { opacity: 0; transform: translateY(40px); transition: opacity 0.75s cubic-bezier(.22,1,.36,1), transform 0.75s cubic-bezier(.22,1,.36,1); }
        .anim-fade-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.75s cubic-bezier(.22,1,.36,1), transform 0.75s cubic-bezier(.22,1,.36,1); }
        .anim-fade-right { opacity: 0; transform: translateX(40px); transition: opacity 0.75s cubic-bezier(.22,1,.36,1), transform 0.75s cubic-bezier(.22,1,.36,1); }
        .anim-scale-in { opacity: 0; transform: scale(0.92); transition: opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1); }
        .anim-visible { opacity: 1 !important; transform: none !important; }
        .anim-delay-1 { transition-delay: 0.1s; }
        .anim-delay-2 { transition-delay: 0.2s; }
        .anim-delay-3 { transition-delay: 0.3s; }
        .anim-delay-4 { transition-delay: 0.4s; }
        .anim-delay-5 { transition-delay: 0.5s; }
        .anim-delay-6 { transition-delay: 0.6s; }
        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blobPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        .hero-blob1 { animation: blobPulse 8s ease-in-out infinite; }
        .hero-blob2 { animation: blobPulse 10s ease-in-out infinite 2s; }
        .about-hero-inner { animation: heroFadeUp 0.9s cubic-bezier(.22,1,.36,1) both; }
        /* POPUP */
        .popup-overlay { position: fixed; inset: 0; z-index: 9999; background: rgba(19,59,73,.55); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn .2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .popup-card { background: white; border-radius: 24px; width: 100%; max-width: 540px; padding: 40px 36px; position: relative; box-shadow: 0 32px 80px rgba(19,59,73,.2); animation: slideUp .25s ease; max-height: 90vh; overflow-y: auto; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .popup-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, ${BLUE}, #44B8F0); border-radius: 24px 24px 0 0; }
        .popup-close { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; background: var(--bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background .2s; }
        .popup-close:hover { background: var(--border); }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --blue: ${BLUE}; --blue-dark: ${BLUE_DARK}; --blue-light: ${BLUE_LIGHT};
          --dark: ${DARK}; --body: ${TEXT_BODY}; --bg: ${BG}; --white: ${WHITE}; --border: ${BORDER};
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; color: var(--dark); background: var(--bg); }
        a { text-decoration: none; color: inherit; }
        img { display: block; max-width: 100%; }

        /* ── HEADER ── */
        .header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          background: ${WHITE}; transition: box-shadow .3s;
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
        .nav a:hover, .nav a.active { color: var(--blue); }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--dark); border-radius: 2px; }
        .mobile-menu {
          display: none; position: fixed; top: 70px; left: 0; right: 0; bottom: 0;
          background: white; z-index: 998; padding: 24px; flex-direction: column; gap: 16px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { font-size: 18px; font-weight: 500; color: var(--dark); padding: 10px 0; border-bottom: 1px solid var(--border); }
        @media (max-width: 768px) { .nav { display: none; } .hamburger { display: flex; } }

        /* ── SHARED ── */
        .section-label {
          display: inline-block; background: var(--blue-light); color: var(--blue);
          font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 20px; margin-bottom: 16px;
        }
        .section-title { font-size: clamp(32px, 4vw, 48px); font-weight: 700; color: var(--dark); line-height: 1.15; }
        .section-title .accent { color: var(--blue); }
        .section-sub { font-size: 18px; color: var(--body); line-height: 1.6; margin-top: 12px; }

        /* ── HERO ── */
        .about-hero {
          padding-top: 70px; background: var(--bg);
          position: relative; overflow: hidden;
        }
        .hero-blob1 {
          position: absolute; width: 600px; height: 600px; border-radius: 50%;
          background: rgba(22,144,206,0.11); filter: blur(130px);
          top: -150px; left: -200px; pointer-events: none;
        }
        .hero-blob2 {
          position: absolute; width: 450px; height: 450px; border-radius: 50%;
          background: rgba(68,169,207,0.09); filter: blur(110px);
          bottom: -100px; right: -100px; pointer-events: none;
        }
        .about-hero-inner {
          max-width: 1200px; margin: 0 auto; padding: 80px 24px 88px;
          position: relative; z-index: 1; text-align: center;
        }
        .about-hero-inner h1 {
          font-size: clamp(36px, 5vw, 62px); font-weight: 800;
          color: var(--dark); line-height: 1.08; margin-bottom: 22px; letter-spacing: -.03em;
          max-width: 800px; margin-left: auto; margin-right: auto;
        }
        .about-hero-inner p {
          font-size: 18px; color: var(--body); line-height: 1.7;
          max-width: 600px; margin: 0 auto 36px;
        }
        .hero-badges { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .hero-badge {
          background: white; border: 1px solid var(--border);
          border-radius: 30px; padding: 8px 18px;
          font-size: 13px; font-weight: 600; color: var(--dark);
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 2px 8px rgba(19,59,73,.06);
        }
        .hero-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--blue); flex-shrink: 0; }

        /* ── PRESS STRIP ── */
        .press-strip {
          background: white; padding: 28px 24px;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .press-label { text-align: center; font-size: 13px; color: var(--body); margin-bottom: 18px; font-weight: 500; text-transform: uppercase; letter-spacing: .08em; }
        .press-logos { display: flex; gap: 40px; align-items: center; justify-content: center; flex-wrap: wrap; }

        /* ── MISSION ── */
        .mission-section { background: var(--bg); padding: 96px 24px; }
        .mission-layout {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .mission-img-stack { position: relative; }
        .mission-img-main { border-radius: 20px; overflow: hidden; box-shadow: 0 24px 72px rgba(19,59,73,.13); }
        .mission-img-main img { width: 100%; display: block; }
        .mission-img-badge {
          position: absolute; bottom: -24px; right: -24px;
          background: white; border: 1px solid var(--border);
          border-radius: 16px; padding: 20px 24px;
          box-shadow: 0 12px 40px rgba(19,59,73,.12); min-width: 200px;
        }
        .mission-img-badge-num { font-size: 36px; font-weight: 800; color: var(--dark); line-height: 1; }
        .mission-img-badge-num span { color: var(--blue); }
        .mission-img-badge-label { font-size: 13px; color: var(--body); margin-top: 4px; font-weight: 500; }
        .mission-text { font-size: 16px; color: var(--body); line-height: 1.75; margin-bottom: 20px; }
        .mission-pillars { display: flex; flex-direction: column; gap: 16px; margin-top: 32px; }
        .mission-pillar { display: flex; align-items: flex-start; gap: 14px; }
        .pillar-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: var(--blue-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .pillar-title { font-size: 16px; font-weight: 700; color: var(--dark); margin-bottom: 3px; }
        .pillar-desc { font-size: 14px; color: var(--body); line-height: 1.5; }
        @media (max-width: 900px) { .mission-layout { grid-template-columns: 1fr; } .mission-img-stack { display: none; } }

        /* ── STATS ── */
        .stats-section { background: white; padding: 80px 24px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--border);
          max-width: 960px; margin: 0 auto;
          border: 1px solid var(--border); border-radius: 20px; overflow: hidden;
        }
        .stat-card { background: white; padding: 40px 32px; }
        .stat-value { font-size: 44px; font-weight: 800; color: var(--dark); line-height: 1; }
        .stat-label { font-size: 14px; color: var(--body); margin-top: 8px; font-weight: 500; }
        @media (max-width: 700px) { .stats-grid { grid-template-columns: 1fr 1fr; } }

        /* ── VALUES ── */
        .values-section { background: var(--bg); padding: 96px 24px; }
        .values-intro { max-width: 560px; margin-bottom: 56px; }
        .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1200px; margin: 0 auto; }
        .value-card {
          background: white; border: 1px solid var(--border);
          border-radius: 16px; padding: 32px;
          transition: box-shadow .25s, transform .25s;
        }
        .value-card:hover { box-shadow: 0 12px 48px rgba(22,144,206,.12); transform: translateY(-3px); }
        .value-icon {
          width: 52px; height: 52px; border-radius: 14px;
          background: var(--blue-light); display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
        }
        .value-title { font-size: 19px; font-weight: 700; color: var(--dark); margin-bottom: 10px; }
        .value-desc { font-size: 15px; color: var(--body); line-height: 1.65; }
        @media (max-width: 900px) { .values-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .values-grid { grid-template-columns: 1fr; } }

        /* ── CONTACT FORM ── */
        .contact-section {
          background: white; padding: 100px 24px;
          position: relative; overflow: hidden;
        }
        .contact-section::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(22,144,206,0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 20%, rgba(22,144,206,0.04) 0%, transparent 50%);
          pointer-events: none;
        }
        .contact-layout {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 64px; align-items: center;
          max-width: 1200px; margin: 0 auto; position: relative;
        }
        .contact-left-img { border-radius: 20px; overflow: hidden; position: relative; box-shadow: 0 24px 80px rgba(19,59,73,.14); }
        .contact-left-img img { width: 100%; display: block; }
        .contact-left-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, rgba(19,59,73,.5)); }
        .contact-img-badge {
          position: absolute; bottom: 24px; left: 24px; right: 24px; z-index: 2;
          background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
          border-radius: 12px; padding: 16px 20px;
          display: flex; align-items: center; gap: 14px;
          border: 1px solid rgba(255,255,255,0.8);
        }
        .contact-img-badge-icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: ${BLUE_LIGHT}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .contact-img-badge-title { font-size: 14px; font-weight: 700; color: ${DARK}; }
        .contact-img-badge-sub { font-size: 12px; color: ${TEXT_BODY}; }
        .contact-form-wrap {
          background: white; border: 1px solid var(--border);
          border-radius: 20px; padding: 40px 36px;
          box-shadow: 0 8px 40px rgba(19,59,73,.07); position: relative;
        }
        .contact-form-wrap::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, ${BLUE}, #44B8F0);
          border-radius: 20px 20px 0 0;
        }
        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr; }
          .contact-left-img { display: none; }
          .contact-form-wrap { padding: 32px 24px; }
        }

        /* ── CTA ── */
        .cta-section { background: linear-gradient(135deg, ${DARK} 0%, #0d2e3a 100%); padding: 80px 24px; text-align: center; }
        .cta-title { font-size: clamp(30px, 4vw, 48px); font-weight: 800; color: white; margin-bottom: 16px; }
        .cta-title .accent { color: var(--blue); }
        .cta-sub { font-size: 18px; color: rgba(255,255,255,.65); margin-bottom: 36px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.6; }
        .cta-buttons { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        /* ── FOOTER ── */
        .footer { background: ${DARK}; color: rgba(255,255,255,.7); padding: 64px 24px 32px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; max-width: 1200px; margin: 0 auto; }
        .footer-logo { font-size: 20px; font-weight: 700; color: white; margin-bottom: 14px; }
        .footer-logo span { color: var(--blue); }
        .footer-desc { font-size: 14px; line-height: 1.65; }
        .footer-col-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: white; margin-bottom: 16px; }
        .footer-links { display: flex; flex-direction: column; gap: 10px; }
        .footer-links a { font-size: 14px; color: rgba(255,255,255,.6); transition: color .2s; }
        .footer-links a:hover { color: white; }
        .footer-bottom {
          max-width: 1200px; margin: 48px auto 0;
          border-top: 1px solid rgba(255,255,255,.1); padding-top: 24px;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 12px; font-size: 13px; color: rgba(255,255,255,.4);
        }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } }

        /* ── BUTTONS ── */
        .btn-primary {
          background: var(--blue); color: white; padding: 14px 28px; border-radius: 10px;
          font-size: 16px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;
          transition: background .2s, transform .15s; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; text-decoration: none;
        }
        .btn-primary:hover { background: var(--blue-dark); transform: translateY(-1px); }
        .btn-white {
          background: white; color: var(--dark); padding: 14px 28px; border-radius: 10px;
          font-size: 16px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;
          transition: background .2s, transform .15s; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; text-decoration: none;
        }
        .btn-white:hover { background: rgba(255,255,255,.9); transform: translateY(-1px); }
      `}</style>

            {/* POPUP */}
            {showPopup && (
                <div className="popup-overlay" onClick={e => { if (e.target === e.currentTarget) setShowPopup(false); }}>
                    <div className="popup-card">
                        <button className="popup-close" onClick={() => setShowPopup(false)} aria-label="Close">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                        <div style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 6 }}>Let's Publish Your Book</div>
                        <div style={{ fontSize: 14, color: TEXT_BODY, marginBottom: 24 }}>Tell us about your project and we'll get back to you within 24 hours.</div>
                        <ContactForm />
                    </div>
                </div>
            )}

            {/* ── HEADER ── */}
            <header className={`header${scrolled ? ' scrolled' : ''}`}>
                <div className="header-inner">
                    <a href="/" className="logo">Alpine <span>Publishing</span> Studios</a>
                    <nav className="nav">
                        <a href="/services">Services</a>
                        <a href="/consultation">Consultation</a>
                        <a href="/about-us" className="active">About Us</a>
                        <a href="/contact-us">Contact</a>
                        <a href="/blogs">Blogs</a>
                    </nav>
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        <span /><span /><span />
                    </button>
                </div>
                <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                    <a href="/services" onClick={() => setMenuOpen(false)}>Services</a>
                    <a href="/consultation" onClick={() => setMenuOpen(false)}>Consultation</a>
                    <a href="/about-us" onClick={() => setMenuOpen(false)}>About Us</a>
                    <a href="/contact-us" onClick={() => setMenuOpen(false)}>Contact</a>
                    <a href="/blogs" onClick={() => setMenuOpen(false)}>Blogs</a>
                </div>
            </header>

            <main>
                {/* ── HERO ── */}
                <section className="about-hero">
                    <div className="hero-blob1" />
                    <div className="hero-blob2" />
                    <div className="about-hero-inner">
                        <span className="section-label">About Us</span>
                        <h1>We Exist to Empower <span style={{ color: BLUE }}>Every Author's Voice</span></h1>
                        <p>Alpine Publishing Studios was born from a simple belief: that every author — regardless of budget, connections, or experience — deserves access to world-class publishing. We're leveling the playing field, one book at a time.</p>
                        <div className="hero-badges">
                            {['Founded 2015', '30,000+ Authors Published', '150+ Countries Reached', 'Rated 4.9★'].map((b, i) => (
                                <div className={`hero-badge anim-fade-up anim-delay-${i + 1}`} key={b}><div className="hero-badge-dot" />{b}</div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PRESS STRIP ── */}
                <section className="press-strip">
                    <div className="press-label">As seen in</div>
                    <div className="press-logos">
                        {pressLogos.map(name => (
                            <div key={name} style={{ fontSize: 13, fontWeight: 700, color: '#bbb', letterSpacing: '.04em', textTransform: 'uppercase' }}>{name}</div>
                        ))}
                    </div>
                </section>

                {/* ── MISSION ── */}
                <section className="mission-section">
                    <div className="mission-layout">
                        <div className="mission-img-stack anim-fade-left">
                            <div className="mission-img-main">
                                <img src="https://cdn.spines.com/wp-content/uploads/2025/04/author-with-book-600x773.jpg" alt="Author with book" />
                            </div>
                            <div className="mission-img-badge">
                                <div className="mission-img-badge-num">30<span>K+</span></div>
                                <div className="mission-img-badge-label">Authors trust Alpine worldwide</div>
                            </div>
                        </div>
                        <div className="anim-fade-right">
                            <span className="section-label">Our Mission</span>
                            <h2 className="section-title">Democratizing <span className="accent">Publishing</span> for Everyone</h2>
                            <p className="mission-text" style={{ marginTop: 16 }}>
                                For too long, traditional publishing gatekeepers decided whose stories got told. We founded Alpine Publishing Studios to change that — permanently.
                            </p>
                            <p className="mission-text">
                                We believe the best books aren't always the ones with the biggest advances or the most industry connections. They're the ones written from the heart by authors who have something real to say. Our platform gives those authors the professional tools, distribution, and support they deserve.
                            </p>
                            <div className="mission-pillars">
                                {[
                                    { title: 'Professional Quality', desc: "Every book published through Alpine meets the same standards as the world's top publishers." },
                                    { title: 'Fair Economics', desc: 'Authors keep up to 80% of royalties. We grow when you grow.' },
                                    { title: 'Real Human Support', desc: 'Behind every tool is a team of publishing experts ready to help.' },
                                ].map((p, i) => (
                                    <div className={`mission-pillar anim-fade-up anim-delay-${i + 1}`} key={i}>
                                        <div className="pillar-icon">
                                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.59l7.3-7.3a1 1 0 011.4 0z" fill={BLUE} />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="pillar-title">{p.title}</div>
                                            <div className="pillar-desc">{p.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── STATS ── */}
                <section className="stats-section" ref={statsRef}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <span className="section-label">By the Numbers</span>
                        <h2 className="section-title">Our Impact in <span className="accent">Numbers</span></h2>
                    </div>
                    <div className="stats-grid">
                        {stats.map((s, i) => (
                            <div className="stat-card" key={i}>
                                <div className="stat-value"><AnimatedCounter target={s.value} suffix={s.suffix} /></div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── VALUES ── */}
                <section className="values-section">
                    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                        <div className="values-intro anim-fade-up">
                            <span className="section-label">What We Stand For</span>
                            <h2 className="section-title">The Values That <span className="accent">Drive Us</span></h2>
                            <p className="section-sub">These aren't just words on a wall. They're the principles behind every feature we build, every author we support, and every decision we make.</p>
                        </div>
                        <div className="values-grid">
                            {values.map((v, i) => (
                                <div className={`value-card anim-fade-up anim-delay-${i + 1}`} key={i}>
                                    <div className="value-icon">{v.icon}</div>
                                    <div className="value-title">{v.title}</div>
                                    <div className="value-desc">{v.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CONTACT FORM ── */}
                <section className="contact-section" id="contact-form">
                    <div className="contact-layout">
                        <div style={{ position: 'relative' }}>
                            <div className="contact-left-img">
                                <img src="https://cdn.spines.com/wp-content/uploads/2025/04/author-with-book-600x773.jpg" alt="Author" />
                            </div>
                            <div className="contact-img-badge">
                                <div className="contact-img-badge-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="contact-img-badge-title">30,000+ authors trust us</div>
                                    <div className="contact-img-badge-sub">Published in 150+ countries worldwide</div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-form-wrap">
                            <span className="section-label">Get In Touch</span>
                            <h2 className="section-title" style={{ fontSize: 32, marginBottom: 8 }}>Ready to Publish <span className="accent">Your Book?</span></h2>
                            <p style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.6, marginBottom: 28 }}>Share your details and project below. Our publishing team will reach out within 24 hours to guide you through the next steps.</p>
                            <ContactForm />
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="cta-section">
                    <div className="cta-title">Your Story Deserves to <span className="accent">Be Told</span></div>
                    <p className="cta-sub">Start publishing today with Alpine Publishing Studios — the platform built by authors, for authors.</p>
                    <div className="cta-buttons">
                        <a href="/contact-us" className="btn-primary">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                            Get Started for Free
                        </a>
                        <a href="/services" className="btn-white">Explore Services</a>
                    </div>
                </section>
            </main>

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
                            <a href="/how-it-works">How It Works</a>
                            <a href="/contact-us">Contact Us</a>
                            <a href="/faq">FAQ</a>
                        </div>
                    </div>
                    <div>
                        <div className="footer-col-title">Company</div>
                        <div className="footer-links">
                            <a href="/about-us">About Us</a>
                            <a href="/blogs">Blog</a>
                            <a href="/careers">Careers</a>
                        </div>
                    </div>
                    <div>
                        <div className="footer-col-title">Legal</div>
                        <div className="footer-links">
                            <a href="/privacy">Privacy Policy</a>
                            <a href="/terms">Terms of Service</a>
                            <a href="/cookies">Cookie Policy</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} Alpine Publishing Studios. All rights reserved.</span>
                    {/* <span>Made with ❤️ for authors everywhere</span> */}
                </div>
            </footer>
        </>
    );
}