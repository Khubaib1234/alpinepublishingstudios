const COLORS = {
  blue: '#1690CE',
  dark: '#133B49',
  body: '#4C617B',
  bg: '#F8F5F1',
  border: '#DCE2EA',
  white: '#ffffff',
};

const SELECT_LABELS = {
  hasManuscript: {
    yes_complete: "Yes, it's complete",
    yes_partial: 'Partially complete',
    no_outline: 'No, just an outline',
    no_idea: 'No, just an idea',
  },
  services: {
    editing: 'Editing',
    proofreading: 'Proofreading',
    cover_design: 'Cover Design',
    formatting: 'Formatting',
    publishing: 'Publishing',
    marketing: 'Marketing',
    ghostwriting: 'Ghostwriting',
    full_support: 'Full Publishing Support',
    not_sure: 'Not Sure Yet',
  },
  timeline: {
    asap: 'As soon as possible',
    '1_3_months': '1–3 months',
    '3_6_months': '3–6 months',
    '6_12_months': '6–12 months',
    flexible: 'Flexible / No rush',
  },
};

const FORM_CONFIGS = {
  quote: {
    badge: 'Quote Request',
    title: 'New Quote Request',
    subtitle: 'A publishing quote request was submitted via the website.',
    subject: (data) => `Quote Request: ${data.name || 'New Submission'}`,
    fields: [
      { key: 'name', label: 'Full Name' },
      { key: 'email', label: 'Email Address' },
      { key: 'phone', label: 'Phone Number' },
      { key: 'bookTitle', label: 'Book Title / Working Title' },
      { key: 'genre', label: 'Genre / Category' },
      { key: 'wordCount', label: 'Estimated Word Count' },
      { key: 'hasManuscript', label: 'Completed Manuscript?' },
      { key: 'services', label: 'Services Interested In' },
      { key: 'timeline', label: 'Preferred Publishing Timeline' },
    ],
    messageFields: [{ key: 'message', label: 'Project Details' }],
  },
  project: {
    badge: 'Project Inquiry',
    title: 'New Project Submission',
    subtitle: 'A new project inquiry was submitted via the website.',
    subject: (data) => `Project Inquiry: ${data.name || 'New Submission'}`,
    fields: [
      { key: 'name', label: 'Full Name' },
      { key: 'email', label: 'Email Address' },
      { key: 'phone', label: 'Phone Number' },
      { key: 'title', label: 'Book Title / Working Title' },
      { key: 'genre', label: 'Genre / Category' },
    ],
    messageFields: [{ key: 'project', label: 'Project Details' }],
  },
  consultation: {
    badge: 'Consultation',
    title: 'New Consultation Request',
    subtitle: 'A consultation query was submitted via the website.',
    subject: (data) => `Consultation: ${data.name || 'New Submission'}`,
    fields: [
      { key: 'name', label: 'Full Name' },
      { key: 'email', label: 'Email Address' },
      { key: 'phone', label: 'Phone Number' },
      { key: 'stage', label: 'Book Stage' },
      { key: 'helpWith', label: 'Needs Help With' },
    ],
    messageFields: [{ key: 'query', label: 'Question / Project Details' }],
  },
};

/** @deprecated use consultation */
FORM_CONFIGS.query = FORM_CONFIGS.consultation;

