"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-white">Log in</h1>
      <p className="mt-2 text-surface-400">Welcome back. Sign in to your account.</p>

      <form onSubmit={submit} className="card mt-8 space-y-6 p-6" suppressHydrationWarning>
        {error && (
          <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
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
            suppressHydrationWarning
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-surface-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field mt-1"
            suppressHydrationWarning
          />
        </div>
        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-sm text-brand-400 hover:underline">
            Forgot password?
          </Link>
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading} suppressHydrationWarning>
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-center text-sm text-surface-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-brand-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
