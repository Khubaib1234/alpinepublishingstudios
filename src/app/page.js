'use client';

import { useState, useEffect, useRef } from 'react';

const BLUE = '#1690CE';
const BLUE_DARK = '#0E7AB8';
const BLUE_LIGHT = 'rgba(22, 144, 206, 0.15)';
const BLUE_GLOW = 'rgba(55, 180, 248, 0.70)';
const DARK = '#133B49';
const TEXT_BODY = '#4C617B';
const BG = '#F8F5F1';
const WHITE = '#ffffff';
const BORDER = '#DCE2EA';

function ContactForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', project: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSuccess) onSuccess();
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

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Full Name</label>
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
          <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Email Address</label>
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
        <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Phone Number</label>
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
        <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Tell us about your project</label>
        <textarea
          required
          placeholder="Share your story — what's your book about, where are you in the process, and what do you need help with?"
          value={form.project}
          onChange={e => setForm({ ...form, project: e.target.value })}
          onFocus={() => setFocused('project')}
          onBlur={() => setFocused(null)}
          rows={4}
          style={{ ...inputStyle('project'), resize: 'none', lineHeight: 1.55 }}
        />
      </div>
      <button type="submit" style={{
        background: BLUE,
        color: WHITE,
        border: 'none',
        padding: '14px 28px',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 700,
        cursor: 'pointer',
        width: '100%',
        transition: 'background .2s, transform .15s',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
        onMouseEnter={e => { e.currentTarget.style.background = BLUE_DARK; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
        Start My Publishing Journey
      </button>
      <p style={{ fontSize: 12, color: TEXT_BODY, textAlign: 'center', marginTop: -4 }}>No credit card required · Free to get started</p>
    </form>
  );
}

export default function AlpinePublishingStudios() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

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

  const bookCovers = [
    'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-12-1-188x300.jpg',
    'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-11-1-194x300.jpg',
    'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-10-1-194x300.jpg',
    'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-09-1-201x300.jpg',
    'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-07-1-194x300.jpg',
    'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-06-1-188x300.jpg',
    'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-04-1-188x300.jpg',
    'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-03-1-188x300.jpg',
  ];

  const tabs = [
    {
      step: '01',
      label: 'Upload Your Manuscript',
      heading: 'Start Publishing in Minutes',
      text: 'Upload your manuscript in any format. Our platform accepts Word documents, PDFs, and more. Our AI instantly analyzes your content and prepares it for the publishing process.',
      img: 'https://cdn.spines.com/wp-content/uploads/2025/04/laptop-1.png',
    },
    {
      step: '02',
      label: 'Professional Editing',
      heading: 'Polish Your Work to Perfection',
      text: 'Our professional editors and AI-powered tools work together to refine your manuscript. From proofreading to structural editing, we ensure your book is publication-ready.',
      img: 'https://cdn.spines.com/wp-content/uploads/2025/04/author-with-book-600x773.jpg',
    },
    {
      step: '03',
      label: 'Beautiful Design',
      heading: 'A Cover That Commands Attention',
      text: 'Our designers craft eye-catching covers and interior layouts that reflect your vision and captivate readers at first glance.',
      img: 'https://cdn.spines.com/wp-content/uploads/2025/04/laptop-1.png',
    },
    {
      step: '04',
      label: 'Global Distribution',
      heading: 'Reach Readers Everywhere',
      text: 'Distribute your book to major retailers worldwide, including Amazon, Barnes & Noble, Apple Books, and thousands more.',
      img: 'https://cdn.spines.com/wp-content/uploads/2025/04/author-with-book-600x773.jpg',
    },
  ];

  const features = [
    {
      title: 'Premium-Quality Publishing',
      desc: 'Publish with the highest standards. Your book will be expertly designed and produced, ready to inspire readers.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 51 59" fill="none">
          <path d="M5.87 53.96L11.82 42.39L22.63 48.17L17.77 58.16L14.52 52.9L5.87 53.96Z" fill={BLUE} />
          <path d="M44.32 53.96L38.37 42.39L27.56 48.17L32.43 58.16L35.67 52.9L44.32 53.96Z" fill={BLUE} />
          <path d="M25.92 50C39.73 50 50.92 38.81 50.92 25C50.92 11.19 39.73 0 25.92 0C12.12 0 0.92 11.19 0.92 25C0.92 38.81 12.12 50 25.92 50Z" fill="#5F7A9B" />
          <circle cx="25.92" cy="25" r="17" fill={BLUE} />
          <path d="M26.63 18.49L28.26 21.8C28.38 22.03 28.6 22.19 28.86 22.23L32.5 22.76C33.15 22.86 33.42 23.66 32.94 24.12L30.31 26.69C30.12 26.87 30.04 27.13 30.08 27.39L30.71 31.01C30.81 31.66 30.13 32.16 29.55 31.85L26.3 30.14C26.06 30.02 25.79 30.02 25.56 30.14L22.31 31.85C21.72 32.16 21.04 31.66 21.15 31.01L21.77 27.39C21.81 27.13 21.73 26.86 21.55 26.69L18.92 24.12C18.44 23.66 18.71 22.86 19.36 22.76L23 22.23C23.25 22.19 23.48 22.03 23.6 21.8L25.22 18.49C25.52 17.9 26.36 17.9 26.65 18.49H26.63Z" fill="white" />
        </svg>
      ),
    },
    {
      title: 'Global Distribution Network',
      desc: 'Reach readers worldwide through all major retailers — Amazon, Barnes & Noble, Apple Books, and thousands of bookstores.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="25" fill="#5F7A9B" />
          <circle cx="25" cy="25" r="17" fill={BLUE} />
          <path d="M15 25 C15 19 25 12 25 12 C25 12 35 19 35 25 C35 31 25 38 25 38 C25 38 15 31 15 25Z" stroke="white" strokeWidth="1.5" fill="none" />
          <line x1="12" y1="25" x2="38" y2="25" stroke="white" strokeWidth="1.5" />
          <line x1="25" y1="12" x2="25" y2="38" stroke="white" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      title: 'Full Creative Control',
      desc: 'Your story, your vision. Customize every aspect of your book with our intuitive design tools and expert guidance.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="25" fill="#5F7A9B" />
          <circle cx="25" cy="25" r="17" fill={BLUE} />
          <rect x="17" y="22" width="16" height="2" rx="1" fill="white" />
          <rect x="17" y="26" width="12" height="2" rx="1" fill="white" />
          <rect x="17" y="18" width="16" height="2" rx="1" fill="white" />
          <circle cx="32" cy="30" r="4" fill="white" />
          <path d="M32 28.5V31.5M30.5 30H33.5" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Transparent Royalties',
      desc: 'Keep the majority of your earnings. No hidden fees, no surprises — just fair, transparent royalty payments.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="25" fill="#5F7A9B" />
          <circle cx="25" cy="25" r="17" fill={BLUE} />
          <text x="25" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">$</text>
        </svg>
      ),
    },
  ];

  const stats = [
    { value: '30K+', label: 'Published Authors' },
    { value: '150+', label: 'Countries Reached' },
    { value: '4.9★', label: 'Author Satisfaction' },
    { value: '72hr', label: 'Avg. Time to Publish' },
  ];

  const testimonials = [
    {
      text: 'Alpine Publishing Studios transformed my manuscript into a beautifully published book within weeks. The process was seamless!',
      name: 'Sarah M.',
      role: 'Author of "The Mountain Path"',
      initials: 'SM',
      color: '#0097A7',
    },
    {
      text: "I had no idea how to publish my memoir. Alpine's team guided me through every step and the result exceeded my expectations.",
      name: 'James R.',
      role: 'Author of "A Life Well Lived"',
      initials: 'JR',
      color: '#EF6C00',
    },
    {
      text: 'The distribution network is incredible. My book is now available globally. I could not have done this without Alpine Publishing Studios.',
      name: 'Priya K.',
      role: 'Author of "Threads of Silk"',
      initials: 'PK',
      color: '#0288D1',
    },
    {
      text: 'Professional, fast, and affordable. Alpine made me feel like a real author from day one.',
      name: 'Carlos B.',
      role: 'Author of "The Open Road"',
      initials: 'CB',
      color: '#EC407A',
    },
  ];

  const faqs = [
    { q: 'How long does the publishing process take?', a: 'Most books are published within 72 hours after final approval of your design and content.' },
    { q: 'What formats can I upload my manuscript in?', a: 'We accept Word (.docx), PDF, Google Docs exports, and plain text files.' },
    { q: 'Do I retain the rights to my book?', a: 'Yes, 100%. You retain full copyright and creative control over your work.' },
    { q: 'Where will my book be distributed?', a: 'Your book will be distributed to Amazon, Barnes & Noble, Apple Books, Kobo, and thousands of bookstores in 150+ countries.' },
    { q: 'What royalties will I earn?', a: 'You keep up to 80% of net royalties, far above traditional publishing industry standards.' },
    { q: 'Is there a free plan available?', a: 'Yes, you can start for free, upload your manuscript, and explore all features before committing to a plan.' },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const handleGetStarted = (e) => {
    e.preventDefault();
    setShowPopup(true);
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

        /* ─── HERO ─── */
        .hero {
          padding-top: 100px; padding-bottom: 0;
          background: var(--bg);
          position: relative; overflow: hidden;
        }
        .hero-blob1 {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: rgba(22,144,206,0.12); filter: blur(120px);
          top: -100px; left: -150px; pointer-events: none;
        }
        .hero-blob2 {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: rgba(68,169,207,0.10); filter: blur(100px);
          top: -60px; right: -100px; pointer-events: none;
        }
        .hero-top {
          max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;
          padding: 40px 24px 0;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 40px; align-items: center;
        }
        .hero-content h1 {
          font-size: clamp(36px, 5vw, 58px); font-weight: 800;
          color: var(--dark); line-height: 1.1; margin-bottom: 20px;
          letter-spacing: -.03em;
        }
        .hero-content p {
          font-size: 17px; color: var(--body); line-height: 1.65; margin-bottom: 28px;
          max-width: 460px;
        }
        .hero-rating-row { display: flex; align-items: center; gap: 12px; margin-top: 20px; }
        .stars { color: #F7B165; font-size: 15px; letter-spacing: 1px; }
        .rating-text { font-size: 14px; color: var(--body); }

        /* hero form card */
        .hero-form-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 36px 32px;
          box-shadow: 0 20px 60px rgba(19,59,73,.10), 0 4px 16px rgba(22,144,206,.07);
          position: relative;
        }
        .hero-form-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, ${BLUE}, #44B8F0);
          border-radius: 20px 20px 0 0;
        }
        .hero-form-title {
          font-size: 22px; font-weight: 700; color: var(--dark); margin-bottom: 6px;
        }
        .hero-form-sub { font-size: 14px; color: var(--body); margin-bottom: 24px; }

        /* books strip below hero */
        .hero-books-strip {
          padding: 40px 0 0;
          overflow: hidden;
        }
        .hero-books-track { display: flex; gap: 12px; padding: 0 24px; overflow-x: auto; scrollbar-width: none; }
        .hero-books-track::-webkit-scrollbar { display: none; }
        .hero-book-thumb { flex-shrink: 0; width: 90px; }
        .hero-book-thumb img {
          width: 100%; border-radius: 4px;
          box-shadow: 4px 6px 20px rgba(0,0,0,.2);
        }

        @media (max-width: 900px) {
          .hero-top { grid-template-columns: 1fr; }
          .hero-form-card { margin-top: 0; }
        }

        /* ─── LOGOS STRIP ─── */
        .logos-strip {
          background: white; padding: 36px 24px;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .logos-label { text-align: center; font-size: 14px; color: var(--body); margin-bottom: 24px; font-weight: 500; }
        .logos-row { display: flex; gap: 40px; align-items: center; justify-content: center; flex-wrap: wrap; }

        /* ─── STATS ─── */
        .stats-section { background: white; padding: 60px 24px; border-bottom: 1px solid var(--border); }
        .stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--border);
          max-width: 900px; margin: 0 auto;
          border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
        }
        .stat-item { background: white; padding: 32px 24px; text-align: left; }
        .stat-value { font-size: 40px; font-weight: 800; color: var(--dark); line-height: 1; }
        .stat-label { font-size: 14px; color: var(--body); margin-top: 6px; font-weight: 500; }
        @media (max-width: 700px) { .stats-grid { grid-template-columns: 1fr 1fr; } }

        /* ─── FEATURES ─── */
        .features-section { background: var(--bg); }
        .features-intro { max-width: 560px; margin-bottom: 56px; }
        .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .feature-card {
          background: white; border: 1px solid var(--border);
          border-radius: 16px; padding: 28px;
          position: relative; overflow: hidden;
          transition: box-shadow .25s, transform .25s;
        }
        .feature-card:hover { box-shadow: 0 12px 48px rgba(22,144,206,.12); transform: translateY(-2px); }
        .feature-icon { margin-bottom: 16px; }
        .feature-title { font-size: 20px; font-weight: 700; color: var(--dark); margin-bottom: 10px; }
        .feature-desc { font-size: 15px; color: var(--body); line-height: 1.6; }
        @media (max-width: 700px) { .features-grid { grid-template-columns: 1fr; } }

        /* ─── AUTHOR SPLIT ─── */
        .author-section { background: white; }
        .author-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .author-img-wrap img { border-radius: 16px; width: 100%; box-shadow: 0 20px 60px rgba(19,59,73,.12); }
        .author-features { margin-top: 32px; display: flex; flex-direction: column; gap: 16px; }
        .author-feature { display: flex; align-items: flex-start; gap: 14px; }
        .author-feature-icon {
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--blue-light); display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: var(--blue);
        }
        .author-feature-title { font-size: 16px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
        .author-feature-desc { font-size: 14px; color: var(--body); line-height: 1.5; }
        @media (max-width: 900px) { .author-layout { grid-template-columns: 1fr; } .author-img-wrap { display: none; } }

        /* ─── HOW IT WORKS ─── */
        .hiw-section { background: var(--bg); }
        .hiw-layout { display: grid; grid-template-columns: 300px 1fr; gap: 48px; align-items: start; }
        .hiw-tabs { display: flex; flex-direction: column; gap: 0; border-top: 1px solid var(--border); }
        .hiw-tab { border-bottom: 1px solid var(--border); padding: 18px 0; cursor: pointer; transition: all .25s; }
        .hiw-tab-step { font-size: 12px; font-weight: 700; color: #BDC8D6; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 4px; }
        .hiw-tab-step.active { color: var(--blue); }
        .hiw-tab-label { font-size: 17px; font-weight: 600; color: var(--dark); }
        .hiw-panel-img img { border-radius: 16px; width: 100%; box-shadow: 0 16px 48px rgba(19,59,73,.1); }
        .hiw-panel-content { margin-top: 32px; }
        .hiw-panel-title { font-size: 30px; font-weight: 700; color: var(--dark); margin-bottom: 14px; }
        .hiw-panel-text { font-size: 16px; color: var(--body); line-height: 1.65; }
        .hiw-panel-btn { margin-top: 24px; }
        @media (max-width: 900px) { .hiw-layout { grid-template-columns: 1fr; } }

        /* ─── BOOK CAROUSEL ─── */
        .books-section { background: white; overflow: hidden; padding: 80px 0; }
        .books-intro { text-align: center; max-width: 560px; margin: 0 auto 48px; padding: 0 24px; }
        .books-track { display: flex; gap: 16px; overflow-x: auto; scrollbar-width: none; padding: 0 40px; }
        .books-track::-webkit-scrollbar { display: none; }
        .book-card { flex-shrink: 0; width: 160px; }
        .book-card img { width: 100%; aspect-ratio: 24/39; object-fit: cover; border-radius: 4px; box-shadow: 6px 8px 30px rgba(0,0,0,.22); }

        /* ─── TESTIMONIALS ─── */
        .testimonials-section { background: var(--bg); }
        .testimonials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 48px; }
        .testimonial-card { background: white; border: 1px solid var(--border); border-radius: 16px; padding: 28px; box-shadow: 0 4px 20px rgba(164,149,193,.06); }
        .testimonial-text {
          font-size: 16px; line-height: 1.65;
          background: linear-gradient(90deg, #3841BC 0%, ${BLUE} 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; margin-bottom: 20px; font-style: italic;
        }
        .testimonial-author { display: flex; align-items: center; gap: 12px; }
        .testimonial-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: white; flex-shrink: 0; }
        .testimonial-name { font-size: 15px; font-weight: 700; color: var(--dark); }
        .testimonial-role { font-size: 13px; color: var(--body); }
        @media (max-width: 700px) { .testimonials-grid { grid-template-columns: 1fr; } }

        /* ─── CONTACT SECTION ─── */
        .contact-section {
          background: white;
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
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
        .contact-left-img {
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 24px 80px rgba(19,59,73,.14);
        }
        .contact-left-img img { width: 100%; display: block; }
        .contact-left-img::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(19,59,73,.5));
        }
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
          background: white;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px 36px;
          box-shadow: 0 8px 40px rgba(19,59,73,.07);
          position: relative;
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
        }

        /* ─── FAQ ─── */
        .faq-section { background: var(--bg); }
        .faq-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-question { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; cursor: pointer; gap: 16px; font-size: 16px; font-weight: 600; color: var(--dark); }
        .faq-chevron { flex-shrink: 0; width: 20px; height: 20px; color: var(--body); transition: transform .3s; }
        .faq-chevron.open { transform: rotate(180deg); }
        .faq-answer { font-size: 15px; color: var(--body); line-height: 1.65; max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .35s ease; }
        .faq-answer.open { max-height: 300px; padding-bottom: 16px; }
        .faq-cta-box { background: linear-gradient(135deg, var(--blue-light), rgba(22,144,206,.06)); border: 1px solid rgba(22,144,206,.2); border-radius: 20px; padding: 40px; text-align: center; }
        .faq-cta-title { font-size: 26px; font-weight: 700; color: var(--dark); margin-bottom: 12px; }
        .faq-cta-text { font-size: 15px; color: var(--body); margin-bottom: 24px; line-height: 1.6; }
        @media (max-width: 900px) { .faq-layout { grid-template-columns: 1fr; } }

        /* ─── CTA BANNER ─── */
        .cta-section { background: linear-gradient(135deg, ${DARK} 0%, #0d2e3a 100%); padding: 80px 24px; text-align: center; }
        .cta-title { font-size: clamp(30px, 4vw, 48px); font-weight: 800; color: white; margin-bottom: 16px; }
        .cta-title .accent { color: var(--blue); }
        .cta-sub { font-size: 18px; color: rgba(255,255,255,.65); margin-bottom: 36px; max-width: 500px; margin-left: auto; margin-right: auto; }

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
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } .section { padding: 64px 20px; } }

        /* ─── POPUP ─── */
        .popup-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(19,59,73,.55);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: fadeIn .2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .popup-card {
          background: white; border-radius: 24px;
          width: 100%; max-width: 540px;
          padding: 40px 36px;
          position: relative;
          box-shadow: 0 32px 80px rgba(19,59,73,.2);
          animation: slideUp .25s ease;
          max-height: 90vh; overflow-y: auto;
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .popup-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, ${BLUE}, #44B8F0);
          border-radius: 24px 24px 0 0;
        }
        .popup-close {
          position: absolute; top: 16px; right: 16px;
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--bg); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background .2s;
        }
        .popup-close:hover { background: var(--border); }
        .popup-title { font-size: 24px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
        .popup-sub { font-size: 14px; color: var(--body); margin-bottom: 24px; }

        /* shared btn */
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
          transition: border-color .2s, color .2s; background: transparent; cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .btn-secondary:hover { border-color: var(--blue); color: var(--blue); }
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

      {/* ── POPUP ── */}
      {showPopup && (
        <div className="popup-overlay" onClick={e => { if (e.target === e.currentTarget) setShowPopup(false); }}>
          <div className="popup-card">
            <button className="popup-close" onClick={() => setShowPopup(false)} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="popup-title">Let's Publish Your Book</div>
            <div className="popup-sub">Tell us about your project and we'll get back to you within 24 hours.</div>
            <ContactForm onSuccess={() => { }} />
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <div className="logo">Alpine <span>Publishing</span> Studios</div>
          <nav className="nav">
            <a href="#services">Services</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About Us</a>
            <a href="#contact-form">Contact</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </div>
        </div>
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
          <a href="#contact-form" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-blob1" />
        <div className="hero-blob2" />
        <div className="hero-top">
          {/* Left: copy */}
          <div className="hero-content">
            <span className="section-label">The Author's Publishing Platform</span>
            <h1>Your Words. Your Book. Your Way.</h1>
            <p>Everything you need to publish professionally — proofreading, design, printing, and global distribution in one intuitive platform.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={handleGetStarted}>
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M6 0L12 7L6 14L4.6 12.4L8.4 8H0V6H8.4L4.6 1.6L6 0Z" fill="white" /></svg>
                Get Started for Free
              </button>
              <a href="#how-it-works" className="btn-secondary">See How It Works</a>
            </div>
            <div className="hero-rating-row">
              <img src="https://cdn.spines.com/wp-content/uploads/2025/04/reviews-avatars-2.jpg" alt="Reviews" style={{ height: 48, width: 'auto', borderRadius: 4 }} />
              <div>
                <div className="stars">★★★★★</div>
                <div className="rating-text">Loved by <strong>30,000+</strong> authors worldwide</div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="hero-form-card">
            <div className="hero-form-title">Start Your Publishing Journey</div>
            <div className="hero-form-sub">Fill in your details and we'll reach out within 24 hours.</div>
            <ContactForm />
          </div>
        </div>

        {/* Books strip */}
        <div className="hero-books-strip">
          <div className="hero-books-track">
            {[...bookCovers, ...bookCovers].map((src, i) => (
              <div className="hero-book-thumb" key={i}>
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGOS STRIP ── */}
      <section className="logos-strip">
        <div className="logos-label">Distributed to major platforms worldwide</div>
        <div className="logos-row">
          {['Amazon', 'Barnes & Noble', 'Apple Books', 'Kobo', 'IngramSpark', 'Google Play Books'].map(name => (
            <div key={name} style={{ fontSize: 13, fontWeight: 700, color: '#aaa', letterSpacing: '.04em', textTransform: 'uppercase' }}>{name}</div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section features-section" id="services">
        <div className="container">
          <div className="features-intro">
            <span className="section-label">Why Alpine Publishing Studios</span>
            <h2 className="section-title">Everything an Author <span className="accent">Needs to Succeed</span></h2>
            <p className="section-sub">From manuscript to marketplace — we handle it all so you can focus on writing.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTHOR SECTION ── */}
      <section className="section author-section" id="about">
        <div className="container">
          <div className="author-layout">
            <div className="author-img-wrap">
              <img src="https://cdn.spines.com/wp-content/uploads/2025/04/author-with-book-600x773.jpg" alt="Author with book" />
            </div>
            <div>
              <span className="section-label">Built for Authors</span>
              <h2 className="section-title">Publish Like a <span className="accent">Professional</span></h2>
              <p className="section-sub" style={{ marginBottom: 0 }}>Alpine Publishing Studios gives independent authors the same tools and reach as traditional publishers — without giving up your rights or royalties.</p>
              <div className="author-features">
                {[
                  { title: 'AI-Powered Editing', desc: 'Smart proofreading and structural suggestions that elevate your manuscript instantly.' },
                  { title: 'Cover Design Studio', desc: 'Work with professional designers or use our AI tools to create a stunning cover.' },
                  { title: 'Print on Demand', desc: 'High-quality printing with no minimum orders, delivered worldwide.' },
                ].map((f, i) => (
                  <div className="author-feature" key={i}>
                    <div className="author-feature-icon">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.59l7.3-7.3a1 1 0 011.4 0z" fill={BLUE} /></svg>
                    </div>
                    <div>
                      <div className="author-feature-title">{f.title}</div>
                      <div className="author-feature-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32 }}>
                <button className="btn-primary" onClick={handleGetStarted}>Start Publishing Free</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section hiw-section" id="how-it-works">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="section-label">The Process</span>
            <h2 className="section-title">Go from Manuscript to <span className="accent">Published</span> in 4 Steps</h2>
          </div>
          <div className="hiw-layout">
            <div className="hiw-tabs">
              {tabs.map((tab, i) => (
                <div className="hiw-tab" key={i} onClick={() => setActiveTab(i)}>
                  <div className={`hiw-tab-step${activeTab === i ? ' active' : ''}`}>{tab.step}</div>
                  <div className="hiw-tab-label">{tab.label}</div>
                </div>
              ))}
            </div>
            <div className="hiw-panel">
              <div className="hiw-panel-img">
                <img src={tabs[activeTab].img} alt={tabs[activeTab].label} />
              </div>
              <div className="hiw-panel-content">
                <div className="hiw-panel-title">{tabs[activeTab].heading}</div>
                <div className="hiw-panel-text">{tabs[activeTab].text}</div>
                <div className="hiw-panel-btn">
                  <button className="btn-primary" onClick={handleGetStarted}>Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKS CAROUSEL ── */}
      <section className="books-section">
        <div className="books-intro">
          <span className="section-label">Published Books</span>
          <h2 className="section-title">Discover Books <span className="accent">Published with Alpine</span></h2>
        </div>
        <div className="books-track">
          {[...bookCovers, ...bookCovers].map((src, i) => (
            <div className="book-card" key={i}>
              <img src={src} alt={`Book ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 0 }}>
            <span className="section-label">Author Stories</span>
            <h2 className="section-title">What Our <span className="accent">Authors Say</span></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-text">&ldquo;{t.text}&rdquo;</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: t.color }}>{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM SECTION ── */}
      <section className="contact-section" id="contact-form">
        <div className="contact-layout">
          {/* Left: image with overlay badge */}
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

          {/* Right: form */}
          <div className="contact-form-wrap">
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title" style={{ fontSize: 32, marginBottom: 8 }}>Ready to Publish <span className="accent">Your Book?</span></h2>
            <p style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.6, marginBottom: 28 }}>Share your details and project below. Our publishing team will reach out within 24 hours to guide you through the next steps.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="faq-layout">
            <div>
              <span className="section-label">FAQ</span>
              <h2 className="section-title" style={{ marginBottom: 32 }}>Frequently Asked <span className="accent">Questions</span></h2>
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
            <div>
              <div className="faq-cta-box">
                <div style={{ fontSize: 48, marginBottom: 12 }}>📚</div>
                <div className="faq-cta-title">Ready to Publish Your Book?</div>
                <div className="faq-cta-text">Join over 30,000 authors who have trusted Alpine Publishing Studios to bring their stories to the world.</div>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleGetStarted}>Start for Free</button>
                <p style={{ fontSize: 13, color: '#aaa', marginTop: 12 }}>No credit card required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section">
        <div className="cta-title">Your Story Deserves to <span className="accent">Be Told</span></div>
        <div className="cta-sub">Start publishing today with Alpine Publishing Studios — the platform built by authors, for authors.</div>
        <button className="btn-primary-lg" onClick={handleGetStarted}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          Get Started for Free
        </button>
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
              <a href="#services">Services</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#contact-form">Contact Us</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <div className="footer-links">
              <a href="#about">About Us</a>
              <a href="#blog">Blog</a>
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