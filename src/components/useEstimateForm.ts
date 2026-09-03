"use client";

import { useState, type FormEvent } from "react";

export type Status = "idle" | "sending" | "sent" | "error";

/**
 * Submit logic for the estimate form, shared by both visual themes so the
 * request/validation path only exists once.
 */
export function useEstimateForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(new FormData(form)) as Record<string, string>,
        ),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Something went wrong. Please call instead.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError("Couldn't reach us — check your connection, or call instead.");
      setStatus("error");
    }
  }

  return { status, error, onSubmit, reset: () => setStatus("idle") };
}
