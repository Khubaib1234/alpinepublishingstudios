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
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        bookTitle: '',
        genre: '',
        wordCount: '',
        hasManuscript: '',
        services: '',
        timeline: '',
        message: '',
    });
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
                body: JSON.stringify({ formType: 'project', ...form, project: form.message }),
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
                <div style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 12 }}>Message Sent!</div>
                <div style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.65, maxWidth: 340, margin: '0 auto' }}>
                    Thank you for reaching out. Our publishing team will get back to you within 24 hours.
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
            {/* Full Name + Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                    <label style={labelStyle}>Full Name *</label>
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
                    <label style={labelStyle}>Email Address *</label>
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
            {/* Phone + Book Title */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
                    <label style={labelStyle}>Book Title / Working Title</label>
                    <input
                        type="text"
                        placeholder="My Book Title"
                        value={form.bookTitle}
                        onChange={e => setForm({ ...form, bookTitle: e.target.value })}
                        onFocus={() => setFocused('bookTitle')}
                        onBlur={() => setFocused(null)}
                        style={inputStyle('bookTitle')}
                    />
                </div>
            </div>
            {/* Genre + Word Count */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                    <label style={labelStyle}>Genre / Category</label>
                    <input
                        type="text"
                        placeholder="e.g. Fiction, Self-Help, Memoir"
                        value={form.genre}
                        onChange={e => setForm({ ...form, genre: e.target.value })}
                        onFocus={() => setFocused('genre')}
                        onBlur={() => setFocused(null)}
                        style={inputStyle('genre')}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Estimated Word Count</label>
                    <input
                        type="text"
                        placeholder="e.g. 60,000"
                        value={form.wordCount}
                        onChange={e => setForm({ ...form, wordCount: e.target.value })}
                        onFocus={() => setFocused('wordCount')}
                        onBlur={() => setFocused(null)}
                        style={inputStyle('wordCount')}
                    />
                </div>
            </div>
            {/* Has Manuscript */}
            <div>
                <label style={labelStyle}>Do you have a completed manuscript?</label>
                <select
                    value={form.hasManuscript}
                    onChange={e => setForm({ ...form, hasManuscript: e.target.value })}
                    onFocus={() => setFocused('hasManuscript')}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle('hasManuscript'), cursor: 'pointer', appearance: 'none' }}
                >
                    <option value="">Select an option...</option>
                    <option value="yes_complete">Yes, it's complete</option>
                    <option value="yes_partial">Partially complete</option>
                    <option value="no_outline">No, just an outline</option>
                    <option value="no_idea">No, just an idea</option>
                </select>
            </div>
            {/* Services */}
            <div>
                <label style={labelStyle}>Which services are you interested in?</label>
                <select
                    value={form.services}
                    onChange={e => setForm({ ...form, services: e.target.value })}
                    onFocus={() => setFocused('services')}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle('services'), cursor: 'pointer', appearance: 'none' }}
                >
                    <option value="">Select a service...</option>
                    <option value="editing">Editing</option>
                    <option value="proofreading">Proofreading</option>
                    <option value="cover_design">Cover Design</option>
                    <option value="formatting">Formatting</option>
                    <option value="publishing">Publishing</option>
                    <option value="marketing">Marketing</option>
                    <option value="ghostwriting">Ghostwriting</option>
                    <option value="full_support">Full Publishing Support</option>
                    <option value="not_sure">Not Sure Yet</option>
                </select>
            </div>
            {/* Timeline */}
            <div>
                <label style={labelStyle}>Preferred Publishing Timeline</label>
                <select
                    value={form.timeline}
                    onChange={e => setForm({ ...form, timeline: e.target.value })}
                    onFocus={() => setFocused('timeline')}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle('timeline'), cursor: 'pointer', appearance: 'none' }}
                >
                    <option value="">Select a timeline...</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1_3_months">1–3 months</option>
                    <option value="3_6_months">3–6 months</option>
                    <option value="6_12_months">6–12 months</option>
                    <option value="flexible">Flexible / No rush</option>
                </select>
            </div>
            {/* Project description */}
            <div>
                <label style={labelStyle}>Tell us about your project *</label>
                <textarea
                    required
                    placeholder="Share your story — what's your book about, where are you in the process, and what do you need help with?"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    style={{ ...inputStyle('message'), resize: 'none', lineHeight: 1.55 }}
                />
            </div>
            {error && <p style={{ fontSize: 13, color: '#e53e3e', textAlign: 'center', marginTop: -4 }}>{error}</p>}
            <button
                type="submit"
                disabled={submitting}
                style={{
                    background: submitting ? '#aaa' : BLUE, color: WHITE, border: 'none',
                    padding: '15px 28px', borderRadius: 10,
                    fontSize: 16, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', width: '100%',
                    transition: 'background .2s, transform .15s',
                    fontFamily: "'DM Sans', sans-serif",
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
                onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = BLUE_DARK; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                onMouseLeave={e => { if (!submitting) { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = 'translateY(0)'; } }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
                {submitting ? 'Sending...' : 'Submit My Quote Request'}
            </button>
            <p style={{ fontSize: 12, color: TEXT_BODY, textAlign: 'center', marginTop: -4 }}>
                No spam. No pressure. Your information is used only to understand your publishing needs and respond to your inquiry.
            </p>
        </form>
    );
}

export default function ContactPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

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

    useEffect(() => {
        const isFirstLoad = !sessionStorage.getItem('alpine_visited');
        sessionStorage.setItem('alpine_visited', '1');
        const delay = isFirstLoad ? 0 : 5000;
        const timer = setTimeout(() => setShowPopup(true), delay);
        return () => clearTimeout(timer);
    }, []);

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

    const contactCards = [
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
            label: 'Email',
            value: 'support@alpinepublishingstudios.com',
            sub: 'A publishing specialist will reach out after reviewing your project details.',
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                </svg>
            ),
            label: 'Phone',
            value: '(312) 752-2806',
            sub: 'Monday to Friday, 9 AM – 6 PM',
        },
        {
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            ),
            label: 'Response Time',
            value: 'Within 24 Hours',
            sub: 'Usually much faster',
        },
    ];

    const faqs = [
        {
            q: 'Can I contact Alpine if my manuscript is not finished?',
            a: 'Yes. You can contact us at any stage, whether you have an idea, outline, partial draft, full manuscript, or already published book.',
        },
        {
            q: 'Can I request only one service?',
            a: 'Yes. You can request individual services such as proofreading, cover design, formatting, or publishing support.',
        },
        {
            q: 'Can Alpine handle the full publishing process?',
            a: 'Yes. Alpine can support the full journey, including editing, design, formatting, publishing, distribution guidance, and marketing support.',
        },
        {
            q: 'Will I keep the rights to my book?',
            a: 'Yes. Your book, rights, and creative decisions remain yours. Alpine supports the publishing process without taking ownership of your work.',
        },
        {
            q: 'How do I get a quote?',
            a: 'Fill out the quote form with your book details. Our team will review the information and respond with the best next step.',
        },
    ];

    const [openFaq, setOpenFaq] = useState(null);

    const reasonsToContact = [
        'Finishing or improving your manuscript',
        'Editing and proofreading your book',
        'Designing a professional book cover',
        'Formatting your book for print or eBook platforms',
        'Publishing your book on major platforms',
        'Creating a stronger author bio or book description',
        'Preparing social media content and launch messaging',
        'Understanding what your book needs before moving forward',
    ];

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
        .contact-hero-inner { animation: heroFadeUp 0.9s cubic-bezier(.22,1,.36,1) both; }
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
        img { display: block; max-width: 100%; }

        /* ── HEADER ── */
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
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--dark); border-radius: 2px; transition: all .3s; }
        .mobile-menu {
          display: none; position: fixed; top: 70px; left: 0; right: 0; bottom: 0;
          background: white; z-index: 998; padding: 24px;
          flex-direction: column; gap: 16px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { font-size: 18px; font-weight: 500; color: var(--dark); padding: 10px 0; border-bottom: 1px solid var(--border); }
        @media (max-width: 768px) {
          .nav { display: none; }
          .hamburger { display: flex; }
        }

        /* ── HERO BANNER ── */
        .contact-hero {
          padding-top: 70px;
          background: var(--bg);
          position: relative; overflow: hidden;
        }
        .hero-blob1 {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: rgba(22,144,206,0.10); filter: blur(120px);
          top: -100px; left: -150px; pointer-events: none;
        }
        .hero-blob2 {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: rgba(68,169,207,0.08); filter: blur(100px);
          top: -60px; right: -100px; pointer-events: none;
        }
        .contact-hero-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 72px 24px 64px;
          position: relative; z-index: 1;
          text-align: center;
        }
        .section-label {
          display: inline-block; background: var(--blue-light); color: var(--blue);
          font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 20px; margin-bottom: 20px;
        }
        .contact-hero-title {
          font-size: clamp(36px, 5vw, 56px); font-weight: 800;
          color: var(--dark); line-height: 1.1; margin-bottom: 18px;
          letter-spacing: -.03em;
        }
        .contact-hero-title .accent { color: var(--blue); }
        .contact-hero-sub {
          font-size: 18px; color: var(--body); line-height: 1.65;
          max-width: 560px; margin: 0 auto 28px;
        }
        .hero-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--blue); color: white;
          padding: 14px 28px; border-radius: 10px;
          font-size: 16px; font-weight: 700;
          border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background .2s, transform .15s;
          text-decoration: none;
        }
        .hero-btn:hover { background: var(--blue-dark); transform: translateY(-1px); }

        /* ── CONTACT CARDS ── */
        .contact-cards-section {
          background: white;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 48px 24px;
        }
        .contact-cards-section-header {
          text-align: center;
          margin-bottom: 36px;
        }
        .contact-cards-section-title {
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          color: var(--dark);
        }
        .contact-cards-grid {
          max-width: 900px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        .contact-card {
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 12px; padding: 28px;
          border: 1px solid var(--border); border-radius: 16px;
          transition: box-shadow .25s, transform .25s;
          background: white;
        }
        .contact-card:hover { box-shadow: 0 12px 40px rgba(22,144,206,.12); transform: translateY(-2px); }
        .contact-card-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: var(--blue-light);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .contact-card-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--body); }
        .contact-card-value { font-size: 17px; font-weight: 700; color: var(--dark); }
        .contact-card-sub { font-size: 13px; color: var(--body); }
        @media (max-width: 700px) { .contact-cards-grid { grid-template-columns: 1fr; } }

        /* ── MAIN CONTACT SECTION ── */
        .contact-main {
          padding: 96px 24px;
          background: var(--bg);
          position: relative; overflow: hidden;
        }
        .contact-main::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 10% 50%, rgba(22,144,206,0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 90% 20%, rgba(22,144,206,0.04) 0%, transparent 50%);
          pointer-events: none;
        }
        .contact-main-layout {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1.4fr; gap: 64px;
          align-items: start; position: relative;
        }

        /* Left column */
        .contact-left {}
        .contact-left-title { font-size: 32px; font-weight: 700; color: var(--dark); margin-bottom: 12px; line-height: 1.2; }
        .contact-left-title .accent { color: var(--blue); }
        .contact-left-sub { font-size: 15px; color: var(--body); line-height: 1.65; margin-bottom: 36px; }

        .info-block { display: flex; flex-direction: column; gap: 20px; margin-bottom: 40px; }
        .info-row { display: flex; align-items: flex-start; gap: 14px; }
        .info-row-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: var(--blue-light);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .info-row-label { font-size: 12px; font-weight: 700; color: var(--body); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 3px; }
        .info-row-value { font-size: 15px; font-weight: 600; color: var(--dark); }

        .trust-badges { display: flex; flex-direction: column; gap: 12px; }
        .trust-badge {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; color: var(--body); font-weight: 500;
        }
        .trust-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--blue); flex-shrink: 0;
        }

        /* Right: form card */
        .contact-form-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 44px 40px;
          box-shadow: 0 8px 40px rgba(19,59,73,.07);
          position: relative;
        }
        .contact-form-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, ${BLUE}, #44B8F0);
          border-radius: 20px 20px 0 0;
        }
        .contact-form-title { font-size: 22px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
        .contact-form-sub { font-size: 14px; color: var(--body); margin-bottom: 28px; line-height: 1.5; }

        @media (max-width: 960px) {
          .contact-main-layout { grid-template-columns: 1fr; gap: 40px; }
          .contact-form-card { padding: 32px 24px; }
        }

        /* ── REASONS TO CONTACT ── */
        .reasons-section {
          background: var(--bg);
          padding: 80px 24px;
          border-top: 1px solid var(--border);
        }
        .reasons-inner {
          max-width: 900px; margin: 0 auto;
        }
        .reasons-header {
          text-align: center; margin-bottom: 48px;
        }
        .reasons-title {
          font-size: clamp(26px, 3vw, 38px); font-weight: 700; color: var(--dark);
        }
        .reasons-title .accent { color: var(--blue); }
        .reasons-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
        }
        .reason-item {
          display: flex; align-items: flex-start; gap: 14px;
          background: white; border: 1px solid var(--border);
          border-radius: 14px; padding: 20px 22px;
          transition: box-shadow .25s, transform .25s;
        }
        .reason-item:hover { box-shadow: 0 8px 28px rgba(22,144,206,.10); transform: translateY(-2px); }
        .reason-icon {
          width: 36px; height: 36px; border-radius: 8px;
          background: var(--blue-light);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .reason-text {
          font-size: 15px; font-weight: 500; color: var(--dark); line-height: 1.45;
          padding-top: 6px;
        }
        @media (max-width: 640px) { .reasons-grid { grid-template-columns: 1fr; } }

        /* ── FAQ ── */
        .faq-section { background: white; padding: 96px 24px; border-top: 1px solid var(--border); }
        .faq-inner { max-width: 720px; margin: 0 auto; }
        .faq-header { text-align: center; margin-bottom: 48px; }
        .faq-title { font-size: clamp(28px, 3vw, 40px); font-weight: 700; color: var(--dark); margin-bottom: 12px; }
        .faq-title .accent { color: var(--blue); }
        .faq-sub { font-size: 16px; color: var(--body); }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-question {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 0; cursor: pointer; gap: 16px;
          font-size: 16px; font-weight: 600; color: var(--dark);
          background: none; border: none; width: 100%; text-align: left;
          font-family: 'DM Sans', sans-serif;
        }
        .faq-chevron { flex-shrink: 0; width: 20px; height: 20px; color: var(--body); transition: transform .3s; }
        .faq-chevron.open { transform: rotate(180deg); }
        .faq-answer { font-size: 15px; color: var(--body); line-height: 1.65; max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .35s ease; }
        .faq-answer.open { max-height: 300px; padding-bottom: 18px; }

        /* ── CTA ── */
        .cta-section {
          background: linear-gradient(135deg, ${DARK} 0%, #0d2e3a 100%);
          padding: 80px 24px; text-align: center;
        }
        .cta-title { font-size: clamp(28px, 4vw, 44px); font-weight: 800; color: white; margin-bottom: 16px; }
        .cta-title .accent { color: var(--blue); }
        .cta-sub { font-size: 17px; color: rgba(255,255,255,.65); margin-bottom: 36px; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.6; }

        /* ── FOOTER ── */
        .footer { background: ${DARK}; color: rgba(255,255,255,.7); padding: 64px 24px 32px; }
        .footer-grid {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px; max-width: 1200px; margin: 0 auto;
        }
        .footer-logo { font-size: 20px; font-weight: 700; color: white; margin-bottom: 14px; }
        .footer-logo span { color: var(--blue); }
        .footer-desc { font-size: 14px; line-height: 1.65; margin-bottom: 20px; }
        .footer-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--blue); color: white;
          padding: 11px 20px; border-radius: 8px;
          font-size: 14px; font-weight: 700;
          border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background .2s;
          text-decoration: none;
        }
        .footer-cta-btn:hover { background: var(--blue-dark); }
        .footer-col-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: white; margin-bottom: 16px; }
        .footer-links { display: flex; flex-direction: column; gap: 10px; }
        .footer-links a { font-size: 14px; color: rgba(255,255,255,.6); transition: color .2s; }
        .footer-links a:hover { color: white; }
        .footer-contact-block { margin-top: 32px; }
        .footer-contact-item { font-size: 13px; color: rgba(255,255,255,.55); margin-bottom: 6px; }
        .footer-bottom {
          max-width: 1200px; margin: 48px auto 0;
          border-top: 1px solid rgba(255,255,255,.1); padding-top: 24px;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 12px; font-size: 13px; color: rgba(255,255,255,.4);
        }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
          .contact-hero-inner { padding: 56px 20px 48px; }
        }

        /* Shared buttons */
        .btn-primary {
          background: var(--blue); color: white;
          padding: 14px 28px; border-radius: 10px;
          font-size: 16px; font-weight: 700;
          display: inline-flex; align-items: center; gap: 8px;
          transition: background .2s, transform .15s;
          border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
          text-decoration: none;
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
                        <a href="/about-us">About Us</a>
                        <a href="/contact-us" className="active">Contact</a>
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
                {/* ── HERO BANNER ── */}
                <section className="contact-hero">
                    <div className="hero-blob1" />
                    <div className="hero-blob2" />
                    <div className="contact-hero-inner">
                        <span className="section-label">Contact Alpine Publishing Studios</span>
                        <h1 className="contact-hero-title">
                            Tell Us About Your Book. <span className="accent">We'll Help You Take the Next Step.</span>
                        </h1>
                        <p className="contact-hero-sub">
                            Whether you need editing, cover design, formatting, publishing support, marketing direction, or full book production, our team is ready to hear about your project.
                        </p>
                        <a href="#quote-form" className="hero-btn">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                            Request a Publishing Quote
                        </a>
                    </div>
                </section>

                {/* ── CONTACT DETAILS SECTION ── */}
                <section className="contact-cards-section">
                    <div className="contact-cards-section-header">
                        <h2 className="contact-cards-section-title">Get in Touch</h2>
                    </div>
                    <div className="contact-cards-grid">
                        {contactCards.map((card, i) => (
                            <div className={`contact-card anim-fade-up anim-delay-${i + 1}`} key={i}>
                                <div className="contact-card-icon">{card.icon}</div>
                                <div>
                                    <div className="contact-card-label">{card.label}</div>
                                    <div className="contact-card-value">{card.value}</div>
                                    <div className="contact-card-sub">{card.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── LEAD FORM SECTION ── */}
                <section className="contact-main" id="quote-form">
                    <div className="contact-main-layout">

                        {/* Left Column */}
                        <div className="contact-left anim-fade-left">
                            <span className="section-label">Get In Touch</span>
                            <h2 className="contact-left-title">
                                Ready to Publish <span className="accent">Your Book?</span>
                            </h2>
                            <p className="contact-left-sub">
                                Share your details and project below. Our publishing team will reach out within 24 hours to guide you through the next steps — from manuscript to marketplace.
                            </p>

                            <div className="info-block">
                                <div className="info-row">
                                    <div className="info-row-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="info-row-label">Email</div>
                                        <div className="info-row-value">support@alpinepublishingstudios.com</div>
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-row-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="info-row-label">Phone</div>
                                        <div className="info-row-value">(312) 752-2806</div>
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-row-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="info-row-label">Business Hours</div>
                                        <div className="info-row-value">Monday to Friday, 9 AM – 6 PM</div>
                                    </div>
                                </div>
                            </div>

                            <div className="trust-badges">
                                {[
                                    'Your rights stay yours.',
                                    'Human support at every major stage.',
                                    'Professional files for print and digital publishing.',
                                    'Built for authors who want clarity, quality, and control.',
                                ].map((text, i) => (
                                    <div className="trust-badge" key={i}>
                                        <div className="trust-badge-dot" />
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="contact-form-card anim-fade-right">
                            <div className="contact-form-title">Request a Publishing Quote</div>
                            <div className="contact-form-sub">
                                Share a few details about your book so we can understand what kind of support you are looking for. The more context you provide, the better we can guide the next step.
                            </div>
                            <ContactForm />
                        </div>
                    </div>
                </section>

                {/* ── REASONS TO CONTACT ── */}
                <section className="reasons-section">
                    <div className="reasons-inner">
                        <div className="reasons-header anim-fade-up">
                            <h2 className="reasons-title">Reach Out If You Want <span className="accent">Help With...</span></h2>
                        </div>
                        <div className="reasons-grid">
                            {reasonsToContact.map((reason, i) => (
                                <div className={`reason-item anim-fade-up anim-delay-${(i % 4) + 1}`} key={i}>
                                    <div className="reason-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <div className="reason-text">{reason}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section className="faq-section">
                    <div className="faq-inner">
                        <div className="faq-header">
                            <span className="section-label">FAQ</span>
                            <h2 className="faq-title">Common <span className="accent">Questions</span></h2>
                            <p className="faq-sub">Quick answers to the things authors ask us most.</p>
                        </div>
                        {faqs.map((f, i) => (
                            <div className="faq-item" key={i}>
                                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    {f.q}
                                    <svg className={`faq-chevron${openFaq === i ? ' open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>
                                <div className={`faq-answer${openFaq === i ? ' open' : ''}`}>{f.a}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── FINAL CTA BANNER ── */}
                <section className="cta-section">
                    <div className="cta-title">Your Book Is Ready for <span className="accent">Its Next Step</span></div>
                    <p className="cta-sub">Tell us where you are in the journey, and we will help you move forward from there.</p>
                    <a
                        href="#quote-form"
                        className="btn-primary-lg"
                        onClick={e => { e.preventDefault(); document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                        Request My Publishing Quote
                    </a>
                </section>
            </main>

            {/* ── FOOTER ── */}
            <footer className="footer">
                <div className="footer-grid">
                    <div>
                        <div className="footer-logo">Alpine <span>Publishing</span> Studios</div>
                        <div className="footer-desc">Alpine Publishing Studios helps authors edit, design, format, publish, and promote books with professional support from manuscript to marketplace.</div>
                        <div style={{ marginBottom: 8, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Ready to publish your book? Start with a quick quote request.</div>
                        <a href="#quote-form" className="footer-cta-btn" onClick={e => { e.preventDefault(); document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' }); }}>
                            Get a Publishing Quote
                        </a>
                        <div className="footer-contact-block">
                            <div className="footer-contact-item">Email: support@alpinepublishingstudios.com</div>
                            <div className="footer-contact-item">Phone: (312) 752-2806</div>
                            <div className="footer-contact-item">Website: [Website URL]</div>
                        </div>
                    </div>
                    <div>
                        <div className="footer-col-title">Company</div>
                        <div className="footer-links">
                            <a href="/about-us">About Us</a>
                            <a href="/services">Services</a>
                            <a href="/consultation">Consultation</a>
                            <a href="/blogs">Blogs</a>
                            <a href="/contact-us">Contact Us</a>
                        </div>
                    </div>
                    <div>
                        <div className="footer-col-title">Services</div>
                        <div className="footer-links">
                            <a href="/services/ghostwriting">Ghostwriting</a>
                            <a href="/services/editing">Editing</a>
                            <a href="/services/proofreading">Proofreading</a>
                            <a href="/services/cover-design">Cover Design</a>
                            <a href="/services/formatting">Formatting</a>
                            <a href="/services/publishing">Publishing</a>
                            <a href="/services/marketing">Marketing</a>
                        </div>
                    </div>
                    <div>
                        <div className="footer-col-title">Publishing Support</div>
                        <div className="footer-links">
                            <a href="#">Amazon</a>
                            <a href="#">Barnes &amp; Noble</a>
                            <a href="#">Apple Books</a>
                            <a href="#">Google Play Books</a>
                            <a href="#">Kobo</a>
                            <a href="#">Lulu</a>
                            <a href="#">IngramSpark</a>
                        </div>
                        <div className="footer-col-title" style={{ marginTop: 28 }}>Legal</div>
                        <div className="footer-links">
                            <a href="/privacy">Privacy Policy</a>
                            <a href="/terms">Terms of Service</a>
                            <a href="/cookies">Cookie Policy</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© 2026 Alpine Publishing Studios. All rights reserved.</span>
                </div>
            </footer>
        </>
    );
}