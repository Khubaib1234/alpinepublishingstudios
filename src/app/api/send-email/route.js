import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { formType, name, email, phone, project, query, subject: contactSubject, message } = body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const senderEmail = process.env.SENDER_EMAIL;

    if (!adminEmail || !senderEmail) {
      return NextResponse.json({ error: 'Email configuration missing.' }, { status: 500 });
    }

    let emailSubject = '';
    let emailHtml = '';

    if (formType === 'project') {
      // From landing page / contact-us "Tell us about your project" form
      emailSubject = `Project Description: ${name}`;
      emailHtml = `
        <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f5f1; padding: 32px 24px; border-radius: 12px;">
          <div style="background: white; border-radius: 12px; padding: 32px; border-top: 4px solid #1690CE;">
            <h2 style="color: #133B49; margin-bottom: 4px; font-size: 22px;">New Project Submission</h2>
            <p style="color: #4C617B; margin-top: 0; font-size: 14px;">A new project inquiry was submitted via the Alpine Publishing Studios website.</p>
            <hr style="border: none; border-top: 1px solid #DCE2EA; margin: 24px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-size: 13px; font-weight: 700; color: #4C617B; text-transform: uppercase; letter-spacing: 0.06em; width: 140px;">Full Name</td>
                <td style="padding: 10px 0; font-size: 15px; color: #133B49; font-weight: 600;">${name}</td>
              </tr>
              <tr style="background: #f8f5f1;">
                <td style="padding: 10px; font-size: 13px; font-weight: 700; color: #4C617B; text-transform: uppercase; letter-spacing: 0.06em;">Email</td>
                <td style="padding: 10px; font-size: 15px; color: #133B49; font-weight: 600;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-size: 13px; font-weight: 700; color: #4C617B; text-transform: uppercase; letter-spacing: 0.06em;">Phone</td>
                <td style="padding: 10px 0; font-size: 15px; color: #133B49;">${phone || 'Not provided'}</td>
              </tr>
              ${contactSubject ? `
              <tr style="background: #f8f5f1;">
                <td style="padding: 10px; font-size: 13px; font-weight: 700; color: #4C617B; text-transform: uppercase; letter-spacing: 0.06em;">Subject</td>
                <td style="padding: 10px; font-size: 15px; color: #133B49;">${contactSubject}</td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #f8f5f1; border-radius: 8px; border-left: 3px solid #1690CE;">
              <div style="font-size: 13px; font-weight: 700; color: #4C617B; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">Project Details</div>
              <p style="color: #133B49; font-size: 15px; line-height: 1.65; margin: 0;">${project || message || 'No details provided.'}</p>
            </div>
          </div>
          <p style="text-align: center; color: #4C617B; font-size: 12px; margin-top: 20px;">Alpine Publishing Studios · Automated Notification</p>
        </div>
      `;
    } else if (formType === 'query') {
      // From consultation page
      emailSubject = `Query: ${name}`;
      emailHtml = `
        <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f5f1; padding: 32px 24px; border-radius: 12px;">
          <div style="background: white; border-radius: 12px; padding: 32px; border-top: 4px solid #1690CE;">
            <h2 style="color: #133B49; margin-bottom: 4px; font-size: 22px;">New Consultation Query</h2>
            <p style="color: #4C617B; margin-top: 0; font-size: 14px;">A new consultation query was submitted via the Alpine Publishing Studios website.</p>
            <hr style="border: none; border-top: 1px solid #DCE2EA; margin: 24px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-size: 13px; font-weight: 700; color: #4C617B; text-transform: uppercase; letter-spacing: 0.06em; width: 140px;">Full Name</td>
                <td style="padding: 10px 0; font-size: 15px; color: #133B49; font-weight: 600;">${name}</td>
              </tr>
              <tr style="background: #f8f5f1;">
                <td style="padding: 10px; font-size: 13px; font-weight: 700; color: #4C617B; text-transform: uppercase; letter-spacing: 0.06em;">Email</td>
                <td style="padding: 10px; font-size: 15px; color: #133B49; font-weight: 600;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-size: 13px; font-weight: 700; color: #4C617B; text-transform: uppercase; letter-spacing: 0.06em;">Phone</td>
                <td style="padding: 10px 0; font-size: 15px; color: #133B49;">${phone || 'Not provided'}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #f8f5f1; border-radius: 8px; border-left: 3px solid #1690CE;">
              <div style="font-size: 13px; font-weight: 700; color: #4C617B; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">Their Query</div>
              <p style="color: #133B49; font-size: 15px; line-height: 1.65; margin: 0;">${query || 'No query provided.'}</p>
            </div>
          </div>
          <p style="text-align: center; color: #4C617B; font-size: 12px; margin-top: 20px;">Alpine Publishing Studios · Automated Notification</p>
        </div>
      `;
    } else {
      return NextResponse.json({ error: 'Invalid form type.' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: [adminEmail],
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
