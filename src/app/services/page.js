'use client';

import { useState, useEffect } from 'react';

const BLUE = '#1690CE';
const BLUE_DARK = '#0E7AB8';
const BLUE_LIGHT = 'rgba(22, 144, 206, 0.15)';
const DARK = '#133B49';
const TEXT_BODY = '#4C617B';
const BG = '#F8F5F1';
const WHITE = '#ffffff';
const BORDER = '#DCE2EA';

function ContactForm({ onSuccess }) {
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
            if (onSuccess) onSuccess();
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: BLUE_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
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
                    <input type="text" required placeholder="Jane Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} style={inputStyle('name')} />
                </div>
                <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Email Address</label>
                    <input type="email" required placeholder="jane@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} style={inputStyle('email')} />
                </div>
            </div>
            <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} style={inputStyle('phone')} />
            </div>
            <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Tell us about your project</label>
                <textarea required placeholder="Share your story — what's your book about and what service do you need?" value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} onFocus={() => setFocused('project')} onBlur={() => setFocused(null)} rows={4} style={{ ...inputStyle('project'), resize: 'none', lineHeight: 1.55 }} />
            </div>
            {error && <p style={{ fontSize: 13, color: '#e53e3e', textAlign: 'center', marginTop: -4 }}>{error}</p>}
            <button type="submit" disabled={submitting} style={{ background: submitting ? '#aaa' : BLUE, color: WHITE, border: 'none', padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', width: '100%', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = BLUE_DARK; }}
                onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = BLUE; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                {submitting ? 'Sending...' : 'Start My Publishing Journey'}
            </button>
            <p style={{ fontSize: 12, color: TEXT_BODY, textAlign: 'center', marginTop: -4 }}>No credit card required · Free to get started</p>
        </form>
    );
}

