import { BLUE, BLUE_DARK, BLUE_LIGHT, DARK, TEXT_BODY, BG, WHITE, BORDER } from '@/lib/design-tokens';

export function getServicePageStyles() {
  return `
    .anim-fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1); }
    .anim-fade-left { opacity: 0; transform: translateX(-28px); transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1); }
    .anim-fade-right { opacity: 0; transform: translateX(28px); transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1); }
    .anim-scale-in { opacity: 0; transform: scale(0.96); transition: opacity 0.55s cubic-bezier(.22,1,.36,1), transform 0.55s cubic-bezier(.22,1,.36,1); }
    .anim-visible { opacity: 1 !important; transform: none !important; }
    .anim-delay-1 { transition-delay: 0.08s; }
    .anim-delay-2 { transition-delay: 0.16s; }
    .anim-delay-3 { transition-delay: 0.24s; }
    .anim-delay-4 { transition-delay: 0.32s; }
    @keyframes heroFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    .svc-hero-inner { animation: heroFadeUp 0.75s cubic-bezier(.22,1,.36,1) both; }
    .hero-stats { animation: heroFadeUp 0.75s cubic-bezier(.22,1,.36,1) 0.18s both; }

    @media (prefers-reduced-motion: reduce) {
      .anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale-in, .svc-hero-inner, .hero-stats {
        animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important;
      }
    }

    .popup-overlay { position: fixed; inset: 0; z-index: 9999; background: rgba(19,59,73,.55); display: flex; align-items: center; justify-content: center; padding: 16px; }
    .popup-card { background: white; border-radius: 20px; width: 100%; max-width: 540px; padding: 36px 28px; position: relative; box-shadow: 0 24px 64px rgba(19,59,73,.2); max-height: 90vh; overflow-y: auto; }
    .popup-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, ${BLUE}, #44B8F0); border-radius: 20px 20px 0 0; }
    .popup-close { position: absolute; top: 12px; right: 12px; width: 40px; height: 40px; border-radius: 50%; background: var(--bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; }

    :root {
      --blue: ${BLUE}; --blue-dark: ${BLUE_DARK}; --blue-light: ${BLUE_LIGHT};
      --dark: ${DARK}; --body: ${TEXT_BODY}; --bg: ${BG}; --white: ${WHITE}; --border: ${BORDER};
    }
    a { text-decoration: none; color: inherit; }
    img { display: block; max-width: 100%; height: auto; }

    .section-label { display: inline-block; background: var(--blue-light); color: var(--blue); font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; margin-bottom: 16px; }
    .section-title { font-size: clamp(26px, 4vw, 44px); font-weight: 800; color: var(--dark); line-height: 1.15; }
    .section-title .accent { color: var(--blue); }
    .section-sub { font-size: clamp(15px, 2vw, 17px); color: var(--body); line-height: 1.65; margin-top: 12px; }

    .svc-hero {
      padding-top: 70px;
      min-height: min(100vh, 920px);
      display: flex;
      align-items: center;
      background: linear-gradient(160deg, ${DARK} 0%, #1a4d61 50%, #0d3347 100%);
      position: relative;
      overflow: hidden;
    }
    .svc-hero-blob { display: none; }
    .svc-hero-inner {
      max-width: 900px; width: 100%; margin: 0 auto;
      padding: clamp(48px, 8vw, 80px) clamp(16px, 4vw, 24px) clamp(56px, 8vw, 90px);
      position: relative; z-index: 1; text-align: center;
    }
    .svc-hero-label { display: inline-block; background: rgba(22,144,206,0.25); color: #74d4f8; font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; padding: 6px 16px; border-radius: 20px; margin-bottom: 20px; border: 1px solid rgba(22,144,206,0.3); }
    .svc-hero-title { font-size: clamp(28px, 5.2vw, 56px); font-weight: 800; color: white; line-height: 1.12; margin-bottom: 16px; letter-spacing: -.03em; }
    .svc-hero-title .accent { color: #74d4f8; }
    .svc-hero-desc { font-size: clamp(15px, 2.2vw, 18px); color: rgba(255,255,255,0.75); line-height: 1.65; max-width: 680px; margin: 0 auto 28px; }
    .svc-hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .svc-hero-btns .btn-primary,
    .svc-hero-btns .btn-secondary { min-height: 48px; }
    .hero-stats {
      display: flex; gap: 0; margin: 40px auto 0; max-width: 700px;
      background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
      border-radius: 16px; overflow: hidden;
    }
    .hero-stat { flex: 1; padding: 18px 12px; text-align: center; border-right: 1px solid rgba(255,255,255,0.1); }
    .hero-stat:last-child { border-right: none; }
    .hero-stat-val { font-size: clamp(20px, 3vw, 26px); font-weight: 800; color: white; }
    .hero-stat-lbl { font-size: 11px; color: rgba(255,255,255,0.55); margin-top: 4px; font-weight: 500; }

    .overview-section { padding: clamp(56px, 8vw, 90px) clamp(16px, 4vw, 24px); background: var(--bg); content-visibility: auto; contain-intrinsic-size: 1px 600px; }
    .overview-inner {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 1.05fr 0.95fr; gap: clamp(28px, 5vw, 56px);
      align-items: center; text-align: left;
    }
    .overview-copy .section-title { margin-bottom: 16px; }
    .overview-copy p { font-size: clamp(15px, 2vw, 17px); color: var(--body); line-height: 1.75; margin-bottom: 16px; }
    .overview-copy p:last-child { margin-bottom: 0; }
    .overview-media {
      position: relative; border-radius: 20px; overflow: hidden;
      box-shadow: 0 20px 48px rgba(19,59,73,.12);
      background: #e8eef3;
      width: 100%;
    }
    .overview-media::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(19,59,73,.14) 0%, transparent 42%);
      pointer-events: none; z-index: 1;
    }
    .overview-media img {
      width: 100% !important; height: auto !important;
      aspect-ratio: 4 / 3; object-fit: cover; display: block;
    }

    .hook-section { padding: clamp(56px, 8vw, 90px) clamp(16px, 4vw, 24px); background: white; content-visibility: auto; contain-intrinsic-size: 1px 700px; }
    .hook-inner { max-width: 1200px; margin: 0 auto; text-align: left; }
    .hook-header { max-width: 720px; margin-bottom: clamp(28px, 5vw, 48px); text-align: left; }
    .hook-header p { font-size: clamp(14px, 2vw, 16px); color: var(--body); line-height: 1.7; margin-top: 14px; }

    .service-boxes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    .service-box { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: clamp(20px, 3vw, 28px); transition: box-shadow .2s, transform .2s, border-color .2s; position: relative; overflow: hidden; }
    .service-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, ${BLUE}, #44B8F0); opacity: 0; transition: opacity .2s; }
    .service-box:hover::before { opacity: 1; }
    .service-box:hover { box-shadow: 0 12px 40px rgba(22,144,206,.1); transform: translateY(-2px); border-color: rgba(22,144,206,0.25); }
    .service-box-num { width: 36px; height: 36px; border-radius: 10px; background: var(--blue-light); color: var(--blue); font-size: 14px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
    .service-box h3 { font-size: clamp(16px, 2vw, 18px); font-weight: 700; color: var(--dark); margin-bottom: 8px; line-height: 1.3; }
    .service-box p { font-size: 14.5px; color: var(--body); line-height: 1.65; }

    .faq-section { padding: clamp(56px, 8vw, 80px) clamp(16px, 4vw, 24px); background: var(--bg); content-visibility: auto; contain-intrinsic-size: 1px 500px; }
    .faq-inner { max-width: 760px; margin: 0 auto; }
    .faq-header { text-align: center; margin-bottom: 32px; }
    .faq-list { display: flex; flex-direction: column; }
    .faq-item { border-bottom: 1px solid var(--border); }
    .faq-question {
      display: flex; justify-content: space-between; align-items: center;
      padding: 18px 0; cursor: pointer; gap: 12px;
      font-size: clamp(15px, 2vw, 16px); font-weight: 600; color: var(--dark);
      background: none; border: none; width: 100%; text-align: left;
      font-family: inherit; min-height: 48px;
    }
    .faq-chevron { flex-shrink: 0; width: 20px; height: 20px; color: var(--body); transition: transform .25s; }
    .faq-chevron.open { transform: rotate(180deg); }
    .faq-answer {
      font-size: 15px; color: var(--body); line-height: 1.65;
      max-height: 0; overflow: hidden;
      transition: max-height .3s ease, padding .3s ease;
    }
    .faq-answer.open { max-height: 420px; padding-bottom: 16px; }

    .cta-section { background: linear-gradient(135deg, ${DARK} 0%, #0d2e3a 100%); padding: clamp(56px, 8vw, 90px) clamp(16px, 4vw, 24px); content-visibility: auto; contain-intrinsic-size: 1px 640px; }
    .cta-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px, 5vw, 64px); align-items: center; }
    .cta-left h2 { font-size: clamp(26px, 4vw, 42px); font-weight: 800; color: white; line-height: 1.15; margin-bottom: 14px; }
    .cta-left h2 .accent { color: #74d4f8; }
    .cta-left p { font-size: 15px; color: rgba(255,255,255,.65); line-height: 1.65; margin-bottom: 24px; }
    .cta-form-card { background: white; border-radius: 20px; padding: clamp(24px, 4vw, 36px) clamp(18px, 3vw, 32px); box-shadow: 0 16px 48px rgba(0,0,0,.22); position: relative; }
    .cta-form-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, ${BLUE}, #44B8F0); border-radius: 20px 20px 0 0; }
    .cta-form-title { font-size: clamp(18px, 2.5vw, 22px); font-weight: 700; color: ${DARK}; margin-bottom: 4px; }
    .cta-form-sub { font-size: 14px; color: ${TEXT_BODY}; margin-bottom: 20px; }

    .svc-form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .svc-form-field label { font-size: 13px; font-weight: 600; color: ${DARK}; display: block; margin-bottom: 6px; }
    .svc-form-field input,
    .svc-form-field textarea {
      width: 100%; padding: 13px 16px; border-radius: 10px; border: 1.5px solid ${BORDER};
      font-size: 16px; color: ${DARK}; background: ${WHITE}; outline: none;
      font-family: inherit; transition: border-color .2s, box-shadow .2s;
    }
    .svc-form-field input:focus,
    .svc-form-field textarea:focus {
      border-color: ${BLUE}; box-shadow: 0 0 0 3px rgba(22,144,206,0.12);
    }

    .footer { background: ${DARK}; color: rgba(255,255,255,.7); padding: clamp(40px, 6vw, 64px) clamp(16px, 4vw, 24px) 32px; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 32px; max-width: 1200px; margin: 0 auto; }
    .footer-logo { font-size: 20px; font-weight: 700; color: white; margin-bottom: 14px; }
    .footer-logo span { color: var(--blue); }
    .footer-desc { font-size: 14px; line-height: 1.65; }
    .footer-col-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: white; margin-bottom: 16px; }
    .footer-links { display: flex; flex-direction: column; gap: 10px; }
    .footer-links a { font-size: 14px; color: rgba(255,255,255,.6); transition: color .2s; min-height: 24px; }
    .footer-links a:hover { color: white; }
    .footer-bottom { max-width: 1200px; margin: 40px auto 0; border-top: 1px solid rgba(255,255,255,.1); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: rgba(255,255,255,.4); }
    .footer-cta-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--blue); color: white; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 700; border: none; cursor: pointer; font-family: inherit; transition: background .2s; min-height: 44px; }
    .footer-cta-btn:hover { background: var(--blue-dark); }
    .footer-contact-block { margin-top: 24px; }
    .footer-contact-item { font-size: 13px; color: rgba(255,255,255,.55); margin-bottom: 6px; }

    .btn-primary { background: var(--blue); color: white; padding: 14px 24px; border-radius: 10px; font-size: 16px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: background .2s, transform .15s; border: none; cursor: pointer; font-family: inherit; min-height: 48px; }
    .btn-primary:hover { background: var(--blue-dark); transform: translateY(-1px); }
    .btn-secondary { color: white; font-size: 15px; font-weight: 500; display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: 1.5px solid rgba(255,255,255,0.35); padding: 13px 20px; border-radius: 10px; transition: border-color .2s; background: transparent; cursor: pointer; font-family: inherit; min-height: 48px; }
    .btn-secondary:hover { border-color: rgba(255,255,255,0.7); }
    .btn-primary-lg { background: var(--blue); color: white; padding: 14px 28px; border-radius: 12px; font-size: 16px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; gap: 10px; transition: background .2s, transform .15s; border: none; cursor: pointer; font-family: inherit; min-height: 48px; }
    .btn-primary-lg:hover { background: var(--blue-dark); transform: translateY(-1px); }

    @media (max-width: 900px) {
      .overview-inner { grid-template-columns: 1fr; }
      .overview-media { max-width: 100%; }
      .cta-inner { grid-template-columns: 1fr; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 700px) {
      .service-boxes { grid-template-columns: 1fr; }
      .svc-form-grid-2 { grid-template-columns: 1fr; }
      .svc-hero-btns { flex-direction: column; align-items: stretch; }
      .svc-hero-btns .btn-primary,
      .svc-hero-btns .btn-secondary { width: 100%; }
      .hero-stats { flex-wrap: wrap; }
      .hero-stat { flex: 1 1 50%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .hero-stat:last-child { border-bottom: none; }
      .footer-grid { grid-template-columns: 1fr; gap: 28px; }
      .popup-card { padding: 28px 18px; border-radius: 16px; }
    }
    @media (max-width: 480px) {
      .svc-hero { min-height: auto; }
      .hero-stat-lbl { font-size: 10px; }
    }
  `;
}
