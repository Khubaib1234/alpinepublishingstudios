'use client';

import { useState } from 'react';
import { BLUE, BLUE_DARK, BLUE_LIGHT, DARK, TEXT_BODY, WHITE, BORDER } from '@/lib/design-tokens';

export default function ServiceQuoteForm({ sourcePage, submitLabel = 'Start My Publishing Journey' }) {
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
        body: JSON.stringify({ formType: 'project', sourcePage, ...form }),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', background: BLUE_LIGHT,
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: DARK, marginBottom: 10 }}>You're on the list!</div>
        <div style={{ fontSize: 15, color: TEXT_BODY, lineHeight: 1.6 }}>
          We&apos;ll be in touch within 24 hours to help you get started.
        </div>
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
    boxShadow: focused === field ? '0 0 0 3px rgba(22,144,206,0.12)' : 'none',
    fontFamily: 'inherit',
  });

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="svc-form-grid-2">
        <div className="svc-form-field">
          <label>Full Name</label>
          <input type="text" required placeholder="Jane Smith" value={form.name} autoComplete="name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} style={inputStyle('name')} />
        </div>
        <div className="svc-form-field">
          <label>Email Address</label>
          <input type="email" required placeholder="jane@example.com" value={form.email} autoComplete="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} style={inputStyle('email')} />
        </div>
      </div>
      <div className="svc-form-field">
        <label>Phone Number</label>
        <input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} autoComplete="tel"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} style={inputStyle('phone')} />
      </div>
      <div className="svc-form-grid-2">
        <div className="svc-form-field">
          <label>Book Title / Working Title</label>
          <input type="text" required placeholder="The Silent Stars" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            onFocus={() => setFocused('title')} onBlur={() => setFocused(null)} style={inputStyle('title')} />
        </div>
        <div className="svc-form-field">
          <label>Genre / Category</label>
          <input type="text" required placeholder="Science Fiction" value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            onFocus={() => setFocused('genre')} onBlur={() => setFocused(null)} style={inputStyle('genre')} />
        </div>
      </div>
      <div className="svc-form-field">
        <label>Tell us about your project</label>
        <textarea required
          placeholder="Share your story — what's your book about, where are you in the process, and what do you need help with?"
          value={form.project}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
          onFocus={() => setFocused('project')} onBlur={() => setFocused(null)}
          rows={4} style={{ ...inputStyle('project'), resize: 'vertical', lineHeight: 1.55, minHeight: 96 }} />
      </div>
      {error && <p style={{ fontSize: 13, color: '#e53e3e', textAlign: 'center', marginTop: -4 }}>{error}</p>}
      <button type="submit" disabled={submitting} style={{
        background: submitting ? '#aaa' : BLUE, color: WHITE, border: 'none',
        padding: '14px 28px', borderRadius: 10, fontSize: 16, fontWeight: 700,
        cursor: submitting ? 'not-allowed' : 'pointer', width: '100%', minHeight: 48,
        fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}
        onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = BLUE_DARK; }}
        onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.background = BLUE; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        {submitting ? 'Sending...' : submitLabel}
      </button>
      <p style={{ fontSize: 12, color: TEXT_BODY, textAlign: 'center', marginTop: -4 }}>
        Your details are reviewed by our publishing team. We will reach out with guidance based on your project.
      </p>
    </form>
  );
}
