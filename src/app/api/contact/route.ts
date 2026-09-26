import { createHash } from "node:crypto";

type Inquiry = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  organization?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(?=(?:\D*\d){7,15}\D*$)[+\d][\d\s().-]*$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

function emailShell(content: string, preview: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(preview)}</title></head><body style="margin:0;background:#f0ede5;font-family:Arial,Helvetica,sans-serif;color:#101110"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preview)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0ede5"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #dedad0"><tr><td style="padding:28px 34px;background:#101110;color:#ffffff"><div style="font-size:24px;font-weight:800;letter-spacing:.08em"><span style="color:#ff4f0b">A</span>RETÉ</div><div style="margin-top:4px;font-size:10px;letter-spacing:.38em;color:#c4cbcd">LEAD</div></td></tr><tr><td style="padding:38px 34px">${content}</td></tr><tr><td style="padding:22px 34px;background:#f8f6f0;color:#686b66;font-size:12px;line-height:1.6">ARETE Leadership &amp; Business Consulting<br>Mindanao, Philippines</td></tr></table></td></tr></table></body></html>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return Response.json({ message: "Online inquiries are being finalized. Please try again shortly." }, { status: 503 });
  }

  let body: Inquiry;
  try {
    body = (await request.json()) as Inquiry;
  } catch {
    return Response.json({ message: "Please check the form and try again." }, { status: 400 });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 30);
  const organization = clean(body.organization, 140);
  const message = clean(body.message, 3000);
  const website = clean(body.website, 200);
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;

  if (website || Date.now() - startedAt < 1800) {
    return Response.json({ message: "Thank you. Your inquiry has been received." });
  }

  if (!name || !emailPattern.test(email) || !phonePattern.test(phone) || !organization || message.length < 10) {
    return Response.json({ message: "Please complete every field with a valid work email, contact number, and a little detail about your inquiry." }, { status: 400 });
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    organization: escapeHtml(organization),
    message: escapeHtml(message).replace(/\n/g, "<br>"),
  };
  const inquiryId = createHash("sha256").update(`${email}|${phone}|${organization}|${message}`).digest("hex").slice(0, 24);
  const internalHtml = emailShell(`<p style="margin:0 0 10px;color:#ff4f0b;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">New website inquiry</p><h1 style="margin:0 0 26px;font-size:30px;line-height:1.15">${safe.name} would like to start a conversation.</h1><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.6"><tr><td style="width:120px;padding:8px 0;color:#70736e">Email</td><td style="padding:8px 0"><a href="mailto:${safe.email}" style="color:#101110">${safe.email}</a></td></tr><tr><td style="padding:8px 0;color:#70736e">Contact no.</td><td style="padding:8px 0"><a href="tel:${safe.phone}" style="color:#101110">${safe.phone}</a></td></tr><tr><td style="padding:8px 0;color:#70736e">Organization</td><td style="padding:8px 0">${safe.organization}</td></tr></table><div style="margin-top:24px;padding:22px;background:#f0ede5;border-left:4px solid #ff4f0b;font-size:15px;line-height:1.7">${safe.message}</div>`, `New ARETE inquiry from ${name}`);
  const confirmationHtml = emailShell(`<p style="margin:0 0 10px;color:#ff4f0b;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">Inquiry received</p><h1 style="margin:0 0 22px;font-size:32px;line-height:1.15">Thank you, ${safe.name}.</h1><p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#50534f">Your message has reached ARETE. We’ll review what you shared and reply within two business days.</p><p style="margin:0;font-size:16px;line-height:1.7;color:#50534f">We look forward to learning more about what you’re building.</p>`, "Your ARETE inquiry has been received");

  const response = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `arete-inquiry/${inquiryId}`,
    },
    body: JSON.stringify([
      { from, to: [to], reply_to: email, subject: `New ARETE inquiry — ${name}, ${organization}`, html: internalHtml, text: `New ARETE inquiry\n\nName: ${name}\nEmail: ${email}\nContact no.: ${phone}\nOrganization: ${organization}\n\n${message}` },
      { from, to: [email], reply_to: to, subject: "We received your ARETE inquiry", html: confirmationHtml, text: `Thank you, ${name}. Your message has reached ARETE. We’ll review what you shared and reply within two business days.` },
    ]),
  });

  if (!response.ok) {
    console.error("Resend contact delivery failed", response.status);
    return Response.json({ message: "We couldn’t send your inquiry right now. Please try again in a few minutes." }, { status: 502 });
  }

  return Response.json({ message: "Inquiry sent." });
}
