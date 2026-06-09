"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetUrl, setResetUrl] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unable to start password reset.");
        return;
      }

      setStatus(data.message || "If an account exists, a reset link was prepared.");
      setResetUrl(data.resetUrl || "");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-white">Forgot password?</h1>
      <p className="mt-2 text-surface-400">Enter your email and we&apos;ll prepare a password reset link for you.</p>

      <form onSubmit={submit} className="card mt-8 space-y-6 p-6">
        {error && (
          <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
        )}
        {status && (
          <div className="rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">{status}</div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-surface-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field mt-1"
            placeholder="you@example.com"
          />
        </div>

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Preparing reset…" : "Send reset link"}
        </button>

        {resetUrl && (
          <div className="rounded-lg border border-brand-400/30 bg-brand-400/10 p-3 text-sm text-surface-300">
            <p className="mb-2 font-medium">Reset link</p>
            <a href={resetUrl} className="break-all text-brand-400 underline">
              {resetUrl}
            </a>
          </div>
        )}

        <p className="text-center text-sm text-surface-400">
          <Link href="/login" className="text-brand-400 hover:underline">
            Back to sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
