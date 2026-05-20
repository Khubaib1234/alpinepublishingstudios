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

function ConsultationForm() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', query: '' });
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
                body: JSON.stringify({ formType: 'query', ...form }),
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
            <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: BLUE_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 12 }}>Query Received!</div>
                <div style={{ fontSize: 16, color: TEXT_BODY, lineHeight: 1.65, maxWidth: 340, margin: '0 auto' }}>
                    One of our publishing consultants will be in touch within 24 hours to answer your question.
                </div>
            </div>
        );
    }

    const inputStyle = (field) => ({
        width: '100%',
        padding: '13px 16px',
        borderRadius: 10,
        border: `1.5px solid ${focused === field ? BLUE : BORDER}`,
        fontSize: 15,
        color: DARK,
        background: WHITE,
        outline: 'none',
        transition: 'border-color .2s, box-shadow .2s',
        boxShadow: focused === field ? `0 0 0 3px rgba(22,144,206,0.12)` : 'none',
        fontFamily: "'DM Sans', sans-serif",
        boxSizing: 'border-box',
    });

    const labelStyle = {
        fontSize: 13,
        fontWeight: 600,
        color: DARK,
        display: 'block',
        marginBottom: 6,
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                        type="text"
                        required
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        style={inputStyle('name')}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        style={inputStyle('email')}
                    />
                </div>
            </div>
            <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused(null)}
                    style={inputStyle('phone')}
                />
            </div>
            <div>
                <label style={labelStyle}>Your Query</label>
                <textarea
                    required
                    placeholder="Ask us anything — about the publishing process, pricing, timelines, design options, distribution, or anything else on your mind."
                    value={form.query}
                    onChange={e => setForm({ ...form, query: e.target.value })}
                    onFocus={() => setFocused('query')}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    style={{ ...inputStyle('query'), resize: 'none', lineHeight: 1.6 }}
                />
            </div>
            {error && <p style={{ fontSize: 13, color: '#e53e3e', textAlign: 'center', marginTop: -4 }}>{error}</p>}
            <button
                type="submit"
                disabled={submitting}
                style={{
                    background: submitting ? '#aaa' : BLUE,
                    color: WHITE,
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: 10,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    width: '100%',
                    transition: 'background .2s, transform .15s',
                    fontFamily: "'DM Sans', sans-serif",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                }}
                onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = BLUE_DARK; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                onMouseLeave={e => { if (!submitting) { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = 'translateY(0)'; } }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
                {submitting ? 'Sending...' : 'Submit My Query'}
            </button>
            <p style={{ fontSize: 12, color: TEXT_BODY, textAlign: 'center', marginTop: -4 }}>
                We respond within 24 hours · No obligation
            </p>
        </form>
    );
}

