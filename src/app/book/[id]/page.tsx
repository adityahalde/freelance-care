"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const freelancerId = params.id as string;
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [freelancerName, setFreelancerName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setIsLoggedIn(!!data.user))
      .catch(() => setIsLoggedIn(false));
  }, []);

  useEffect(() => {
    fetch(`/api/freelancers/${freelancerId}`)
      .then((r) => r.json())
      .then((data) => setFreelancerName(data.name ?? null))
      .catch(() => setFreelancerName(null));
  }, [freelancerId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          freelancerId,
          eventType,
          eventDate: new Date(eventDate).toISOString(),
          message: message || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        setError(data.error || "Failed to send booking request");
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
    <div className="mx-auto max-w-md px-4 py-8">
      <Link
        href={`/freelancer/${freelancerId}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-surface-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </Link>

      <h1 className="text-2xl font-bold text-white">Book for your event</h1>
      {freelancerName && (
        <p className="mt-1 text-surface-400">Sending request to {freelancerName}</p>
      )}

      <form onSubmit={submit} className="card mt-8 space-y-6 p-6" suppressHydrationWarning>
        {error && (
          <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-surface-300">
            Event type
          </label>
          <input
            id="eventType"
            type="text"
            required
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="input-field mt-1"
            placeholder="e.g. Wedding, Corporate shoot, Music video"
            suppressHydrationWarning
          />
        </div>
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-surface-300">
            Event date
          </label>
          <input
            id="eventDate"
            type="datetime-local"
            required
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="input-field mt-1"
            suppressHydrationWarning
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-surface-300">
            Message (optional)
          </label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-field mt-1 resize-none"
            placeholder="Brief description, location, or special requirements"
            suppressHydrationWarning
          />
        </div>
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading || isLoggedIn === false}
        >
          {loading ? "Sending…" : isLoggedIn === false ? "Log in to book" : "Send booking request"}
        </button>
      </form>

      {isLoggedIn === false && (
        <p className="mt-6 text-center text-sm text-surface-400">
          You must be logged in to book.{" "}
          <Link href="/login" className="text-brand-400 hover:underline">
            Log in
          </Link>{" "}
          or{" "}
          <Link href="/register" className="text-brand-400 hover:underline">
            Sign up
          </Link>
          .
        </p>
      )}
    </div>
  );
}
