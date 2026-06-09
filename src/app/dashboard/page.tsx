"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, User, Film } from "lucide-react";

type Booking = {
  id: string;
  eventType: string;
  eventDate: string;
  message: string | null;
  status: string;
  createdAt: string;
  freelancer?: { id: string; name: string };
  client?: { id: string; name: string; email: string };
};

type DashboardData = {
  asClient: Booking[];
  asFreelancer: Booking[];
};

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/bookings").then((r) => r.json()),
    ])
      .then(([auth, bookings]) => {
        if (!auth.user) {
          router.replace("/login");
          return;
        }
        setUser(auth.user);
        setData(bookings);
      })
      .catch(() => router.replace("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="card h-64 animate-pulse" />
      </div>
    );
  }

  const statusColor: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-400",
    accepted: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
    completed: "bg-brand-500/20 text-brand-400",
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-surface-400">Hello, {user.name}. Here are your bookings.</p>

      {user.role === "freelancer" && (
        <Link href="/profile" className="btn-secondary mt-6 inline-flex">
          <User className="mr-2 h-4 w-4" />
          Edit my profile
        </Link>
      )}

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Calendar className="h-5 w-5" />
          Bookings I made
        </h2>
        {data?.asClient?.length ? (
          <ul className="mt-4 space-y-4">
            {data.asClient.map((b) => (
              <li key={b.id} className="card flex flex-wrap items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium text-white">{b.eventType}</p>
                  <p className="text-sm text-surface-400">
                    with {b.freelancer?.name ?? "Freelancer"} ·{" "}
                    {new Date(b.eventDate).toLocaleDateString()}
                  </p>
                  {b.message && (
                    <p className="mt-1 text-sm text-surface-300 line-clamp-2">{b.message}</p>
                  )}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[b.status] ?? "bg-surface-200 text-surface-400"}`}
                >
                  {b.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-surface-400">No bookings yet. <Link href="/browse" className="text-brand-400 hover:underline">Find freelancers</Link>.</p>
        )}
      </section>

      {user.role === "freelancer" && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <Film className="h-5 w-5" />
            Incoming requests
          </h2>
          {data?.asFreelancer?.length ? (
            <ul className="mt-4 space-y-4">
              {data.asFreelancer.map((b) => (
                <li key={b.id} className="card flex flex-wrap items-center justify-between gap-4 p-4">
                  <div>
                    <p className="font-medium text-white">{b.eventType}</p>
                    <p className="text-sm text-surface-400">
                      from {b.client?.name ?? "Client"} ·{" "}
                      {new Date(b.eventDate).toLocaleDateString()}
                    </p>
                    {b.message && (
                      <p className="mt-1 text-sm text-surface-300 line-clamp-2">{b.message}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[b.status] ?? "bg-surface-200 text-surface-400"}`}
                    >
                      {b.status}
                    </span>
                    {b.status === "pending" && (
                      <AcceptRejectButtons bookingId={b.id} />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-surface-400">No incoming requests yet.</p>
          )}
        </section>
      )}
    </div>
  );
}

function AcceptRejectButtons({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = async (status: "accepted" | "rejected") => {
    setLoading(true);
    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setDone(true);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  if (done) return null;

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => update("accepted")}
        disabled={loading}
        className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-500 disabled:opacity-50"
      >
        Accept
      </button>
      <button
        type="button"
        onClick={() => update("rejected")}
        disabled={loading}
        className="rounded-lg bg-red-600/80 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-500 disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
}
