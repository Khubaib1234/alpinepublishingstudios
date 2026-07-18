'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { DARK, TEXT_BODY, SITE_URL } from '@/lib/design-tokens';
import { getServicePageStyles } from './servicePageStyles';
import ServiceQuoteForm from './ServiceQuoteForm';
import SiteHeader from '@/components/SiteHeader';

export default function ServiceDetailPage({ content }) {
  const [showPopup, setShowPopup] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (showPopup) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [showPopup]);

  useEffect(() => {
    const els = document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('anim-visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToQuote = (e) => {
    e?.preventDefault?.();
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openQuotePopup = (e) => {
    e?.preventDefault?.();
    setShowPopup(true);
  };

  const pageUrl = `${SITE_URL}${content.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.schemaName,
    description: content.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'Alpine Publishing Studios',
      url: SITE_URL,
    },
    areaServed: 'Worldwide',
    url: pageUrl,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: content.breadcrumbName, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <style>{getServicePageStyles()}</style>

      {showPopup && (
        <div className="popup-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowPopup(false); }}>
          <div className="popup-card">
            <button className="popup-close" onClick={() => setShowPopup(false)} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div style={{ fontSize: 24, fontWeight: 700, color: DARK, marginBottom: 6 }}>{content.popupTitle}</div>
            <div style={{ fontSize: 14, color: TEXT_BODY, marginBottom: 24 }}>
              Tell us about your project and we&apos;ll get back to you within 24 hours.
            </div>
            <ServiceQuoteForm sourcePage={content.sourcePage} submitLabel={content.formSubmitLabel} />
          </div>
        </div>
      )}

      <SiteHeader activeNav="services" />

      {/* Hero */}
      <section className="svc-hero">
        <div className="svc-hero-inner">
          <span className="svc-hero-label">{content.eyebrow}</span>
          <h1 className="svc-hero-title">
            {content.h1Before}
            {content.h1Accent ? <span className="accent"> {content.h1Accent}</span> : null}
            {content.h1After ? ` ${content.h1After}` : null}
          </h1>
          <p className="svc-hero-desc">{content.subhead}</p>
          <div className="svc-hero-btns">
            <button type="button" className="btn-primary" onClick={scrollToQuote}>
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M6 0L12 7L6 14L4.6 12.4L8.4 8H0V6H8.4L4.6 1.6L6 0Z" fill="white" />
              </svg>
              {content.primaryCta}
            </button>
            <button type="button" className="btn-secondary" onClick={openQuotePopup}>
              {content.secondaryCta}
            </button>
          </div>
          <div className="hero-stats" aria-label="Trust indicators">
            {content.trustStrip.map(([val, lbl]) => (
              <div className="hero-stat" key={lbl}>
                <div className="hero-stat-val">{val}</div>
                <div className="hero-stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="overview-section">
        <div className="overview-inner">
          <div className="overview-copy anim-fade-left">
            <span className="section-label">Overview</span>
            <h2 className="section-title">
              {content.overviewTitle}
            </h2>
            {content.overviewParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {content.overviewImage ? (
            <div className="overview-media anim-fade-right">
              <Image
                src={content.overviewImage}
                alt={content.overviewImageAlt || content.overviewTitle}
                width={800}
                height={600}
                sizes="(max-width: 900px) 100vw, 48vw"
                loading="lazy"
                quality={75}
                style={{ width: '100%', height: 'auto', aspectRatio: '4 / 3', objectFit: 'cover' }}
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Hook + Service Boxes */}
      <section className="hook-section">
        <div className="hook-inner">
          <div className="hook-header anim-fade-up">
            <span className="section-label">What You Get</span>
            <h2 className="section-title">{content.hookTitle}</h2>
            <p>{content.hookIntro}</p>
            <p>{content.hookParagraph}</p>
          </div>
          <div className="service-boxes">
            {content.serviceBoxes.map((box, i) => (
              <article key={box.title} className={`service-box anim-fade-up anim-delay-${(i % 4) + 1}`}>
                <div className="service-box-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{box.title}</h3>
                <p>{box.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="faq-inner">
          <div className="faq-header anim-fade-up">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">{content.faqTitle}</h2>
          </div>
          <div className="faq-list anim-fade-up">
            {content.faqs.map((faq, i) => (
              <div className="faq-item" key={faq.q}>
                <div
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={openFaq === i}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenFaq(openFaq === i ? null : i);
                    }
                  }}
                >
                  {faq.q}
                  <svg
                    className={`faq-chevron${openFaq === i ? ' open' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
                <div className={`faq-answer${openFaq === i ? ' open' : ''}`}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + Form */}
      <section className="cta-section" id="quote-form">
        <div className="cta-inner">
          <div className="cta-left anim-fade-left">
            <h2>
              {content.finalCtaTitle}
              {content.finalCtaAccent ? <span className="accent"> {content.finalCtaAccent}</span> : null}
            </h2>
            <p>{content.finalCtaText}</p>
            <button type="button" className="btn-primary-lg" onClick={openQuotePopup}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              {content.finalCtaButton}
            </button>
          </div>
          <div className="anim-fade-right">
            <div className="cta-form-card">
              <div className="cta-form-title">{content.formTitle}</div>
              <div className="cta-form-sub">{content.formSub}</div>
              <ServiceQuoteForm sourcePage={content.sourcePage} submitLabel={content.formSubmitLabel} />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Alpine <span>Publishing</span> Studios</div>
            <div className="footer-desc">
              Alpine Publishing Studios helps authors edit, design, format, publish, and promote books with professional support from manuscript to marketplace.
            </div>
            <div style={{ marginBottom: 8, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>
              Ready to publish your book? Start with a quick quote request.
            </div>
            <button type="button" className="footer-cta-btn" onClick={openQuotePopup}>Get a Publishing Quote</button>
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
              <a href="/contact-us">Contact Us</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <div className="footer-links">
              <a href="/services">All Services</a>
              <a href="/services/ghostwriting-services">Ghostwriting</a>
              <a href="/services/book-editing-services">Book Editing</a>
              <a href="/services/book-cover-design">Cover Design</a>
              <a href="/services/self-publishing-services">Self-Publishing</a>
              <a href="/services/book-marketing-services">Book Marketing</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Resources</div>
            <div className="footer-links">
              <a href="/blogs">Blogs</a>
              <a href="/consultation">Free Consultation</a>
              <a href="/contact-us">Get a Quote</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Alpine Publishing Studios. All rights reserved.</div>
          <div>Professional publishing support for independent authors.</div>
        </div>
      </footer>
    </>
  );
}
