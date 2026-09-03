import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Estimate-request handler.
 *
 * Talks to Resend's REST API directly with fetch — no SDK dependency to keep
 * in sync. Env vars come from the Vercel Resend integration:
 *   RESEND_API_KEY   provisioned by the integration
 *   ESTIMATE_TO      inbox that receives requests (defaults to Nanci's)
 *   ESTIMATE_FROM    verified sender; onboarding@resend.dev works untested
 */

const MAX = { name: 120, phone: 40, email: 160, service: 80, message: 2000 };

type Payload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  /** Honeypot — real users never fill this. */
  company?: unknown;
};

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Silently accept bot submissions so they don't retry with a new strategy.
  if (clean(body.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const phone = clean(body.phone, MAX.phone);
  const email = clean(body.email, MAX.email);
  const service = clean(body.service, MAX.service);
  const message = clean(body.message, MAX.message);

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Please include your name and a phone number." },
      { status: 400 },
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[estimate] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "We can't send messages right now — please call instead." },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "—"],
    ["Service", service || "—"],
    ["Details", message || "—"],
  ];

  const html = `
    <h2 style="font-family:sans-serif">New estimate request</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr>
               <td style="padding:6px 14px 6px 0;vertical-align:top"><strong>${k}</strong></td>
               <td style="padding:6px 0">${escapeHtml(v).replace(/\n/g, "<br>")}</td>
             </tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;color:#666;font-size:12px">
      Sent from the ${escapeHtml(site.name)} website.
    </p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ESTIMATE_FROM ?? "onboarding@resend.dev",
        to: [process.env.ESTIMATE_TO ?? site.email],
        subject: `Estimate request — ${name}`,
        html,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
        ...(email ? { reply_to: email } : {}),
      }),
    });

    if (!res.ok) {
      // Log the provider's reason, but never leak it to the visitor.
      console.error("[estimate] Resend rejected:", res.status, await res.text());
      return NextResponse.json(
        { error: "We couldn't send that — please call instead." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[estimate] Network failure:", err);
    return NextResponse.json(
      { error: "We couldn't send that — please call instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
