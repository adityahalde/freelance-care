"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

type Profile = {
  id?: string;
  bio: string;
  services: string;
  experience: string;
  city: string;
  hourlyRate: number | null;
  portfolioUrl: string | null;
  sampleWorkUrl: string | null;
  skills: string | null;
  equipment: string | null;
};

const emptyProfile: Profile = {
  bio: "",
  services: "cameraman",
  experience: "",
  city: "",
  hourlyRate: null,
  portfolioUrl: null,
  sampleWorkUrl: null,
  skills: null,
  equipment: null,
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ role: string } | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/profile").then((r) => r.json()),
    ]).then(([auth, profileRes]) => {
      if (!auth.user) {
        router.replace("/login");
        return;
      }
      if (auth.user.role !== "freelancer") {
        router.replace("/dashboard");
        return;
      }
      setUser(auth.user);
      if (profileRes.profile) {
        setProfile({
          bio: profileRes.profile.bio ?? "",
          services: profileRes.profile.services ?? "cameraman",
          experience: profileRes.profile.experience ?? "",
          city: profileRes.profile.city ?? "",
          hourlyRate: profileRes.profile.hourlyRate ?? null,
          portfolioUrl: profileRes.profile.portfolioUrl ?? null,
          sampleWorkUrl: profileRes.profile.sampleWorkUrl ?? null,
          skills: profileRes.profile.skills ?? null,
          equipment: profileRes.profile.equipment ?? null,
        });
      }
    }).catch(() => router.replace("/login")).finally(() => setLoading(false));
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...profile,
          portfolioUrl: profile.portfolioUrl || undefined,
          sampleWorkUrl: profile.sampleWorkUrl || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save");
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="card h-96 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-white">My freelancer profile</h1>
      <p className="mt-1 text-surface-400">This is what clients see. Add a portfolio link to get more bookings.</p>

      <form onSubmit={submit} className="card mt-8 space-y-6 p-6" suppressHydrationWarning>
        {error && (
          <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-surface-300">Service type</label>
          <select
            value={profile.services}
            onChange={(e) => setProfile((p) => ({ ...p, services: e.target.value }))}
            className="input-field mt-1"
            suppressHydrationWarning
          >
            <option value="cameraman">Cameraman</option>
            <option value="video_editor">Video Editor</option>
            <option value="both">Both (Camera & Edit)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300">Bio *</label>
          <textarea
            required
            rows={4}
            value={profile.bio}
            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            className="input-field mt-1 resize-none"
            placeholder="Introduce yourself, your style, and what kind of events you cover."
            suppressHydrationWarning
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-surface-300">Experience</label>
            <input
              type="text"
              value={profile.experience}
              onChange={(e) => setProfile((p) => ({ ...p, experience: e.target.value }))}
              className="input-field mt-1"
              placeholder="e.g. 5 years"
              suppressHydrationWarning
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-300">City</label>
            <input
              type="text"
              value={profile.city}
              onChange={(e) => setProfile((p) => ({ ...p, city: e.target.value }))}
              className="input-field mt-1"
              placeholder="e.g. Mumbai"
              suppressHydrationWarning
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300">Hourly rate (₹)</label>
          <input
            type="number"
            min={0}
            step={100}
            value={profile.hourlyRate ?? ""}
            onChange={(e) =>
              setProfile((p) => ({
                ...p,
                hourlyRate: e.target.value === "" ? null : Number(e.target.value),
              }))
            }
            className="input-field mt-1"
            placeholder="Optional"
            suppressHydrationWarning
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300">Portfolio URL</label>
          <input
            type="url"
            value={profile.portfolioUrl ?? ""}
            onChange={(e) => setProfile((p) => ({ ...p, portfolioUrl: e.target.value || null }))}
            className="input-field mt-1"
            placeholder="https://..."
            suppressHydrationWarning
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300">Sample work URL</label>
          <input
            type="url"
            value={profile.sampleWorkUrl ?? ""}
            onChange={(e) => setProfile((p) => ({ ...p, sampleWorkUrl: e.target.value || null }))}
            className="input-field mt-1"
            placeholder="https://..."
            suppressHydrationWarning
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300">Skills</label>
          <input
            type="text"
            value={profile.skills ?? ""}
            onChange={(e) => setProfile((p) => ({ ...p, skills: e.target.value || null }))}
            className="input-field mt-1"
            placeholder="e.g. 4K, drone, color grading"
            suppressHydrationWarning
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300">Equipment</label>
          <textarea
            rows={2}
            value={profile.equipment ?? ""}
            onChange={(e) => setProfile((p) => ({ ...p, equipment: e.target.value || null }))}
            className="input-field mt-1 resize-none"
            placeholder="Cameras, lenses, editing setup..."
            suppressHydrationWarning
          />
        </div>

        <button type="submit" className="btn-primary inline-flex items-center gap-2" disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : "Save profile"}
        </button>
      </form>
    </div>
  );
}
