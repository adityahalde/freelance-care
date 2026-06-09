"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "freelancer">("client");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }
      if (role === "freelancer") {
        router.push("/profile");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-white">Create account</h1>
      <p className="mt-2 text-surface-400">Join as a client or as a freelancer.</p>

      <form onSubmit={submit} className="card mt-8 space-y-6 p-6" suppressHydrationWarning>
        {error && (
          <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-surface-300">
            Full name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field mt-1"
            placeholder="John Doe"
            suppressHydrationWarning
          />
        </div>
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field mt-1"
            placeholder="At least 6 characters"
            suppressHydrationWarning
          />
        </div>
        <div>
          <span className="block text-sm font-medium text-surface-300 mb-2">I want to</span>
          <div className="flex gap-4">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="role"
                checked={role === "client"}
                onChange={() => setRole("client")}
                className="h-4 w-4 border-surface-200 text-brand-500 focus:ring-brand-500"
                suppressHydrationWarning
              />
              <span className="text-surface-200">Book freelancers</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="role"
                checked={role === "freelancer"}
                onChange={() => setRole("freelancer")}
                className="h-4 w-4 border-surface-200 text-brand-500 focus:ring-brand-500"
                suppressHydrationWarning
              />
              <span className="text-surface-200">Work as freelancer</span>
            </label>
          </div>
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading} suppressHydrationWarning>
          {loading ? "Creating account…" : "Sign up"}
        </button>
        <p className="text-center text-sm text-surface-400">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-400 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
