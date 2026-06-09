"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, DollarSign, Filter } from "lucide-react";

type FreelancerProfile = {
  id: string;
  bio: string;
  services: string;
  experience: string;
  city: string;
  hourlyRate: number | null;
  portfolioUrl: string | null;
  skills: string | null;
};

type Freelancer = {
  id: string;
  name: string;
  avatar: string | null;
  freelancerProfile: FreelancerProfile | null;
};

const serviceLabels: Record<string, string> = {
  cameraman: "Cameraman",
  video_editor: "Video Editor",
  both: "Camera & Edit",
};

export default function BrowsePage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string>("");
  const [service, setService] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (service) params.set("service", service);
    if (city) params.set("city", city);
    setLoading(true);
    setApiError("");
    fetch(`/api/freelancers?${params}`)
      .then(async (r) => {
        const data = await r.json().catch(() => null);
        if (!r.ok) {
          setFreelancers([]);
          setApiError((data && (data.error as string)) || "Failed to load freelancers");
          return;
        }
        if (Array.isArray(data)) {
          setFreelancers(data);
        } else {
          setFreelancers([]);
          setApiError("Unexpected response from server");
        }
      })
      .catch(() => {
        setFreelancers([]);
        setApiError("Failed to load freelancers");
      })
      .finally(() => setLoading(false));
  }, [service, city]);

  const list = Array.isArray(freelancers) ? freelancers : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-white">Find Freelancers</h1>
      <p className="mt-2 text-surface-300">
        Browse cameramen and video editors. Filter by service and location.
      </p>

      <div className="card mt-8 flex flex-wrap items-end gap-4 p-4">
        <div className="flex items-center gap-2 text-surface-300">
          <Filter className="h-5 w-5" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="block">
            <span className="mb-1 block text-xs text-surface-400">Service</span>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="input-field w-40"
              suppressHydrationWarning
            >
              <option value="">All</option>
              <option value="cameraman">Cameraman</option>
              <option value="video_editor">Video Editor</option>
              <option value="both">Both</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-surface-400">City</span>
            <input
              type="text"
              placeholder="e.g. Mumbai"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-field w-48"
              suppressHydrationWarning
            />
          </label>
        </div>
      </div>

      {apiError && (
        <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {apiError}
        </div>
      )}

      {loading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="card h-64 animate-pulse p-6" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="card mt-8 p-12 text-center">
          <p className="text-surface-400">No freelancers found. Try different filters or check back later.</p>
          <Link href="/register" className="mt-4 inline-block text-brand-400 hover:underline">
            Become the first freelancer →
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((f) => {
            const profile = f.freelancerProfile;
            if (!profile) return null;
            return (
              <Link
                key={f.id}
                href={`/freelancer/${f.id}`}
                className="card block p-6 transition hover:border-brand-500/50 hover:bg-surface-800/80"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-2xl font-bold text-brand-400">
                    {f.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-white">{f.name}</h2>
                    <span className="mt-1 inline-block rounded-full bg-brand-500/20 px-2 py-0.5 text-xs font-medium text-brand-400">
                      {serviceLabels[profile.services] ?? profile.services}
                    </span>
                    <p className="mt-2 line-clamp-2 text-sm text-surface-300">{profile.bio}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-surface-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {profile.city}
                      </span>
                      {profile.hourlyRate != null && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5" />
                          ₹{profile.hourlyRate}/hr
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
