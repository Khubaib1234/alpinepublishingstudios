'use client';

import { useState, useEffect, useRef } from 'react';
import SiteHeader from '@/components/SiteHeader';

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
  const [form, setForm] = useState({ name: '', email: '', phone: '', title: '', genre: '', project: '' });
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
        body: JSON.stringify({ formType: 'project', sourcePage: 'home', ...form }),
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
    fontSize: 16,
    color: DARK,
    background: WHITE,
    outline: 'none',
    transition: 'border-color .2s, box-shadow .2s',
    boxShadow: focused === field ? `0 0 0 3px rgba(22,144,206,0.12)` : 'none',
    fontFamily: 'inherit',
  });

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="form-row-2">
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Full Name</label>
          <input
            type="text"
            required
            placeholder="Jane Smith"
            value={form.name}
            autoComplete="name"
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
            autoComplete="email"
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
          autoComplete="tel"
          onChange={e => setForm({ ...form, phone: e.target.value })}
          onFocus={() => setFocused('phone')}
          onBlur={() => setFocused(null)}
          style={inputStyle('phone')}
        />
      </div>
      <div className="form-row-2">
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Book Title / Working Title</label>
          <input
            type="text"
            required
            placeholder="The Silent Stars"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            onFocus={() => setFocused('title')}
            onBlur={() => setFocused(null)}
            style={inputStyle('title')}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: DARK, display: 'block', marginBottom: 6 }}>Genre / Category</label>
          <input
            type="text"
            required
            placeholder="Science Fiction"
            value={form.genre}
            onChange={e => setForm({ ...form, genre: e.target.value })}
            onFocus={() => setFocused('genre')}
            onBlur={() => setFocused(null)}
            style={inputStyle('genre')}
          />
        </div>
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
      {error && <p style={{ fontSize: 13, color: '#e53e3e', textAlign: 'center' }}>{error}</p>}
      <button type="submit" disabled={submitting} style={{
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
        {submitting ? 'Sending...' : 'Start My Publishing Journey'}
      </button>
      <p style={{ fontSize: 12, color: TEXT_BODY, textAlign: 'center', marginTop: -4 }}>Your details are reviewed by our publishing team. We will reach out with guidance based on your project.</p>
    </form>
  );
}

