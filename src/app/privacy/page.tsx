import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageShell } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How ARETE collects, uses, protects, and retains personal information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PageShell>
    <PageHero eyebrow="Privacy notice" index="06" title={<>Your information deserves <em>clear stewardship.</em></>} intro="This notice explains how ARETE handles personal information submitted through this website." />
    <section className="legal-page section">
      <p className="eyebrow">Effective September 22, 2026</p>
      <div className="legal-copy">
        <section><h2>Information we collect</h2><p>When you use the inquiry form, ARETE collects the name, work email address, organization, and message you choose to provide. Basic technical information may also be processed by our hosting and security providers to deliver and protect the website.</p></section>
        <section><h2>Why we use it</h2><p>We use inquiry information to understand your request, respond to you, evaluate a potential engagement, maintain appropriate business records, and protect the website from abuse. We do not sell personal information or use inquiry details for unrelated marketing without an appropriate basis.</p></section>
        <section><h2>Who may process it</h2><p>Information may be processed by authorized ARETE personnel and service providers needed to operate the website and deliver email, including Vercel for website hosting and Resend for inquiry delivery. These providers process information on ARETE’s behalf under their respective safeguards and terms.</p></section>
        <section><h2>Retention and protection</h2><p>We retain information only for as long as reasonably necessary to respond to the inquiry, manage a resulting business relationship, meet legitimate recordkeeping needs, and comply with applicable obligations. We use reasonable organizational and technical safeguards, although no online transmission or storage method can guarantee absolute security.</p></section>
        <section><h2>Your choices and rights</h2><p>You may ask about the personal information ARETE holds about you or request appropriate access, correction, deletion, or restriction, subject to applicable law and legitimate recordkeeping requirements. You may also raise a concern about how your information is handled.</p></section>
        <section><h2>Contact</h2><p>For privacy questions or requests, contact ARETE at <a href="mailto:areteleadershipandconsulting@gmail.com">areteleadershipandconsulting@gmail.com</a>. Please do not send sensitive personal information through the general inquiry form.</p></section>
        <p className="legal-note">This notice may be updated when our practices, providers, or legal obligations change. The effective date above identifies the current version.</p>
        <Link className="text-link" href="/work-with-arete">Return to the inquiry page <span>↗</span></Link>
      </div>
    </section>
  </PageShell>;
}
