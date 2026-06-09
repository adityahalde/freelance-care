"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, DollarSign, ExternalLink, Film, Calendar, ArrowLeft } from "lucide-react";

type Profile = {
  id: string;
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

type User = {
  id: string;
  name: string;
  avatar: string | null;
  freelancerProfile: Profile | null;
};

const serviceLabels: Record<string, string> = {
  cameraman: "Cameraman",
  video_editor: "Video Editor",
  both: "Cameraman & Video Editor",
};

export default function FreelancerProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/freelancers/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="card h-96 animate-pulse" />
      </div>
    );
  }

  if (!user?.freelancerProfile) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-surface-400">Freelancer not found.</p>
        <Link href="/browse" className="mt-4 inline-block text-brand-400 hover:underline">
          Browse freelancers
        </Link>
      </div>
    );
  }

  const profile = user.freelancerProfile;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/browse"
        className="mb-6 inline-flex items-center gap-2 text-sm text-surface-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to list
      </Link>

      <div className="card overflow-hidden">
        <div className="border-b border-surface-200/50 bg-surface-800/50 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-3xl font-bold text-brand-400">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="mt-1 text-brand-400 font-medium">
                {serviceLabels[profile.services] ?? profile.services}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-surface-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile.city}
                </span>
                {profile.hourlyRate != null && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    ₹{profile.hourlyRate} / hour
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Film className="h-4 w-4" />
                  {profile.experience} experience
                </span>
              </div>
            </div>
            <Link
              href={`/book/${user.id}`}
              className="btn-primary inline-flex shrink-0 items-center gap-2"
            >
              <Calendar className="h-5 w-5" />
              Book for event
            </Link>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-white">About</h2>
            <p className="mt-2 text-surface-300 whitespace-pre-wrap">{profile.bio}</p>
          </section>

          {profile.skills && (
            <section>
              <h2 className="text-lg font-semibold text-white">Skills</h2>
              <p className="mt-2 text-surface-300">{profile.skills}</p>
            </section>
          )}

          {profile.equipment && (
            <section>
              <h2 className="text-lg font-semibold text-white">Equipment</h2>
              <p className="mt-2 text-surface-300">{profile.equipment}</p>
            </section>
          )}

          <section className="flex flex-wrap gap-4">
            {profile.portfolioUrl && (
              <a
                href={profile.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Portfolio
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {profile.sampleWorkUrl && (
              <a
                href={profile.sampleWorkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Sample work
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