export default function ConsultationPage() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Popup auto-trigger: immediate on fresh load/reload, 5s on navigation
    useEffect(() => {
        const isFirstLoad = !sessionStorage.getItem('alpine_visited');
        sessionStorage.setItem('alpine_visited', '1');
        const delay = isFirstLoad ? 0 : 5000;
        const timer = setTimeout(() => setShowPopup(true), delay);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showPopup) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [showPopup]);

    // Scroll-triggered animations
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

    const topics = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round">
                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
            ),
            title: 'Manuscript Editing',
            desc: 'Questions about our editing process, turnaround times, and what to expect from our editorial team.',
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                </svg>
            ),
            title: 'Cover & Interior Design',
            desc: 'Learn how our designers craft covers that captivate and interiors that delight readers.',
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
            ),
            title: 'Global Distribution',
            desc: 'Find out how we get your book onto Amazon, Apple Books, Barnes & Noble, and 150+ countries.',
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
            ),
            title: 'Pricing & Royalties',
            desc: 'Transparent answers about our plans, royalty structure, and what you\'ll earn per book sold.',
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            ),
            title: 'Rights & Ownership',
            desc: 'Clarity on copyright, creative control, and what happens to your intellectual property.',
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
            ),
            title: 'Publishing Timeline',
            desc: 'Understand the typical journey from manuscript upload to your book going live worldwide.',
        },
    ];

    const faqs = [
        { q: 'How quickly will I get a response to my query?', a: 'Our consultation team responds within 24 hours on business days. For urgent matters, you can mention it in your query and we\'ll prioritize accordingly.' },
        { q: 'Is the consultation free?', a: 'Absolutely. Our consultation service is completely free with no obligation. We\'re here to help you make an informed decision.' },
        { q: 'Can I ask about a book I\'ve already started?', a: 'Yes! We love talking to authors at any stage — whether you\'re still writing, have a finished draft, or have already self-published and want to do things differently.' },
        { q: 'What if I have multiple questions?', a: 'Put them all in one query — our consultants are happy to address everything you need in a single conversation.' },
    ];

    const [openFaq, setOpenFaq] = useState(null);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

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
        @keyframes heroFadeRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes blobPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        .hero-blob1 { animation: blobPulse 8s ease-in-out infinite; }
        .hero-blob2 { animation: blobPulse 10s ease-in-out infinite 2s; }
        .hero-content { animation: heroFadeUp 0.9s cubic-bezier(.22,1,.36,1) both; }
        .hero-form-card { animation: heroFadeRight 0.9s cubic-bezier(.22,1,.36,1) 0.2s both; }
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

        .section { padding: 100px 24px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .section-label {
          display: inline-block; background: var(--blue-light); color: var(--blue);
          font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 20px; margin-bottom: 16px;
        }
        .section-title { font-size: clamp(32px, 4vw, 48px); font-weight: 700; color: var(--dark); line-height: 1.15; }
        .section-title .accent { color: var(--blue); }
        .section-sub { font-size: 18px; color: var(--body); line-height: 1.6; margin-top: 12px; }

        /* ── HERO ── */
        .hero {
          padding-top: 130px;
          padding-bottom: 80px;
          background: var(--bg);
          position: relative;
          overflow: hidden;
        }
        .hero-blob1 {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: rgba(22,144,206,0.10); filter: blur(120px);
          top: -80px; left: -120px; pointer-events: none;
        }
        .hero-blob2 {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: rgba(68,169,207,0.08); filter: blur(100px);
          top: -40px; right: -80px; pointer-events: none;
        }
        .hero-inner {
          max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;
          padding: 0 24px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 56px; align-items: center;
        }
        .hero-content h1 {
          font-size: clamp(36px, 4.5vw, 54px); font-weight: 800;
          color: var(--dark); line-height: 1.1; margin-bottom: 20px;
          letter-spacing: -.03em;
        }
        .hero-content p {
          font-size: 17px; color: var(--body); line-height: 1.65;
          max-width: 460px; margin-bottom: 28px;
        }
        .hero-badges { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 28px; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: var(--dark);
          background: white; border: 1px solid var(--border);
          padding: 7px 14px; border-radius: 40px;
        }
        .hero-badge-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--blue); flex-shrink: 0; }

        /* Hero form */
        .hero-form-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px 36px;
          box-shadow: 0 20px 60px rgba(19,59,73,.10), 0 4px 16px rgba(22,144,206,.07);
          position: relative;
        }
        .hero-form-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, ${BLUE}, #44B8F0);
          border-radius: 20px 20px 0 0;
        }
        .hero-form-title { font-size: 22px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
        .hero-form-sub { font-size: 14px; color: var(--body); margin-bottom: 28px; }

        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; gap: 36px; }
        }

        /* ── TOPICS ── */
        .topics-section { background: white; padding: 80px 24px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .topics-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; margin-top: 48px;
        }
        .topic-card {
          background: var(--bg); border: 1px solid var(--border);
          border-radius: 16px; padding: 28px 24px;
          transition: box-shadow .25s, transform .25s, border-color .25s;
        }
        .topic-card:hover { box-shadow: 0 12px 40px rgba(22,144,206,.1); transform: translateY(-2px); border-color: rgba(22,144,206,.3); }
        .topic-icon {
          width: 52px; height: 52px; border-radius: 14px;
          background: var(--blue-light); display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }
        .topic-title { font-size: 17px; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
        .topic-desc { font-size: 14px; color: var(--body); line-height: 1.6; }
        @media (max-width: 900px) { .topics-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .topics-grid { grid-template-columns: 1fr; } }

        /* ── PROCESS ── */
        .process-section { background: var(--bg); padding: 80px 24px; }
        .process-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 56px; position: relative; }
        .process-steps::before {
          content: '';
          position: absolute; top: 28px; left: calc(12.5% + 28px); right: calc(12.5% + 28px);
          height: 2px; background: var(--border); z-index: 0;
        }
        .process-step { text-align: center; position: relative; z-index: 1; padding: 0 12px; }
        .process-num {
          width: 56px; height: 56px; border-radius: 50%;
          background: white; border: 2px solid var(--blue);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px; font-size: 18px; font-weight: 800; color: var(--blue);
        }
        .process-step-title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
        .process-step-desc { font-size: 13px; color: var(--body); line-height: 1.5; }
        @media (max-width: 700px) { .process-steps { grid-template-columns: repeat(2, 1fr); gap: 32px; } .process-steps::before { display: none; } }

        /* ── MAIN FORM SECTION ── */
        .form-section { background: white; padding: 100px 24px; }
        .form-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; }
        .form-left { position: relative; }
        .form-img-wrap {
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 24px 80px rgba(19,59,73,.14);
          position: relative;
        }
        .form-img-wrap img { width: 100%; display: block; }
        .form-img-wrap::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(19,59,73,.55));
        }
        .form-img-badge {
          position: absolute; bottom: 24px; left: 24px; right: 24px; z-index: 2;
          background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
          border-radius: 12px; padding: 16px 20px;
          display: flex; align-items: center; gap: 14px;
          border: 1px solid rgba(255,255,255,0.8);
        }
        .form-img-badge-icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: ${BLUE_LIGHT}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .form-img-badge-title { font-size: 14px; font-weight: 700; color: ${DARK}; }
        .form-img-badge-sub { font-size: 12px; color: ${TEXT_BODY}; }

        .form-right-card {
          background: white; border: 1px solid var(--border);
          border-radius: 20px; padding: 44px 40px;
          box-shadow: 0 8px 40px rgba(19,59,73,.07);
          position: relative;
        }
        .form-right-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, ${BLUE}, #44B8F0);
          border-radius: 20px 20px 0 0;
        }

        @media (max-width: 900px) {
          .form-layout { grid-template-columns: 1fr; }
          .form-left { display: none; }
        }

        /* ── FAQ ── */
        .faq-section { background: var(--bg); padding: 80px 24px; }
        .faq-inner { max-width: 760px; margin: 0 auto; }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-question { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; cursor: pointer; gap: 16px; font-size: 16px; font-weight: 600; color: var(--dark); }
        .faq-chevron { flex-shrink: 0; width: 20px; height: 20px; color: var(--body); transition: transform .3s; }
        .faq-chevron.open { transform: rotate(180deg); }
        .faq-answer { font-size: 15px; color: var(--body); line-height: 1.65; max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .35s ease; }
        .faq-answer.open { max-height: 200px; padding-bottom: 16px; }

        /* ── CTA BANNER ── */
        .cta-section { background: linear-gradient(135deg, ${DARK} 0%, #0d2e3a 100%); padding: 80px 24px; text-align: center; }
        .cta-title { font-size: clamp(28px, 4vw, 44px); font-weight: 800; color: white; margin-bottom: 16px; }
        .cta-title .accent { color: var(--blue); }
        .cta-sub { font-size: 18px; color: rgba(255,255,255,.65); margin-bottom: 36px; max-width: 500px; margin-left: auto; margin-right: auto; }

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
        .footer-bottom { max-width: 1200px; margin: 48px auto 0; border-top: 1px solid rgba(255,255,255,.1); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: rgba(255,255,255,.4); }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } .section { padding: 64px 20px; } }

        .btn-primary {
          background: var(--blue); color: white;
          padding: 14px 28px; border-radius: 10px;
          font-size: 16px; font-weight: 600;
          display: inline-flex; align-items: center; gap: 8px;
          transition: background .2s, transform .15s;
          border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover { background: var(--blue-dark); transform: translateY(-1px); }
        .btn-primary-lg {
          background: var(--blue); color: white;
          padding: 16px 36px; border-radius: 12px;
          font-size: 17px; font-weight: 700;
          display: inline-flex; align-items: center; gap: 10px;
          transition: background .2s, transform .15s;
          border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .btn-primary-lg:hover { background: var(--blue-dark); transform: translateY(-1px); }
      `}</style>

            {/* POPUP */}
            {showPopup && (
                <div className="popup-overlay" onClick={e => { if (e.target === e.currentTarget) setShowPopup(false); }}>
                    <div className="popup-card">
                        <button className="popup-close" onClick={() => setShowPopup(false)} aria-label="Close">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                        <div style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 6 }}>Ask Your Publishing Question</div>
                        <div style={{ fontSize: 14, color: TEXT_BODY, marginBottom: 24 }}>Our publishing consultants will get back to you within 24 hours.</div>
                        <ConsultationForm />
                    </div>
                </div>
            )}

            {/* ── HEADER ── */}
            <header className={`header${scrolled ? ' scrolled' : ''}`}>
                <div className="header-inner">
                    <a href="/" className="logo">Alpine <span>Publishing</span> Studios</a>
                    <nav className="nav">
                        <a href="/services">Services</a>
                        <a href="/consultation" className="active">Consultation</a>
                        <a href="/about-us">About Us</a>
                        <a href="/contact-us">Contact</a>
                        <a href="/blogs">Blogs</a>
                    </nav>
                    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        <span /><span /><span />
                    </div>
                </div>
                <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                    <a href="/services" onClick={() => setMenuOpen(false)}>Services</a>
                    <a href="/consultation" onClick={() => setMenuOpen(false)}>Consultation</a>
                    <a href="/about-us" onClick={() => setMenuOpen(false)}>About Us</a>
                    <a href="/contact-us" onClick={() => setMenuOpen(false)}>Contact</a>
                    <a href="/blogs" onClick={() => setMenuOpen(false)}>Blogs</a>
                </div>
            </header>

            {/* ── HERO ── */}
            <section className="hero">
                <div className="hero-blob1" />
                <div className="hero-blob2" />
                <div className="hero-inner">
                    {/* Left copy */}
                    <div className="hero-content">
                        <span className="section-label">Free Publishing Consultation</span>
                        <h1>Have a Question? <span style={{ color: BLUE }}>We Have Answers.</span></h1>
                        <p>
                            Whether you're a first-time author or a seasoned writer exploring new options, our publishing consultants are here to guide you — at no cost, with no pressure.
                        </p>
                        <div className="hero-badges">
                            {['Free & No Obligation', 'Reply Within 24 Hours', 'Expert Consultants', 'Any Stage of Writing'].map(b => (
                                <div className="hero-badge" key={b}>
                                    <div className="hero-badge-dot" />
                                    {b}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right form */}
                    <div className="hero-form-card">
                        <div className="hero-form-title">Ask Your Question</div>
                        <div className="hero-form-sub">Tell us what's on your mind and a consultant will reach out within 24 hours.</div>
                        <ConsultationForm />
                    </div>
                </div>
            </section>

            {/* ── TOPICS ── */}
            <section className="topics-section">
                <div className="container">
                    <div className="anim-fade-up" style={{ maxWidth: 560 }}>
                        <span className="section-label">What We Cover</span>
                        <h2 className="section-title">Topics We Can <span className="accent">Help You With</span></h2>
                        <p className="section-sub">No question is too big or too small — here are some of the areas our consultants handle every day.</p>
                    </div>
                    <div className="topics-grid">
                        {topics.map((t, i) => (
                            <div className={`topic-card anim-fade-up anim-delay-${i + 1}`} key={i}>
                                <div className="topic-icon">{t.icon}</div>
                                <div className="topic-title">{t.title}</div>
                                <div className="topic-desc">{t.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROCESS ── */}
            <section className="process-section">
                <div className="container">
                    <div className="anim-fade-up" style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
                        <span className="section-label">How It Works</span>
                        <h2 className="section-title">Simple as <span className="accent">Four Steps</span></h2>
                    </div>
                    <div className="process-steps">
                        {[
                            { n: '01', title: 'Submit Your Query', desc: 'Fill out the form with your name, contact info, and your question.' },
                            { n: '02', title: 'We Review It', desc: 'Our team reads your query and matches you with the right consultant.' },
                            { n: '03', title: 'We Reach Out', desc: 'A consultant contacts you within 24 hours via email or phone.' },
                            { n: '04', title: 'Get Your Answers', desc: 'Walk away with clarity and a clear path forward for your book.' },
                        ].map((s, i) => (
                            <div className={`process-step anim-fade-up anim-delay-${i + 1}`} key={i}>
                                <div className="process-num">{s.n}</div>
                                <div className="process-step-title">{s.title}</div>
                                <div className="process-step-desc">{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MAIN FORM SECTION ── */}
            <section className="form-section" id="consultation-form">
                <div className="form-layout">
                    {/* Left image */}
                    <div className="form-left anim-fade-left">
                        <div className="form-img-wrap">
                            <img src="https://cdn.spines.com/wp-content/uploads/2025/04/author-with-book-600x773.jpg" alt="Author consulting" />
                        </div>
                        <div className="form-img-badge">
                            <div className="form-img-badge-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2">
                                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="form-img-badge-title">Expert consultants, real answers</div>
                                <div className="form-img-badge-sub">Backed by 30,000+ author success stories</div>
                            </div>
                        </div>
                    </div>

                    {/* Right form */}
                    <div className="form-right-card anim-fade-right">
                        <span className="section-label">Get In Touch</span>
                        <h2 className="section-title" style={{ fontSize: 32, marginBottom: 8 }}>
                            Ready to Get Your <span className="accent">Questions Answered?</span>
                        </h2>
                        <p style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.6, marginBottom: 28 }}>
                            Share your query below and our publishing team will get back to you within 24 hours with clear, honest guidance — no sales pitch, just real help.
                        </p>
                        <ConsultationForm />
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="faq-section">
                <div className="faq-inner">
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <span className="section-label">FAQ</span>
                        <h2 className="section-title">About Our <span className="accent">Consultation Service</span></h2>
                    </div>
                    {faqs.map((f, i) => (
                        <div className="faq-item" key={i}>
                            <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                {f.q}
                                <svg className={`faq-chevron${openFaq === i ? ' open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </div>
                            <div className={`faq-answer${openFaq === i ? ' open' : ''}`}>{f.a}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="cta-section">
                <div className="cta-title">Your Publishing Journey <span className="accent">Starts Here</span></div>
                <div className="cta-sub">Join over 30,000 authors who trusted Alpine Publishing Studios to bring their stories to the world.</div>
                <a href="#consultation-form">
                    <button className="btn-primary-lg"
                        onMouseEnter={e => { e.currentTarget.style.background = BLUE_DARK; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                        Ask Your Question Now
                    </button>
                </a>
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
                            <a href="/consultation">Consultation</a>
                            <a href="/contact-us">Contact Us</a>
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