'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { BLUE, DARK, TEXT_BODY, WHITE, BORDER, BG } from '@/lib/design-tokens';
import { SERVICE_NAV_LINKS, SERVICE_NAV_GROUPS } from '@/lib/service-nav';

export default function SiteHeader({ activeNav = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDesktopOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openDesktop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopOpen(true);
  };

  const scheduleCloseDesktop = () => {
    closeTimer.current = setTimeout(() => setDesktopOpen(false), 160);
  };

  const grouped = SERVICE_NAV_GROUPS.map((group) => ({
    group,
    links: SERVICE_NAV_LINKS.filter((l) => l.group === group),
  })).filter((g) => g.links.length);

  const isServicesActive = activeNav === 'services';

  return (
    <>
      <style>{`
        .site-header { position: fixed; top: 0; left: 0; right: 0; z-index: 999; background: ${WHITE}; transition: box-shadow .3s; border-bottom: 1px solid ${BORDER}; }
        .site-header.scrolled { box-shadow: 0 2px 24px rgba(19,59,73,.08); }
        .site-header-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; height: 70px; }
        .site-logo { font-size: 20px; font-weight: 700; color: ${DARK}; letter-spacing: -.4px; display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .site-logo span { color: ${BLUE}; }
        .site-logo-img { height: 36px !important; width: auto !important; flex-shrink: 0; border-radius: 3px; object-fit: contain; display: block; }
        .site-nav { display: flex; gap: 28px; align-items: center; }
        .site-nav a, .site-nav-trigger { font-size: 15px; color: ${TEXT_BODY}; transition: color .2s; font-weight: 500; text-decoration: none; background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; padding: 0; display: inline-flex; align-items: center; gap: 6px; }
        .site-nav a:hover, .site-nav a.active, .site-nav-trigger:hover, .site-nav-trigger.active { color: ${BLUE}; }
        .site-nav-services-wrap { display: inline-flex; align-items: center; gap: 4px; }
        .site-nav-chevron { transition: transform .25s cubic-bezier(.22,1,.36,1); display: inline-flex; }
        .site-nav-item:hover .site-nav-chevron, .site-nav-trigger[aria-expanded="true"] .site-nav-chevron { transform: rotate(180deg); }
        .site-nav-item { position: relative; }
        .site-dropdown {
          position: absolute; top: calc(100% + 14px); left: 50%; transform: translateX(-50%) translateY(8px);
          width: min(720px, calc(100vw - 48px)); background: ${WHITE}; border: 1px solid ${BORDER};
          border-radius: 18px; padding: 20px; box-shadow: 0 24px 64px rgba(19,59,73,.14), 0 4px 16px rgba(22,144,206,.08);
          opacity: 0; visibility: hidden; pointer-events: none;
          transition: opacity .22s cubic-bezier(.22,1,.36,1), transform .22s cubic-bezier(.22,1,.36,1), visibility .22s;
          z-index: 1000;
        }
        .site-dropdown::before {
          content: ''; position: absolute; top: -7px; left: 50%; transform: translateX(-50%) rotate(45deg);
          width: 14px; height: 14px; background: ${WHITE}; border-left: 1px solid ${BORDER}; border-top: 1px solid ${BORDER};
        }
        .site-dropdown.open {
          opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(-50%) translateY(0);
        }
        .site-dropdown-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px 16px;
        }
        .site-dropdown-group { padding: 4px 0 8px; }
        .site-dropdown-group-label {
          font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          color: ${BLUE}; margin-bottom: 8px; padding: 0 10px;
        }
        .site-dropdown-link {
          display: block; padding: 10px 12px; border-radius: 10px; font-size: 14px; font-weight: 500;
          color: ${DARK}; text-decoration: none; transition: background .18s, color .18s, transform .18s;
        }
        .site-dropdown-link:hover {
          background: rgba(22,144,206,0.08); color: ${BLUE}; transform: translateX(3px);
        }
        .site-dropdown-footer {
          margin-top: 14px; padding-top: 14px; border-top: 1px solid ${BORDER};
          display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
        }
        .site-dropdown-footer-text { font-size: 13px; color: ${TEXT_BODY}; }
        .site-dropdown-all {
          display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 700;
          color: ${BLUE}; text-decoration: none; padding: 8px 12px; border-radius: 8px;
          background: rgba(22,144,206,0.1); transition: background .2s, gap .2s;
        }
        .site-dropdown-all:hover { background: rgba(22,144,206,0.16); gap: 10px; }
        .site-hamburger {
          display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px;
          min-width: 44px; min-height: 44px; align-items: center; justify-content: center;
          background: none; border: none;
        }
        .site-hamburger span { display: block; width: 22px; height: 2px; background: ${DARK}; border-radius: 2px; transition: transform .25s, opacity .25s; }
        .site-mobile-menu {
          display: none; position: fixed; top: 70px; left: 0; right: 0; bottom: 0; background: white; z-index: 998;
          padding: 16px 24px 32px; flex-direction: column; gap: 4px; overflow-y: auto;
        }
        .site-mobile-menu.open { display: flex; }
        .site-mobile-link {
          font-size: 17px; font-weight: 500; color: ${DARK}; padding: 14px 0; border-bottom: 1px solid ${BORDER};
          text-decoration: none; display: flex; align-items: center; justify-content: space-between; background: none; border-left: none; border-right: none; border-top: none; width: 100%; cursor: pointer; font-family: 'DM Sans', sans-serif; text-align: left;
        }
        .site-mobile-link:hover { color: ${BLUE}; }
        .site-mobile-services {
          max-height: 0; overflow: hidden; opacity: 0;
          transition: max-height .35s cubic-bezier(.22,1,.36,1), opacity .25s ease;
          background: ${BG}; border-radius: 12px; margin: 4px 0 8px;
        }
        .site-mobile-services.open { max-height: 720px; opacity: 1; padding: 8px; }
        .site-mobile-services a {
          display: block; padding: 11px 14px; font-size: 14px; color: ${TEXT_BODY}; text-decoration: none;
          border-radius: 8px; font-weight: 500; transition: background .15s, color .15s;
        }
        .site-mobile-services a:hover { background: rgba(22,144,206,0.1); color: ${BLUE}; }
        .site-mobile-services .all-services {
          font-weight: 700; color: ${BLUE}; margin-top: 4px; border-top: 1px solid ${BORDER}; padding-top: 12px;
        }
        @media (max-width: 900px) {
          .site-dropdown-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .site-nav { display: none; }
          .site-hamburger { display: flex; }
          .site-header-inner { padding: 0 16px; }
          .site-logo { font-size: 15px; gap: 6px; max-width: calc(100% - 56px); }
        }
        @media (max-width: 420px) {
          .site-logo { font-size: 0; gap: 0; }
          .site-logo-img { margin-right: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .site-dropdown, .site-nav-chevron, .site-mobile-services, .site-dropdown-link { transition: none !important; }
        }
      `}</style>

      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="site-header-inner">
          <a href="/" className="site-logo">
            <Image
              src="/logo.png"
              alt="Alpine Publishing Studios"
              width={72}
              height={72}
              className="site-logo-img"
              priority
              sizes="36px"
            />
            Alpine <span>Publishing</span> Studios
          </a>

          <nav className="site-nav" aria-label="Main">
            <div
              className="site-nav-item"
              ref={dropdownRef}
              onMouseEnter={openDesktop}
              onMouseLeave={scheduleCloseDesktop}
            >
              <div className="site-nav-services-wrap">
                <a
                  href="/services"
                  className={isServicesActive ? 'active' : ''}
                  onFocus={openDesktop}
                >
                  Services
                </a>
                <button
                  type="button"
                  className={`site-nav-trigger${isServicesActive ? ' active' : ''}`}
                  aria-expanded={desktopOpen}
                  aria-haspopup="true"
                  aria-label="Open services menu"
                  onClick={() => setDesktopOpen((v) => !v)}
                >
                  <span className="site-nav-chevron" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className={`site-dropdown${desktopOpen ? ' open' : ''}`} role="menu">
                <div className="site-dropdown-grid">
                  {grouped.map(({ group, links }) => (
                    <div className="site-dropdown-group" key={group}>
                      <div className="site-dropdown-group-label">{group}</div>
                      {links.map((link) => (
                        <a key={link.href} href={link.href} className="site-dropdown-link" role="menuitem">
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="site-dropdown-footer">
                  <span className="site-dropdown-footer-text">Full publishing support from idea to launch</span>
                  <a href="/services" className="site-dropdown-all">
                    View all services
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <a href="/consultation" className={activeNav === 'consultation' ? 'active' : ''}>Consultation</a>
            <a href="/about-us" className={activeNav === 'about' ? 'active' : ''}>About Us</a>
            <a href="/contact-us" className={activeNav === 'contact' ? 'active' : ''}>Contact</a>
            <a href="/blogs" className={activeNav === 'blogs' ? 'active' : ''}>Blogs</a>
          </nav>

          <button
            type="button"
            className="site-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        <div className={`site-mobile-menu${menuOpen ? ' open' : ''}`}>
          <button
            type="button"
            className="site-mobile-link"
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            aria-expanded={mobileServicesOpen}
          >
            Services
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={BLUE}
              strokeWidth="2.5"
              style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className={`site-mobile-services${mobileServicesOpen ? ' open' : ''}`}>
            {SERVICE_NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
            ))}
            <a href="/services" className="all-services" onClick={() => setMenuOpen(false)}>View all services →</a>
          </div>
          <a href="/consultation" className="site-mobile-link" onClick={() => setMenuOpen(false)}>Consultation</a>
          <a href="/about-us" className="site-mobile-link" onClick={() => setMenuOpen(false)}>About Us</a>
          <a href="/contact-us" className="site-mobile-link" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="/blogs" className="site-mobile-link" onClick={() => setMenuOpen(false)}>Blogs</a>
        </div>
      </header>
    </>
  );
}