function escapeHtml(value) {
  if (value == null) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatFieldValue(key, value) {
  if (value == null || value === '') return 'Not provided';
  const map = SELECT_LABELS[key];
  if (map && map[value]) return map[value];
  return String(value);
}

function humanizeKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function renderFieldRows(fields, data, startAlt = false) {
  let alt = startAlt;
  return fields
    .map(({ key, label }) => {
      const raw = data[key];
      const display = formatFieldValue(key, raw);
      const rowBg = alt ? `background: ${COLORS.bg};` : '';
      alt = !alt;
      return `
        <tr style="${rowBg}">
          <td style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: ${COLORS.body}; text-transform: uppercase; letter-spacing: 0.06em; width: 180px; vertical-align: top; border-bottom: 1px solid ${COLORS.border};">${escapeHtml(label)}</td>
          <td style="padding: 12px 16px; font-size: 15px; color: ${COLORS.dark}; font-weight: 600; vertical-align: top; border-bottom: 1px solid ${COLORS.border};">${escapeHtml(display)}</td>
        </tr>`;
    })
    .join('');
}

function renderMessageBlocks(messageFields, data) {
  return messageFields
    .map(({ key, label }) => {
      const content = formatFieldValue(key, data[key]);
      return `
        <div style="margin-top: 20px; padding: 18px 20px; background: ${COLORS.bg}; border-radius: 10px; border-left: 4px solid ${COLORS.blue};">
          <div style="font-size: 12px; font-weight: 700; color: ${COLORS.body}; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px;">${escapeHtml(label)}</div>
          <p style="color: ${COLORS.dark}; font-size: 15px; line-height: 1.65; margin: 0; white-space: pre-wrap;">${escapeHtml(content)}</p>
        </div>`;
    })
    .join('');
}

function getExtraFields(config, data) {
  const knownKeys = new Set([
    'formType',
    'sourcePage',
    ...config.fields.map((f) => f.key),
    ...config.messageFields.map((f) => f.key),
  ]);

  return Object.entries(data)
    .filter(([key, value]) => !knownKeys.has(key) && value != null && value !== '')
    .map(([key, value]) => ({ key, label: humanizeKey(key), value: formatFieldValue(key, value) }));
}

export function getFormConfig(formType) {
  return FORM_CONFIGS[formType] || null;
}

export function buildEmailSubject(formType, data) {
  const config = getFormConfig(formType);
  if (!config) return `Website Form: ${data.name || 'New Submission'}`;
  return config.subject(data);
}

export function buildEmailHtml({ formType, data, logoUrl, sourcePage }) {
  const config = getFormConfig(formType);
  if (!config) return null;

  const extraFields = getExtraFields(config, data);
  const extraRows = extraFields.length
    ? renderFieldRows(extraFields.map(({ key, label }) => ({ key, label })), Object.fromEntries(extraFields.map(({ key, value }) => [key, value])), false)
    : '';

  const sourceLabel = sourcePage ? humanizeKey(sourcePage.replace(/-/g, ' ')) : null;
  const timestamp = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(config.title)}</title>
</head>
<body style="margin: 0; padding: 0; background: ${COLORS.bg}; font-family: 'DM Sans', Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: ${COLORS.bg}; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
          <!-- Header with logo -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <img src="${escapeHtml(logoUrl)}" alt="Alpine Publishing Studios" width="160" style="display: block; height: auto; max-height: 48px; border-radius: 4px;" />
            </td>
          </tr>
          <!-- Main card -->
          <tr>
            <td style="background: ${COLORS.white}; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 40px rgba(19,59,73,0.08);">
              <!-- Top accent bar -->
              <div style="height: 4px; background: linear-gradient(90deg, ${COLORS.blue}, #44B8F0);"></div>
              <div style="padding: 32px 28px;">
                <!-- Badge + title -->
                <div style="margin-bottom: 20px;">
                  <span style="display: inline-block; background: rgba(22,144,206,0.12); color: ${COLORS.blue}; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 6px 12px; border-radius: 20px; margin-bottom: 12px;">${escapeHtml(config.badge)}</span>
                  <h1 style="color: ${COLORS.dark}; font-size: 24px; font-weight: 700; margin: 8px 0 6px; line-height: 1.3;">${escapeHtml(config.title)}</h1>
                  <p style="color: ${COLORS.body}; font-size: 14px; margin: 0; line-height: 1.5;">${escapeHtml(config.subtitle)}</p>
                </div>
                <!-- Meta info -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                  <tr>
                    ${sourceLabel ? `<td style="font-size: 12px; color: ${COLORS.body};"><strong style="color: ${COLORS.dark};">Page:</strong> ${escapeHtml(sourceLabel)}</td>` : ''}
                    <td align="right" style="font-size: 12px; color: ${COLORS.body};"><strong style="color: ${COLORS.dark};">Received:</strong> ${escapeHtml(timestamp)}</td>
                  </tr>
                </table>
                <hr style="border: none; border-top: 1px solid ${COLORS.border}; margin: 0 0 24px;" />
                <!-- Fields table -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border-radius: 10px; overflow: hidden; border: 1px solid ${COLORS.border};">
                  ${renderFieldRows(config.fields, data)}
                  ${extraRows}
                </table>
                ${renderMessageBlocks(config.messageFields, data)}
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 16px 8px;">
              <p style="color: ${COLORS.body}; font-size: 12px; margin: 0 0 4px; line-height: 1.5;">
                <strong style="color: ${COLORS.dark};">Alpine Publishing Studios</strong>
              </p>
              <p style="color: ${COLORS.body}; font-size: 11px; margin: 0; opacity: 0.85;">
                Automated notification · Reply directly to respond to the sender
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function resolveLogoUrl(request) {
  const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    return `${siteUrl.replace(/\/$/, '')}/logo.png`;
  }

  const origin = request.headers.get('origin');
  if (origin) return `${origin}/logo.png`;

  const host = request.headers.get('host');
  if (host) {
    const protocol = host.includes('localhost') ? 'http' : 'https';
    return `${protocol}://${host}/logo.png`;
  }

  return 'https://alpinepublishingstudios.com/logo.png';
}