const services = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <path d="M16 20h20M16 26h14M16 32h18" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
                <circle cx="36" cy="32" r="5" fill={BLUE} stroke="white" strokeWidth="1.5" />
                <path d="M34 32l1.5 1.5L38 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Effortless Self-Publishing',
        desc: 'Take control of your publishing journey from start to finish. Our AI-powered platform guides you through every stage — from manuscript upload to global distribution — in as little as 72 hours.',
        bullets: ['Fast & Seamless Platform', 'End-to-End Publishing Support', 'Global Reach from Day One'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <path d="M20 34c0-4 3-7 6-9s6-5 6-9" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
                <path d="M18 32c1.5 0 4 1.5 8 1.5S32 32 32 32" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
                <circle cx="26" cy="18" r="4" fill={BLUE} opacity="0.3" />
                <circle cx="26" cy="18" r="2" fill={BLUE} />
            </svg>
        ),
        title: 'Writing Coach',
        desc: 'Unlock your creative potential with personalized guidance from seasoned writing professionals. Whether you\'re starting fresh or refining your story, our coaches help you write with confidence and clarity.',
        bullets: ['One-on-One Expert Coaching', 'Structured Writing Plans', 'Genre-Specific Guidance'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <path d="M18 34l2-8 14-10-2 8-14 10z" stroke={BLUE} strokeWidth="1.8" strokeLinejoin="round" fill={BLUE} fillOpacity="0.15" />
                <path d="M20 26l6 4" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="34" cy="16" r="3" fill={BLUE} />
            </svg>
        ),
        title: 'Expert Ghostwriting',
        desc: 'Have a story to tell but not the time to write it? Our experienced ghostwriters capture your voice and vision, crafting a compelling book that\'s authentically yours — from concept to complete manuscript.',
        bullets: ['100% Confidential & Yours', 'Voice-Matched Writing Style', 'Narrative & Non-Fiction Experts'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <path d="M20 22h12M20 26h8M20 30h10" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
                <path d="M16 18h20a2 2 0 012 2v12a2 2 0 01-2 2H16a2 2 0 01-2-2V20a2 2 0 012-2z" stroke={BLUE} strokeWidth="1.8" />
                <circle cx="34" cy="20" r="4" fill="#fff" stroke={BLUE} strokeWidth="1.5" />
                <path d="M32.5 20l1 1 2-2" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Book Editing',
        desc: 'Stronger sentences, sharper storytelling — expert editing to refine voice, flow, and narrative clarity. Our editors work closely with you to elevate your manuscript without losing your authentic voice.',
        bullets: ['Expert Editing That Elevates', 'Personalized Revision Support', 'Developmental & Line Editing'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <rect x="16" y="14" width="20" height="26" rx="2" stroke={BLUE} strokeWidth="1.8" fill={BLUE} fillOpacity="0.08" />
                <path d="M20 20h12M20 24h9M20 28h10" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M30 10l4 4-10 10H20v-4l10-10z" fill={BLUE} stroke={BLUE} strokeWidth="1" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Book Cover Design',
        desc: 'A powerful cover is your book\'s first impression. Our talented designers craft eye-catching, market-ready covers that capture your story\'s essence and stand out on any shelf — digital or physical.',
        bullets: ['Professional Custom Designs', 'Unlimited Revision Rounds', 'Print & Digital Ready Files'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <path d="M18 20h16M18 25h12M18 30h14" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
                <circle cx="36" cy="18" r="5" fill={BLUE} />
                <path d="M34 18l1.5 1.5L38 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Proofreading & Grammar',
        desc: 'Every word counts. Our meticulous proofreaders catch every error — spelling mistakes, grammar issues, punctuation errors, and inconsistencies — ensuring your manuscript is polished and publication-ready.',
        bullets: ['Line-by-Line Accuracy Review', 'Grammar & Style Corrections', 'Consistency Checks Throughout'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <rect x="16" y="14" width="14" height="18" rx="2" stroke={BLUE} strokeWidth="1.8" fill="none" />
                <rect x="22" y="18" width="14" height="18" rx="2" stroke={BLUE} strokeWidth="1.8" fill={BLUE} fillOpacity="0.08" />
                <path d="M26 22h6M26 26h4" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: 'Flawless Book Formatting',
        desc: 'Professional interior layout that readers love. We format your manuscript to industry standards for both print and digital formats, ensuring a polished reading experience from cover to cover.',
        bullets: ['Print & eBook Ready Layouts', 'Chapter Headers & Styles', 'Meets Retailer Standards'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <rect x="15" y="16" width="22" height="20" rx="3" stroke={BLUE} strokeWidth="1.8" fill="none" />
                <path d="M15 21h22" stroke={BLUE} strokeWidth="1.5" />
                <path d="M20 26h4M20 30h6" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="36" cy="16" r="5" fill={BLUE} />
                <path d="M36 14v4M34 16h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: 'eBook Creation',
        desc: 'Flawless formatting, stunning design — your manuscript ready to shine on every major digital shelf. We create eBooks that display beautifully across all devices and platforms.',
        bullets: ['Flawless Multi-Format Design', 'Interactive & Custom Styling', 'Optimized for Maximum Reach'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <circle cx="26" cy="26" r="10" stroke={BLUE} strokeWidth="1.8" fill="none" />
                <circle cx="26" cy="26" r="4" fill={BLUE} fillOpacity="0.3" />
                <circle cx="26" cy="26" r="2" fill={BLUE} />
                <path d="M26 20v-4M26 36v-4M20 26h-4M36 26h-4" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: 'Audiobook Creation',
        desc: 'Bring your book to life with professional audio production. Our experienced narrators and audio engineers create high-quality audiobooks distributed across all major platforms.',
        bullets: ['Professional Voice Narration', 'Studio-Quality Recording', 'Distributed to Audible & More'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <path d="M14 30l4-6 4 3 4-5 4 2 4-6" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <rect x="14" y="32" width="24" height="3" rx="1.5" fill={BLUE} fillOpacity="0.2" />
                <path d="M16 34h20" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: 'Children\'s Book Publishing',
        desc: 'Bring young imaginations to life with beautifully illustrated, expertly crafted children\'s books. From picture books to middle grade, we handle illustration, layout, and publishing.',
        bullets: ['Custom Illustration Services', 'Age-Appropriate Design', 'Print & Digital Editions'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <path d="M14 34l6-8 4 4 5-7 5 4" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M34 20h4v4" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="14" y="15" width="6" height="5" rx="1" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="1.2" />
            </svg>
        ),
        title: 'Targeted Book Marketing',
        desc: 'Reach your ideal readers with precision. Our marketing specialists craft data-driven campaigns — social media, book reviews, email outreach, and ads — to maximize your book\'s visibility and sales.',
        bullets: ['Social & Digital Campaigns', 'Author Platform Building', 'Launch & Ongoing Promotion'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <rect x="18" y="14" width="16" height="22" rx="2" stroke={BLUE} strokeWidth="1.8" fill={BLUE} fillOpacity="0.08" />
                <path d="M21 20h10M21 24h7M21 28h8" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 34h24" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
                <circle cx="26" cy="37" r="2" fill={BLUE} />
            </svg>
        ),
        title: 'Premium Book Printing',
        desc: 'From single copy to bulk runs — premium print, fast turnaround, and formats for every kind of author. We use top-quality materials for covers and interiors that impress every reader.',
        bullets: ['Hardcover & Paperback Options', 'Print-on-Demand or Bulk', 'Nationwide Printing & Delivery'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <circle cx="26" cy="26" r="9" stroke={BLUE} strokeWidth="1.8" fill="none" />
                <path d="M26 17c0 0-6 4-6 9s6 9 6 9" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M26 17c0 0 6 4 6 9s-6 9-6 9" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M17 26h18" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M18 22h16M18 30h16" stroke={BLUE} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            </svg>
        ),
        title: 'Global Book Distribution',
        desc: 'Global reach made simple. We distribute your book to 100+ retailers, libraries, and platforms worldwide — Amazon, Barnes & Noble, Apple Books, Kobo, and beyond — with full expert support.',
        bullets: ['100+ Retailer & Library Channels', 'eBook, Print & Audio Formats', 'Free Professional ISBN'],
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="26" fill={BLUE_LIGHT} />
                <circle cx="26" cy="22" r="6" stroke={BLUE} strokeWidth="1.8" fill={BLUE} fillOpacity="0.12" />
                <path d="M18 35c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" />
                <path d="M32 19l2 2M38 15l-4 4" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="37" cy="14" r="3" fill={BLUE} />
                <path d="M36 14h2M37 13v2" stroke="white" strokeWidth="1" strokeLinecap="round" />
            </svg>
        ),
        title: 'Publishing Consultation',
        desc: 'Not sure where to start or which path is right for your book? Our publishing consultants offer one-on-one expert guidance to help you navigate the publishing landscape with confidence.',
        bullets: ['Personalized Publishing Roadmap', 'Platform & Strategy Advice', 'Rights, Pricing & Distribution Guidance'],
        featured: true,
    },
];

export default function ServicesPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (showPopup) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [showPopup]);

    const handleGetStarted = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --blue: ${BLUE}; --blue-dark: ${BLUE_DARK}; --blue-light: ${BLUE_LIGHT};
          --dark: ${DARK}; --body: ${TEXT_BODY}; --bg: ${BG}; --white: ${WHITE}; --border: ${BORDER};
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; color: var(--dark); background: var(--bg); }
        a { text-decoration: none; color: inherit; }
        img { display: block; max-width: 100%; }

        .header { position: fixed; top: 0; left: 0; right: 0; z-index: 999; background: ${WHITE}; transition: box-shadow .3s; border-bottom: 1px solid ${BORDER}; }
        .header.scrolled { box-shadow: 0 2px 24px rgba(19,59,73,.08); }
        .header-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; height: 70px; }
        .logo { font-size: 20px; font-weight: 700; color: var(--dark); letter-spacing: -.4px; }
        .logo span { color: var(--blue); }
        .nav { display: flex; gap: 32px; align-items: center; }
        .nav a { font-size: 15px; color: var(--body); transition: color .2s; font-weight: 500; }
        .nav a:hover, .nav a.active { color: var(--blue); }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--dark); border-radius: 2px; }
        .mobile-menu { display: none; position: fixed; top: 70px; left: 0; right: 0; bottom: 0; background: white; z-index: 998; padding: 24px; flex-direction: column; gap: 16px; }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { font-size: 18px; font-weight: 500; color: var(--dark); padding: 8px 0; border-bottom: 1px solid var(--border); }
        @media (max-width: 768px) { .nav { display: none; } .hamburger { display: flex; } }

        /* HERO */
        .hero { padding-top: 70px; background: linear-gradient(160deg, ${DARK} 0%, #1a4d61 50%, #0d3347 100%); position: relative; overflow: hidden; }
        .hero-blob { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; }
        .hero-blob1 { width: 500px; height: 500px; background: rgba(22,144,206,0.25); top: -100px; left: -100px; }
        .hero-blob2 { width: 400px; height: 400px; background: rgba(22,144,206,0.15); top: 50px; right: -120px; }
        .hero-inner { max-width: 1200px; margin: 0 auto; padding: 80px 24px 90px; position: relative; z-index: 1; text-align: center; }
        .hero-label { display: inline-block; background: rgba(22,144,206,0.25); color: #74d4f8; font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; padding: 6px 16px; border-radius: 20px; margin-bottom: 20px; border: 1px solid rgba(22,144,206,0.3); }
        .hero-title { font-size: clamp(36px, 5vw, 60px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 20px; letter-spacing: -.03em; }
        .hero-title .accent { color: #74d4f8; }
        .hero-desc { font-size: 18px; color: rgba(255,255,255,0.75); line-height: 1.65; max-width: 620px; margin: 0 auto 36px; }
        .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .hero-stats { display: flex; gap: 0; margin: 56px auto 0; max-width: 700px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; overflow: hidden; backdrop-filter: blur(10px); }
        .hero-stat { flex: 1; padding: 20px 16px; text-align: center; border-right: 1px solid rgba(255,255,255,0.1); }
        .hero-stat:last-child { border-right: none; }
        .hero-stat-val { font-size: 26px; font-weight: 800; color: white; }
        .hero-stat-lbl { font-size: 12px; color: rgba(255,255,255,0.55); margin-top: 4px; font-weight: 500; }
        @media (max-width: 600px) { .hero-stats { flex-wrap: wrap; } .hero-stat { flex: 1 1 50%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); } }

        /* SERVICES */
        .services-section { padding: 90px 24px; background: var(--bg); }
        .services-header { text-align: center; max-width: 600px; margin: 0 auto 60px; }
        .section-label { display: inline-block; background: var(--blue-light); color: var(--blue); font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; margin-bottom: 16px; }
        .section-title { font-size: clamp(28px, 4vw, 44px); font-weight: 800; color: var(--dark); line-height: 1.15; }
        .section-title .accent { color: var(--blue); }
        .section-sub { font-size: 17px; color: var(--body); line-height: 1.6; margin-top: 12px; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 1000px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .services-grid { grid-template-columns: 1fr; } }

        .service-card { background: white; border: 1px solid var(--border); border-radius: 20px; padding: 28px; transition: all .25s; cursor: default; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, ${BLUE}, #44B8F0); border-radius: 20px 20px 0 0; opacity: 0; transition: opacity .25s; }
        .service-card:hover::before { opacity: 1; }
        .service-card:hover { box-shadow: 0 16px 56px rgba(22,144,206,.14); transform: translateY(-3px); border-color: rgba(22,144,206,0.25); }
        .service-card.featured { border-color: rgba(22,144,206,0.4); background: linear-gradient(135deg, white, rgba(22,144,206,0.03)); }
        .service-card.featured::before { opacity: 1; }
        .service-card.featured::after { content: 'NEW'; position: absolute; top: 16px; right: 16px; background: ${BLUE}; color: white; font-size: 10px; font-weight: 700; letter-spacing: .08em; padding: 4px 8px; border-radius: 6px; }
        .service-icon { margin-bottom: 18px; }
        .service-title { font-size: 20px; font-weight: 700; color: var(--dark); margin-bottom: 10px; line-height: 1.3; }
        .service-desc { font-size: 14.5px; color: var(--body); line-height: 1.65; margin-bottom: 18px; }
        .service-bullets { list-style: none; display: flex; flex-direction: column; gap: 7px; margin-bottom: 20px; }
        .service-bullets li { font-size: 13.5px; color: var(--body); display: flex; align-items: center; gap: 8px; }
        .service-bullets li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: ${BLUE}; flex-shrink: 0; }
        .service-link { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: ${BLUE}; transition: gap .2s; }
        .service-link:hover { gap: 10px; }

        /* CTA SECTION */
        .cta-section { background: linear-gradient(135deg, ${DARK} 0%, #0d2e3a 100%); padding: 90px 24px; }
        .cta-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        @media (max-width: 800px) { .cta-inner { grid-template-columns: 1fr; } }
        .cta-left h2 { font-size: clamp(28px, 4vw, 44px); font-weight: 800; color: white; line-height: 1.15; margin-bottom: 16px; }
        .cta-left h2 .accent { color: #74d4f8; }
        .cta-left p { font-size: 16px; color: rgba(255,255,255,.65); line-height: 1.65; margin-bottom: 28px; }
        .cta-points { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
        .cta-points li { display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.85); font-size: 15px; }
        .cta-point-dot { width: 24px; height: 24px; border-radius: 50%; background: rgba(22,144,206,0.25); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cta-form-card { background: white; border-radius: 20px; padding: 36px 32px; box-shadow: 0 20px 60px rgba(0,0,0,.25); position: relative; }
        .cta-form-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, ${BLUE}, #44B8F0); border-radius: 20px 20px 0 0; }
        .cta-form-title { font-size: 22px; font-weight: 700; color: ${DARK}; margin-bottom: 4px; }
        .cta-form-sub { font-size: 14px; color: ${TEXT_BODY}; margin-bottom: 24px; }

        /* POPUP */
        .popup-overlay { position: fixed; inset: 0; z-index: 9999; background: rgba(19,59,73,.55); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn .2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .popup-card { background: white; border-radius: 24px; width: 100%; max-width: 540px; padding: 40px 36px; position: relative; box-shadow: 0 32px 80px rgba(19,59,73,.2); animation: slideUp .25s ease; max-height: 90vh; overflow-y: auto; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .popup-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, ${BLUE}, #44B8F0); border-radius: 24px 24px 0 0; }
        .popup-close { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 50%; background: var(--bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .popup-close:hover { background: var(--border); }

        /* FOOTER */
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

        .btn-primary { background: var(--blue); color: white; padding: 14px 28px; border-radius: 10px; font-size: 16px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; transition: background .2s, transform .15s; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .btn-primary:hover { background: var(--blue-dark); transform: translateY(-1px); }
        .btn-secondary { color: white; font-size: 15px; font-weight: 500; display: inline-flex; align-items: center; gap: 6px; border: 1.5px solid rgba(255,255,255,0.35); padding: 13px 22px; border-radius: 10px; transition: border-color .2s; background: transparent; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .btn-secondary:hover { border-color: rgba(255,255,255,0.7); }
        .btn-primary-lg { background: var(--blue); color: white; padding: 16px 36px; border-radius: 12px; font-size: 17px; font-weight: 700; display: inline-flex; align-items: center; gap: 10px; transition: background .2s, transform .15s; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .btn-primary-lg:hover { background: var(--blue-dark); transform: translateY(-1px); }
      `}</style>

            {/* POPUP */}
            {showPopup && (
                <div className="popup-overlay" onClick={e => { if (e.target === e.currentTarget) setShowPopup(false); }}>
                    <div className="popup-card">
                        <button className="popup-close" onClick={() => setShowPopup(false)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                        <div style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 6 }}>Let's Publish Your Book</div>
                        <div style={{ fontSize: 14, color: TEXT_BODY, marginBottom: 24 }}>Tell us about your project and we'll get back to you within 24 hours.</div>
                        <ContactForm />
                    </div>
                </div>
            )}

            {/* HEADER */}
            <header className={`header${scrolled ? ' scrolled' : ''}`}>
                <div className="header-inner">
                    <a href="/" className="logo">Alpine <span>Publishing</span> Studios</a>
                    <nav className="nav">
                        <a href="/services" className="active">Services</a>
                        <a href="/consultation">Consultation</a>
                        <a href="/about-us">About Us</a>
                        <a href="/contact-us">Contact</a>
                        <a href="/blogs">Blogs</a>
                        <button className="btn-primary" onClick={handleGetStarted} style={{ padding: '10px 20px', fontSize: 14 }}>Get Started</button>
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

            {/* HERO */}
            <section className="hero">
                <div className="hero-blob hero-blob1" />
                <div className="hero-blob hero-blob2" />
                <div className="hero-inner">
                    <span className="hero-label">Comprehensive Publishing Solutions</span>
                    <h1 className="hero-title">
                        Explore Our <span className="accent">Publishing Services</span>
                    </h1>
                    <p className="hero-desc">
                        From editing and design to distribution and marketing — we offer a full range of services to bring your book to life at every stage of your publishing journey.
                    </p>
                    <div className="hero-btns">
                        <button className="btn-primary" onClick={handleGetStarted}>
                            <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M6 0L12 7L6 14L4.6 12.4L8.4 8H0V6H8.4L4.6 1.6L6 0Z" fill="white" /></svg>
                            Get Started for Free
                        </button>
                        <a href="#services" className="btn-secondary">Explore Services</a>
                    </div>
                    <div className="hero-stats">
                        {[['30K+', 'Published Authors'], ['150+', 'Countries Reached'], ['4.9★', 'Author Satisfaction'], ['72hr', 'Avg. Time to Publish']].map(([val, lbl]) => (
                            <div className="hero-stat" key={lbl}>
                                <div className="hero-stat-val">{val}</div>
                                <div className="hero-stat-lbl">{lbl}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="services-section" id="services">
                <div className="services-header">
                    <span className="section-label">What We Offer</span>
                    <h2 className="section-title">Publishing Services <span className="accent">Built for Every Author</span></h2>
                    <p className="section-sub">From manuscript to marketplace — choose the services that fit your needs, or let us handle everything from start to finish.</p>
                </div>
                <div className="services-grid">
                    {services.map((svc, i) => (
                        <div
                            key={i}
                            className={`service-card${svc.featured ? ' featured' : ''}`}
                            onMouseEnter={() => setHoveredCard(i)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="service-icon">{svc.icon}</div>
                            <div className="service-title">{svc.title}</div>
                            <div className="service-desc">{svc.desc}</div>
                            <ul className="service-bullets">
                                {svc.bullets.map((b, j) => <li key={j}>{b}</li>)}
                            </ul>
                            <button
                                className="service-link"
                                onClick={handleGetStarted}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Learn More
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA + FORM */}
            <section className="cta-section">
                <div className="cta-inner">
                    <div className="cta-left">
                        <h2>Ready to Publish <span className="accent">Your Book?</span></h2>
                        <p>Join over 30,000 authors who have trusted Alpine Publishing Studios to bring their stories to the world. Get started today — it's free.</p>
                        <ul className="cta-points">
                            {['No credit card required to start', 'Expert support at every stage', 'Your rights, your royalties — always'].map((pt, i) => (
                                <li key={i}>
                                    <div className="cta-point-dot">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                    {pt}
                                </li>
                            ))}
                        </ul>
                        <button className="btn-primary-lg" onClick={handleGetStarted}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                            Start Publishing Free
                        </button>
                    </div>
                    <div>
                        <div className="cta-form-card">
                            <div className="cta-form-title">Start Your Journey Today</div>
                            <div className="cta-form-sub">Fill in your details and we'll reach out within 24 hours.</div>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
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
                            <a href="#how-it-works">How It Works</a>
                            <a href="/contact-us">Contact Us</a>
                            <a href="#faq">FAQ</a>
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
                    <span>Made with ❤️ for authors everywhere</span>
                </div>
            </footer>
        </>
    );
}