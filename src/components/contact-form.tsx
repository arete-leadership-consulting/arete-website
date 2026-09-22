"use client";

import { FormEvent, useRef, useState } from "react";

type Status = { tone: "idle" | "success" | "error"; message: string };

export function ContactForm({ defaultMessage = "" }: { defaultMessage?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [startedAt] = useState(() => Date.now());
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<Status>({ tone: "idle", message: "We’ll reply to your work email within two business days." });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setStatus({ tone: "idle", message: "Sending your inquiry…" });

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, startedAt }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) throw new Error(result.message || "We couldn’t send your inquiry.");

      formRef.current?.reset();
      setStatus({ tone: "success", message: "Thank you. Your message has been received. We’ll review what you shared and respond within two business days." });
    } catch (error) {
      setStatus({ tone: "error", message: error instanceof Error ? error.message : "We couldn’t send your inquiry. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form ref={formRef} className="contact-form" aria-describedby="form-status" onSubmit={handleSubmit}>
      <label>Name<input type="text" name="name" autoComplete="name" maxLength={100} required /></label>
      <label>Work email<input type="email" name="email" autoComplete="email" maxLength={254} required /></label>
      <label>Organization<input type="text" name="organization" autoComplete="organization" maxLength={140} required /></label>
      <label>What would you like to work on?<textarea name="message" rows={4} maxLength={3000} defaultValue={defaultMessage} required /></label>
      <label className="form-trap" aria-hidden="true">Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      <button type="submit" disabled={pending}>{pending ? "Sending…" : "Start a conversation"} <span>↗</span></button>
      <p id="form-status" className={`form-status form-status-${status.tone}`} aria-live="polite">{status.message}</p>
    </form>
  );
}