export default function AlpinePublishingStudios() {
  const [activeTab, setActiveTab] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (showPopup) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [showPopup]);

  // Popup auto-trigger: immediate on fresh load/reload, 5s on navigation
  useEffect(() => {
    const isFirstLoad = !sessionStorage.getItem('alpine_visited');
    sessionStorage.setItem('alpine_visited', '1');
    const delay = isFirstLoad ? 0 : 5000;
    const timer = setTimeout(() => setShowPopup(true), delay);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const els = document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('anim-visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const bookCovers = [
    { src: 'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-12-1-188x300.jpg', alt: 'Self-published memoir book cover designed by Alpine Publishing Studios' },
    { src: 'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-11-1-194x300.jpg', alt: 'Self-published fiction book cover design example' },
    { src: 'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-10-1-194x300.jpg', alt: 'Self-published self-help book cover designed by Alpine Publishing Studios' },
    { src: 'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-09-1-201x300.jpg', alt: 'Self-published business book cover design example' },
    { src: 'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-07-1-194x300.jpg', alt: "Self-published children's book cover designed by Alpine Publishing Studios" },
    { src: 'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-06-1-188x300.jpg', alt: 'Self-published poetry book cover design example' },
    { src: 'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-04-1-188x300.jpg', alt: 'Self-published faith-based book cover designed by Alpine Publishing Studios' },
    { src: 'https://cdn.spines.com/wp-content/uploads/2025/04/book-cover-03-1-188x300.jpg', alt: 'Self-published leadership book cover design example' },
  ];

  const tabs = [
    {
      step: '01',
      label: 'Share Your Book Details',
      heading: 'Start Publishing in Minutes',
      text: 'Send us your manuscript status, book goals, genre, and the support you are looking for.',
      img: 'landing_image.jpeg',
    },
    {
      step: '02',
      label: 'Get a Clear Publishing Direction',
      heading: 'Polish Your Work to Perfection',
      text: 'Our team reviews the best route for editing, design, formatting, publishing, and visibility.',
      img: 'lady_image.jpeg',
    },
    {
      step: '03',
      label: 'Build the Book Professionally',
      heading: 'A Cover That Commands Attention',
      text: 'Your project moves through the right creative and production stages with specialists assigned where needed.',
      img: 'landing_image.jpeg',
    },
    {
      step: '04',
      label: 'Prepare for Publishing',
      heading: 'Reach Readers Everywhere',
      text: 'We help prepare the book files, description, metadata, and publishing platform details.',
      img: 'lady_image.jpeg',
    },
    {
      step: '05',
      label: 'Launch With Presence',
      heading: 'Reach Readers Everywhere',
      text: 'When the book is ready, we help you think beyond upload day with content, positioning, and visibility support.',
      img: 'lady_image.jpeg',
    },
  ];

  const features = [
    {
      title: 'A Real Team Around Your Book',
      desc: 'Your manuscript is supported by a publishing team of editors, designers, formatters, publishing specialists, and marketing professionals who understand what a finished book should feel like.',
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
      title: 'A Book That Looks Reader-Ready',
      desc: 'From the cover to the interior layout, we focus on presentation that helps your book feel credible, polished, and ready for the market.',
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
      title: 'Publishing Without Platform Confusion',
      desc: 'We help prepare your files, book details, categories, descriptions, and setup across self-publishing platforms so the publishing process feels organized instead of stressful.',
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
      title: 'Visibility Beyond the Upload',
      desc: 'A book should not go live and disappear. We help authors think about launch messaging, book marketing, social media presence, reader engagement, and post-publication visibility.',
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
      text: 'The process finally felt clear. I knew what stage my book was in, what the team was working on, and what needed to happen next.”',
      name: 'Sarah M.',
      role: 'Author of "The Mountain Path"',
      initials: 'SM',
      color: '#0097A7',
    },
    {
      text: "The editing and design support helped my book feel professional without taking away my voice.",
      name: 'James R.',
      role: 'Author of "A Life Well Lived"',
      initials: 'JR',
      color: '#EF6C00',
    },
    {
      text: 'I came in unsure about publishing and left with a book that felt ready for readers.',
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
    { q: 'What\'s the difference between a self-publishing company and a traditional publisher?', a: 'A traditional publisher buys the rights to your book, controls the process, and pays you a royalty. A self-publishing company like Alpine works for you: you keep your rights and royalties, and we provide the editing, design, formatting, and distribution support needed to publish professionally.' },
    { q: 'How much does it cost to publish a book with Alpine Publishing Studios?', a: 'Pricing depends on which services your book needs — from a single service like cover design to full end-to-end support. You can start for free to explore options, and a publishing specialist will provide a clear quote based on your project before any commitment.' },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const handleGetStarted = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <>
      <style>{`
        /* ─── ANIMATIONS ─── */
        .anim-fade-up { opacity: 0; transform: translateY(40px); transition: opacity 0.75s cubic-bezier(.22,1,.36,1), transform 0.75s cubic-bezier(.22,1,.36,1); }
        .anim-fade-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.75s cubic-bezier(.22,1,.36,1), transform 0.75s cubic-bezier(.22,1,.36,1); }
        .anim-fade-right { opacity: 0; transform: translateX(40px); transition: opacity 0.75s cubic-bezier(.22,1,.36,1), transform 0.75s cubic-bezier(.22,1,.36,1); }
        .anim-scale-in { opacity: 0; transform: scale(0.92); transition: opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1); }
        .anim-visible { opacity: 1 !important; transform: none !important; }
        .anim-delay-1 { transition-delay: 0.1s; }
        .anim-delay-2 { transition-delay: 0.2s; }
        .anim-delay-3 { transition-delay: 0.3s; }
        .anim-delay-4 { transition-delay: 0.4s; }
        @media (prefers-reduced-motion: reduce) {
          .anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale-in {
            opacity: 1 !important; transform: none !important; transition: none !important;
          }
          .hero-blob1, .hero-blob2 { display: none !important; }
          .books-row-ltr, .books-row-rtl { animation: none !important; }
        }
        .anim-delay-5 { transition-delay: 0.5s; }
        .anim-delay-6 { transition-delay: 0.6s; }

        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroFadeRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes blobPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        .hero-blob1 { animation: blobPulse 8s ease-in-out infinite; }
        .hero-blob2 { animation: blobPulse 10s ease-in-out infinite 2s; }
        .hero-content { animation: heroFadeUp 0.9s cubic-bezier(.22,1,.36,1) both; }
        .hero-form-card { animation: heroFadeRight 0.9s cubic-bezier(.22,1,.36,1) 0.2s both; }

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
        .logo { font-size: 20px; font-weight: 700; color: var(--dark); letter-spacing: -.4px; display: flex; align-items: center; gap: 8px; }
        .logo span { color: var(--blue); }
        .logo-img { height: 36px; width: auto; flex-shrink: 0; border-radius: 3px; object-fit: contain; }
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
          padding-top: 100px; padding-bottom: 56px;
          background: var(--bg);
          position: relative; overflow: hidden;
        }
        .hero-blob1 {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: rgba(22,144,206,0.12); filter: blur(120px);
          top: -100px; left: -150px; pointer-events: none;
          will-change: auto;
        }
        .hero-blob2 {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: rgba(68,169,207,0.10); filter: blur(100px);
          top: -60px; right: -100px; pointer-events: none;
        }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .hero-top {
          max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;
          padding: 40px 24px 24px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 48px; align-items: center;
        }
        .hero-content { text-align: left; }
        .hero-content h1 {
          font-size: clamp(36px, 5vw, 58px); font-weight: 800;
          color: var(--dark); line-height: 1.1; margin-bottom: 20px;
          letter-spacing: -.03em;
        }
        .hero-content > p.hero-lead {
          font-size: 17px; color: var(--body); line-height: 1.65; margin-bottom: 28px;
          max-width: 480px;
        }
        .hero-actions {
          display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
          margin-bottom: 22px;
        }
        .hero-trust {
          font-size: 14px; color: var(--body); line-height: 1.55;
          margin: 0 0 10px; max-width: 460px;
        }
        .hero-microcopy {
          font-size: 15px; color: var(--body); line-height: 1.6;
          margin: 0 0 24px; max-width: 460px;
        }
        .hero-rating-row { display: flex; align-items: center; gap: 12px; margin-top: 4px; }
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

        /* books strip CSS removed — now at bottom only */

        @media (max-width: 900px) {
          .hero { padding-bottom: 40px; }
          .hero-top { grid-template-columns: 1fr; padding: 28px 20px 8px; gap: 28px; }
          .hero-form-card { margin-top: 0; padding: 28px 20px; }
          .hero-blob1, .hero-blob2 { display: none; }
        }
        @media (max-width: 700px) {
          .form-row-2 { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; align-items: stretch; }
          .hero-actions .btn-primary,
          .hero-actions .btn-secondary { width: 100%; justify-content: center; min-height: 48px; }
          .hero-content h1 { font-size: clamp(28px, 8vw, 40px); }
          .section { padding: 64px 20px; }
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

        /* ─── BOOK CAROUSEL (auto-sliding) ─── */
        .books-section { background: white; overflow: hidden; padding: 80px 0; }
        .books-intro { text-align: center; max-width: 560px; margin: 0 auto 48px; padding: 0 24px; }
        .books-slider-wrap { overflow: hidden; width: 100%; }
        .books-row { display: flex; gap: 16px; width: max-content; }
        .books-row-ltr { animation: slideLeft 30s linear infinite; }
        .books-row-rtl { animation: slideRight 30s linear infinite; margin-top: 16px; }
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slideRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .books-slider-wrap:hover .books-row { animation-play-state: paused; }
        .book-card { flex-shrink: 0; width: 150px; }
        .book-card img { width: 100%; aspect-ratio: 24/39; object-fit: cover; border-radius: 6px; box-shadow: 6px 8px 30px rgba(0,0,0,.22); transition: transform .3s, box-shadow .3s; }
        .book-card img:hover { transform: translateY(-4px) scale(1.03); box-shadow: 8px 14px 40px rgba(0,0,0,.3); }

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
        .faq-cta-book {
          width: 72px; height: 72px; margin: 0 auto 18px; display: flex;
          align-items: center; justify-content: center;
          border-radius: 18px;
          background: linear-gradient(145deg, #1690CE 0%, #0E7AB8 100%);
          box-shadow: 0 10px 28px rgba(22,144,206,.28);
        }
        .faq-cta-book svg { display: block; }
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
        .footer-cta-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--blue); color: white; padding: 11px 20px; border-radius: 8px; font-size: 14px; font-weight: 700; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background .2s; text-decoration: none; }
        .footer-cta-btn:hover { background: var(--blue-dark); }
        .footer-contact-block { margin-top: 32px; }
        .footer-contact-item { font-size: 13px; color: rgba(255,255,255,.55); margin-bottom: 6px; }

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
        .btn-primary-lg-white {
          background: white; color: var(--blue);
          padding: 16px 36px; border-radius: 12px;
          font-size: 17px; font-weight: 700;
          display: inline-flex; align-items: center; gap: 10px;
          transition: background .2s, transform .15s;
          border: 1.5px solid var(--blue); cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .btn-primary-lg-white:hover { background: var(--white-dark); transform: translateY(-1px); }

        /* ─── EXPERIENCE SECTION ─── */
        .experience-section { background: white; }
        .experience-intro { text-align: center; max-width: 700px; margin: 0 auto 64px; }
        .experience-body { font-size: 17px; color: var(--body); line-height: 1.7; margin-top: 20px; }
        .experience-body p { margin-top: 12px; }
        .experience-cards { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .experience-card {
          background: var(--bg); border: 1px solid var(--border);
          border-radius: 18px; padding: 28px 20px; text-align: center;
          transition: box-shadow .3s, transform .3s, border-color .3s;
          position: relative; overflow: hidden;
        }
        .experience-card:hover { box-shadow: 0 16px 48px rgba(22,144,206,.14); transform: translateY(-4px); border-color: rgba(22,144,206,.3); }
        .experience-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--blue), #44B8F0);
          opacity: 0; transition: opacity .3s;
        }
        .experience-card:hover::after { opacity: 1; }
        .experience-card-num {
          width: 52px; height: 52px; border-radius: 50%;
          background: var(--blue-light); color: var(--blue);
          font-size: 20px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 18px;
        }
        .experience-card-title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 10px; }
        .experience-card-desc { font-size: 13px; color: var(--body); line-height: 1.6; }
        @media (max-width: 1000px) { .experience-cards { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 640px) { .experience-cards { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 420px) { .experience-cards { grid-template-columns: 1fr; } }

        /* ─── SERVICES PREVIEW SECTION ─── */
        .services-preview-section { background: var(--bg); }
        .services-preview-header { max-width: 620px; margin-bottom: 56px; }
        .services-eyebrow {
          font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          color: var(--blue); margin-bottom: 10px; display: block;
        }
        .services-intro-text { font-size: 17px; color: var(--body); line-height: 1.65; margin-top: 14px; }
        .services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .service-prev-card {
          background: white; border: 1px solid var(--border);
          border-radius: 16px; padding: 28px 24px;
          transition: box-shadow .3s, transform .3s, border-color .3s;
          position: relative; overflow: hidden;
          display: block;
        }
        .service-prev-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--blue), #44B8F0);
          opacity: 0; transition: opacity .3s;
        }
        .service-prev-card:hover { box-shadow: 0 12px 40px rgba(22,144,206,.13); transform: translateY(-3px); border-color: rgba(22,144,206,.22); }
        .service-prev-card:hover::before { opacity: 1; }
        .service-prev-icon {
          width: 46px; height: 46px; border-radius: 12px;
          background: var(--blue-light); display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px; flex-shrink: 0;
        }
        .service-prev-title { font-size: 16px; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
        .service-prev-desc { font-size: 13px; color: var(--body); line-height: 1.6; }
        .services-cta { margin-top: 48px; display: flex; align-items: center; gap: 16px; }
        @media (max-width: 1000px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .services-grid { grid-template-columns: 1fr; } .services-cta { flex-direction: column; align-items: flex-start; } }
      `}</style>

      {/* ── SCHEMA: Organization + AggregateRating ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Alpine Publishing Studios',
            url: 'https://www.alpinepublishingstudios.com/',
            description: 'Alpine Publishing Studios is a full-service self-publishing company offering editing, cover design, formatting, publishing, and marketing for independent authors.',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '30000',
            },
          }),
        }}
      />

      {/* ── SCHEMA: FAQPage ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

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

      <SiteHeader />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-blob1" />
        <div className="hero-blob2" />
        <div className="hero-top">
          {/* Left: copy */}
          <div className="hero-content">
            <span className="section-label">A Self-Publishing Studio for Serious Authors</span>
            <h1>Alpine Publishing Studios — A Full-Service Self-Publishing Company for Serious Authors</h1>
            <p className="hero-lead">Alpine Publishing Studios helps authors move from manuscript to marketplace with professional editing, cover design, formatting, publishing, distribution, and book marketing support.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={handleGetStarted}>
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M6 0L12 7L6 14L4.6 12.4L8.4 8H0V6H8.4L4.6 1.6L6 0Z" fill="white" /></svg>
                Get a Publishing Quote
              </button>
              <a href="/services" className="btn-secondary">Explore Services</a>
            </div>
            <p className="hero-trust">Trusted by independent authors who want the reach of traditional publishing without giving up their rights.</p>
            <p className="hero-microcopy">Start with a quick project form. No pressure. No confusing publishing jargon. Just a clear next step for your book.</p>
            <div className="hero-rating-row">
              <img src="https://cdn.spines.com/wp-content/uploads/2025/04/reviews-avatars-2.jpg" alt="Author reviews for Alpine Publishing Studios self-publishing services" width={120} height={48} loading="lazy" decoding="async" style={{ height: 48, width: 'auto', borderRadius: 4 }} />
              <div>
                <div className="stars">★★★★★</div>
                <div className="rating-text">Loved by <strong>30,000+</strong> authors worldwide</div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="hero-form-card">
            <div className="hero-form-title">Start With Your Book</div>
            <div className="hero-form-sub">Whether you need a self-publishing company for a finished manuscript or just a starting point for a book you haven't written yet, tell us where things stand. A publishing specialist will review your details and guide you toward the right next step.</div>
            <ContactForm />
          </div>
        </div>

      </section>

      {/* ── LOGOS STRIP ── */}
      <section className="logos-strip">
        <div className="logos-label anim-fade-up">Prepared for the Platforms Readers Already Use</div>
        <p style={{ textAlign: 'center', fontSize: 14, color: TEXT_BODY, maxWidth: 640, margin: '0 auto 24px' }}>Alpine publishes and distributes books across every major platform readers already use — no separate publishing company needed for each one.</p>
        <div className="logos-row">
          {['Amazon', 'Barnes & Noble', 'Apple Books', 'Google Play Books', 'Kobo', 'Lulu', 'IngramSpark', 'Draft2Digital'].map((name, i) => (
            <div key={name} className={`anim-fade-up anim-delay-${i + 1}`} style={{ fontSize: 13, fontWeight: 700, color: '#aaa', letterSpacing: '.04em', textTransform: 'uppercase' }}>{name}</div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className={`stat-item anim-fade-up anim-delay-${i + 1}`} key={i}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section features-section" id="services">
        <div className="container">
          <div className="features-intro anim-fade-up">
            <span className="section-label">Why Alpine Publishing Studios</span>
            <h2 className="section-title">Publishing Should Feel Exciting, <br></br><span className="accent"> Not Overwhelming</span></h2>
            <p className="section-sub">Most authors do not stop because their book is not worth publishing. They stop because the process becomes unclear: editing, formatting, covers, uploads, files, platforms, and marketing all start pulling in different directions.</p>
            <p className="section-sub">Alpine brings those moving parts into one guided experience, so your book can move forward with confidence.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className={`feature-card anim-fade-up anim-delay-${i + 1}`} key={i}>
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
            <div className="author-img-wrap anim-fade-left">
              <img src="lady_image.jpeg" alt="Author with book" loading="lazy" decoding="async" width={560} height={700} />
            </div>
            <div className="anim-fade-right">
              <span className="section-label">Built for Authors</span>
              <h2 className="section-title">Publish Like a <span className="accent">Professional</span></h2>
              <p className="section-sub" style={{ marginBottom: 0 }}>Alpine Publishing Studios gives independent authors the same editorial, design, and distribution support as a traditional publishing company — without giving up your rights or royalties.</p>
              <div className="author-features">
                {[
                  { title: 'Professional Editing', desc: 'Developmental and line editing from real editors, not automated suggestions.' },
                  { title: 'Cover Design Studio', desc: 'Custom covers designed by our in-house design team, built around your genre and audience.' },
                  { title: 'Print-on-Demand & Distribution', desc: 'High-quality printing with no minimum orders, distributed to major platforms worldwide.' },
                ].map((f, i) => (
                  <div className={`author-feature anim-fade-up anim-delay-${i + 1}`} key={i}>
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
                <button className="btn-primary" onClick={handleGetStarted}>Get a Publishing Quote</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE SECTION ── */}
      <section className="section experience-section">
        <div className="container">
          <div className="experience-intro anim-fade-up">
            <span className="section-label">The Alpine Difference</span>
            <h2 className="section-title">Your Book Gets More Than a Service.<br /><span className="accent">It Gets a Publishing Experience.</span></h2>
            <div className="experience-body">
              <p>A professional self-published book is not created in one step. It is shaped through a series of decisions: how the manuscript reads, how the cover feels, how the pages flow, how the book appears online, and how readers discover it.</p>
              <p>At Alpine, each stage is connected so the final result feels complete.</p>
            </div>
          </div>
          <div className="experience-cards">
            {[
              { num: '01', title: 'Editorial Care', desc: 'We refine the writing so the message reads clearly and confidently.' },
              { num: '02', title: 'Design Direction', desc: 'We create a cover that fits the book, the genre, and the reader expectation.' },
              { num: '03', title: 'Production Quality', desc: 'We format the interior for print and digital reading experiences.' },
              { num: '04', title: 'Publishing Setup', desc: 'We prepare the book details, files, and platform requirements.' },
              { num: '05', title: 'Launch Presence', desc: 'We help shape the content and message that introduce your book to the world.' },
            ].map((card, i) => (
              <div className={`experience-card anim-fade-up anim-delay-${i + 1}`} key={i}>
                <div className="experience-card-num">{card.num}</div>
                <div className="experience-card-title">{card.title}</div>
                <div className="experience-card-desc">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="section services-preview-section">
        <div className="container">
          <div className="services-preview-header anim-fade-up">
            <span className="section-label">What We Help With</span>
            <h2 className="section-title">Everything Your Book Needs<br /><span className="accent">to Move Forward</span></h2>
            <p className="services-intro-text">Start with one service or let our team support the full publishing journey. Alpine can meet your book wherever it is and help take it to the next stage.</p>
          </div>
          <div className="services-grid">
            {[
              {
                title: 'Ghostwriting Services',
                desc: 'For authors with a story, message, outline, or idea that needs to become a complete manuscript.',
                href: '/services/ghostwriting-services',
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>),
              },
              {
                title: 'Book Editing Services',
                desc: 'For manuscripts that need stronger structure, smoother flow, clearer sentences, and a better reading experience.',
                href: '/services/book-editing-services',
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h10M4 18h7" /></svg>),
              },
              {
                title: 'Proofreading Services',
                desc: 'For final-stage books that need spelling, punctuation, grammar, and consistency checks before publishing.',
                href: '/services/proofreading-services',
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>),
              },
              {
                title: 'Book Cover Design',
                desc: 'For authors who want a professional cover that gives the right first impression online and in print.',
                href: '/services/book-cover-design',
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>),
              },
              {
                title: 'Book Formatting Services',
                desc: 'For print and eBook interiors that need clean layout, proper spacing, page setup, and platform-ready files.',
                href: '/services/book-formatting-services',
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h6M3 15h6" /></svg>),
              },
              {
                title: 'Self-Publishing Services',
                desc: 'For authors who want support preparing and publishing their book across major platforms.',
                href: '/services/self-publishing-services',
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>),
              },
              {
                title: 'Book Marketing Services',
                desc: 'For authors who want launch content, social media presence, reader engagement, and promotional direction.',
                href: '/services/book-marketing-services',
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>),
              },
              {
                title: 'Author Branding Services',
                desc: 'For authors who want a stronger bio, book description, positioning, and professional online presence.',
                href: '/services/author-branding-services',
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
              },
              {
                title: 'Book Printing Services',
                desc: 'For authors who need high-quality print copies with no minimum orders, ready for readers and events.',
                href: '/services/book-printing-services',
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>),
              },
              {
                title: 'Audiobook Creation',
                desc: 'For authors who want their book produced and distributed as a professional audiobook.',
                href: '/services/audiobook-creation-services',
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>),
              },
            ].map((svc, i) => (
              <a href={svc.href} className={`service-prev-card anim-fade-up anim-delay-${(i % 4) + 1}`} key={i}>
                <div className="service-prev-icon">{svc.icon}</div>
                <div className="service-prev-title">{svc.title}</div>
                <div className="service-prev-desc">{svc.desc}</div>
              </a>
            ))}
          </div>
          <div className="services-cta anim-fade-up">
            <a href="/services" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
              Explore All Services
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section hiw-section" id="how-it-works">
        <div className="container">
          <div className="anim-fade-up" style={{ marginBottom: 48 }}>
            <span className="section-label">The Publishing Path</span>
            <h2 className="section-title">From Manuscript to <span className="accent">Published</span> in Clear Steps</h2>
          </div>
          <div className="hiw-layout">
            <div className="hiw-tabs anim-fade-left">
              {tabs.map((tab, i) => (
                <div className="hiw-tab" key={i} onClick={() => setActiveTab(i)}>
                  <div className={`hiw-tab-step${activeTab === i ? ' active' : ''}`}>{tab.step}</div>
                  <div className="hiw-tab-label">{tab.label}</div>
                </div>
              ))}
            </div>
            <div className="hiw-panel anim-fade-right">
              <div className="hiw-panel-img">
                <img src={tabs[activeTab].img} alt={`Step ${tabs[activeTab].step}: ${tabs[activeTab].label} — sharing a book with an Alpine Publishing Studios specialist to start the self-publishing process`} loading="lazy" decoding="async" />
              </div>
              <div className="hiw-panel-content">
                <div className="hiw-panel-title">{tabs[activeTab].heading}</div>
                <div className="hiw-panel-text">{tabs[activeTab].text}</div>
                <div className="hiw-panel-btn">
                  <button className="btn-primary" onClick={handleGetStarted}>Start My Publishing Journey</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKS CAROUSEL (auto-sliding) ── */}
      <section className="books-section">
        <div className="books-intro">
          <span className="section-label">Published Books</span>
          <h2 className="section-title">Books Take Many Shapes. <span className="accent">We Help Prepare Them All.</span></h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>Alpine supports authors across genres and formats, including memoirs, fiction, self-help books, business books, children’s books, poetry, faith-based books, leadership books, and thought-leadership titles.</p>
        </div>
        <div className="books-slider-wrap">
          {/* Row 1: slides left */}
          <div className="books-row books-row-ltr">
            {[...bookCovers, ...bookCovers, ...bookCovers].map((book, i) => (
              <div className="book-card" key={`ltr-${i}`}>
                <img src={book.src} alt={book.alt} loading="lazy" decoding="async" width={160} height={240} />
              </div>
            ))}
          </div>
          {/* Row 2: slides right */}
          <div className="books-row books-row-rtl">
            {[...[...bookCovers].reverse(), ...[...bookCovers].reverse(), ...[...bookCovers].reverse()].map((book, i) => (
              <div className="book-card" key={`rtl-${i}`}>
                <img src={book.src} alt={book.alt} loading="lazy" decoding="async" width={160} height={240} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="anim-fade-up" style={{ textAlign: 'center', marginBottom: 0 }}>
            <span className="section-label">Author Stories</span>
            <h2 className="section-title">What Authors Appreciate <span className="accent">About the Alpine Experience</span></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className={`testimonial-card anim-fade-up anim-delay-${i + 1}`} key={i} itemScope itemType="https://schema.org/Review">
                <div className="testimonial-text" itemProp="reviewBody">&ldquo;{t.text}&rdquo;</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: t.color }}>{t.initials}</div>
                  <div>
                    <div className="testimonial-name" itemProp="author">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
                <meta itemProp="reviewRating" content="5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM SECTION ── */}
      <section className="contact-section" id="contact-form">
        <div className="contact-layout">
          {/* Left: image with overlay badge */}
          <div className="anim-fade-left" style={{ position: 'relative' }}>
            <div className="contact-left-img">
              <img src="lady_image.jpeg" alt="Author" loading="lazy" decoding="async" width={560} height={700} />
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
          <div className="contact-form-wrap anim-fade-right">
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
                <div className="faq-cta-book" aria-hidden="true">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v16.5a.5.5 0 0 1-.5.5H6.5A2.5 2.5 0 0 0 4 22.5V4.5Z" fill="rgba(255,255,255,.22)" />
                    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H18a1 1 0 0 1 1 1v15.2a.8.8 0 0 1-.8.8H6.5A2.5 2.5 0 0 0 4 21.5V4.5Z" fill="white" />
                    <path d="M7.5 6.5h8M7.5 9.5h8M7.5 12.5h5" stroke="#1690CE" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M6.5 2v17.5" stroke="rgba(22,144,206,.35)" strokeWidth="1.2" />
                  </svg>
                </div>
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
        <div className="cta-title">Your Story Deserves More Than a <span className="accent">Saved Document</span></div>
        <div className="cta-sub">You wrote the book. Now give it the professional support it needs to reach readers with confidence.</div>
        <button className="btn-primary-lg" onClick={handleGetStarted}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          Get a Publishing Quote
        </button>
        <a href="/consultation" className="btn-primary-lg-white" style={{ marginLeft: 20 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          Book a Free Consultation
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Alpine <span>Publishing</span> Studios</div>
            <div className="footer-desc">Alpine Publishing Studios helps authors edit, design, format, publish, and promote books with professional support from manuscript to marketplace.</div>
            <div style={{ marginBottom: 8, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Ready to publish your book? Start with a quick quote request.</div>
            <button className="footer-cta-btn" onClick={handleGetStarted}>Get a Publishing Quote</button>
            <div className="footer-contact-block">
              <div className="footer-contact-item">Email: support@alpinepublishingstudios.com</div>
              <div className="footer-contact-item">Phone: (312) 752-2806</div>
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
              <a href="/services/ghostwriting-services">Ghostwriting</a>
              <a href="/services/book-editing-services">Editing</a>
              <a href="/services/proofreading-services">Proofreading</a>
              <a href="/services/book-cover-design">Cover Design</a>
              <a href="/services/book-formatting-services">Formatting</a>
              <a href="/services/self-publishing-services">Publishing</a>
              <a href="/services/book-marketing-services">Marketing</a>
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
          <span>© {new Date().getFullYear()} Alpine Publishing Studios. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}