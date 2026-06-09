import Link from "next/link";
import { Camera, Film, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-surface-200/30 bg-gradient-to-b from-surface-900 via-surface-900 to-brand-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.15),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Book pro{" "}
              <span className="text-brand-400">cameramen</span>
              {" "}&{" "}
              <span className="text-brand-400">video editors</span>
              {" "}for your event
            </h1>
            <p className="mt-6 text-lg text-surface-300">
              From weddings to corporate shoots and music videos — find and hire vetted
              freelancers in minutes. Create your profile as a freelancer or book the best for your next project.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/browse" className="btn-primary inline-flex gap-2 text-base">
                Find Freelancers
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/register" className="btn-secondary inline-flex text-base">
                Join as Freelancer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">
          How it works
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div className="card p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
              <Camera className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold text-white">Browse profiles</h3>
            <p className="mt-2 text-sm text-surface-300">
              Filter by service (cameraman / video editor), location, and experience. View portfolios and rates.
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold text-white">Book a pro</h3>
            <p className="mt-2 text-sm text-surface-300">
              Send a booking request with your event type and date. The freelancer accepts or declines.
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
              <Film className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold text-white">Get it done</h3>
            <p className="mt-2 text-sm text-surface-300">
              Work together on the day. Mark the booking complete and leave your project in expert hands.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-surface-200/30 bg-surface-800/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">
            Why FreelanceCare?
          </h2>
          <ul className="mx-auto mt-10 flex max-w-2xl flex-col gap-4">
            {[
              "Only cameramen and video editors — no generic gigs, just your niche.",
              "Clear profiles with experience, portfolio links, and hourly rates.",
              "Simple booking flow: request → accept → complete.",
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-surface-200">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link href="/register" className="btn-primary">
              Get started — it&apos;s free
            </Link>
          </p>
        </div>
      </section>

      <footer className="border-t border-surface-200/30 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-surface-400">
          © {new Date().getFullYear()} FreelanceCare. Book cameramen and video editors for events.
        </div>
      </footer>
    </div>
  );
}
