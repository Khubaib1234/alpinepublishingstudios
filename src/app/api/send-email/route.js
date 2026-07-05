import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import {
  buildEmailHtml,
  buildEmailSubject,
  getFormConfig,
  resolveLogoUrl,
} from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { formType, sourcePage, email, ...formData } = body;

    if (!formType) {
      return NextResponse.json({ error: 'Form type is required.' }, { status: 400 });
    }

    if (!getFormConfig(formType)) {
      return NextResponse.json({ error: 'Invalid form type.' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const senderEmail = process.env.SENDER_EMAIL;

    if (!adminEmail || !senderEmail) {
      return NextResponse.json({ error: 'Email configuration missing.' }, { status: 500 });
    }

    const data = { email, ...formData };
    const logoUrl = resolveLogoUrl(request);
    const emailSubject = buildEmailSubject(formType, data);
    const emailHtml = buildEmailHtml({ formType, data, logoUrl, sourcePage });

    const { data: sendData, error } = await resend.emails.send({
      from: senderEmail,
      to: [adminEmail],
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
      tags: [
        { name: 'form_type', value: formType },
        ...(sourcePage ? [{ name: 'source_page', value: sourcePage }] : []),
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: sendData?.id }, { status: 200 });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
