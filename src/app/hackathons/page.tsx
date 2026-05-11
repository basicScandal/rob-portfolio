import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Hackathons",
  description:
    "NEBULA:FOG. SF's AI x Security hackathon series. Co-founded and organized by Rob Ragan.",
};

const events = [
  {
    name: "NEBULA:FOG 2026",
    date: "March 14, 2026",
    location: "San Francisco, CA",
    description:
      "Second installment. 100 builders, $5K+ in prizes plus partner bounties. Four challenge tracks spanning offensive AI, defensive architecture, privacy-preserving trust, and experimental attack surfaces.",
    stats: { builders: "100", projects: "25", tracks: "4" },
    link: "https://nebulafog.ai",
  },
  {
    name: "NEBULA:FOG:PRIME",
    date: "January 25, 2025",
    location: "Future House, San Francisco, CA",
    description:
      "The first one. 120+ builders showed up and shipped 24 projects in a single day. Workshops on coding with AI, a panel with security leaders from OpenAI, Bugcrowd, and Dreadnode, then lightning demos and awards.",
    stats: { builders: "120+", projects: "24", tracks: "4" },
    panelists: [
      "Ariel Herbert-Voss (RunSybil, first security hire at OpenAI)",
      "Will Pearce (CEO, Dreadnode.io)",
      "Casey Ellis (Founder, Bugcrowd)",
    ],
  },
];

const challengeTracks = [
  {
    name: "Breaking the Chain of Trust",
    description:
      "Exploiting autonomous agents. Manipulating decision systems. Compromising AI-to-AI relationships.",
    index: "T01",
  },
  {
    name: "Guarding the Protocol",
    description:
      "Building detection systems. Hardening architectures. Deploying self-healing defenses.",
    index: "T02",
  },
  {
    name: "Trust Without Compromise",
    description:
      "Privacy-preserving verification and trust anchors. Zero-knowledge proofs for the AI age.",
    index: "T03",
  },
  {
    name: "Writing Your Own Protocol",
    description:
      "Novel attack surfaces. Experimental defenses. AI security tools that don't exist yet.",
    index: "T04",
  },
];

export default function HackathonsPage() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <span className="section-number">&sect; 06 &mdash; Hackathons</span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold mt-3 text-fg">
          NEBULA:FOG
        </h1>
        <p className="mt-4 text-lg text-fg-muted max-w-2xl">
          The collision point where AI and security worlds meet. I co-founded
          this hackathon series in San Francisco because I wanted a room full of
          builders who actually break and defend AI systems, not just talk about
          it.
        </p>

        {/* Hero Link */}
        <div className="mt-6">
          <a
            href="https://nebulafog.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium"
          >
            nebulafog.ai <ExternalLink size={14} />
          </a>
        </div>

        {/* Co-organizers */}
        <div className="mt-12 p-6 border border-border rounded-lg">
          <span className="font-meta text-fg-faint">Co-organizers</span>
          <div className="flex flex-wrap gap-6 mt-3">
            {[
              {
                name: "Rob Ragan",
                role: "Principal Technology Strategist, Bishop Fox",
              },
              {
                name: "Gabriel Bernadett-Shapiro",
                role: "Distinguished AI Research Scientist, SentinelOne",
              },
              {
                name: "Gwenyth Castro",
                role: "BINARLY",
              },
            ].map((person) => (
              <div key={person.name}>
                <p className="text-sm font-medium text-fg">{person.name}</p>
                <p className="font-meta text-fg-faint mt-0.5">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Story */}
        <section className="mt-16">
          <span className="section-number">
            &sect; 06.1 &mdash; The Story
          </span>
          <h2 className="font-editorial text-2xl mt-2 mb-6 text-fg">
            Why This Exists
          </h2>
          <div className="prose prose-lg max-w-none">
            <p>
              AI security has a gap. On one side you&apos;ve got researchers
              publishing papers about prompt injection. On the other side
              you&apos;ve got builders shipping AI products as fast as they can.
              Almost nobody is in a room together actually building offensive and
              defensive tools for these systems.
            </p>
            <p>
              NEBULA:FOG fills that gap. Everyone builds. Everyone demos. No
              spectators. We bring together offensive security researchers, AI
              engineers, and builders who want to push on the real problems:
              breaking autonomous agents, hardening AI architectures, building
              trust systems that actually work under adversarial conditions.
            </p>
            <p>
              The first event shipped 24 projects in one day. That&apos;s the
              energy we&apos;re after.
            </p>
          </div>
        </section>

        {/* Challenge Tracks */}
        <section className="mt-16">
          <span className="section-number">
            &sect; 06.2 &mdash; Challenge Tracks
          </span>
          <h2 className="font-editorial text-2xl mt-2 mb-8 text-fg">
            What Gets Built
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challengeTracks.map((track) => (
              <div key={track.name} className="card-editorial rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-editorial text-lg text-fg">
                    {track.name}
                  </h3>
                  <span className="font-meta text-fg-faint">{track.index}</span>
                </div>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {track.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Events Timeline */}
        <section className="mt-16">
          <span className="section-number">
            &sect; 06.3 &mdash; Events
          </span>
          <h2 className="font-editorial text-2xl mt-2 mb-8 text-fg">
            Event History
          </h2>
          <div className="space-y-8">
            {events.map((event, i) => (
              <div key={event.name} className="card-editorial rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-editorial text-xl text-fg">
                      {event.name}
                    </h3>
                    <p className="font-meta text-accent mt-1">{event.date}</p>
                    <p className="font-meta text-fg-faint">{event.location}</p>
                  </div>
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg-faint hover:text-accent transition-colors"
                      aria-label={`Visit ${event.name}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {event.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-dashed border-border">
                  <div>
                    <p className="font-editorial text-xl font-bold text-fg">
                      {event.stats.builders}
                    </p>
                    <p className="font-meta text-fg-faint">Builders</p>
                  </div>
                  <div>
                    <p className="font-editorial text-xl font-bold text-fg">
                      {event.stats.projects}
                    </p>
                    <p className="font-meta text-fg-faint">Projects</p>
                  </div>
                  <div>
                    <p className="font-editorial text-xl font-bold text-fg">
                      {event.stats.tracks}
                    </p>
                    <p className="font-meta text-fg-faint">Tracks</p>
                  </div>
                </div>

                {/* Panelists */}
                {event.panelists && (
                  <div className="mt-4 pt-4 border-t border-dashed border-border">
                    <span className="font-meta text-fg-faint">Panel</span>
                    <ul className="mt-2 space-y-1">
                      {event.panelists.map((p) => (
                        <li
                          key={p}
                          className="text-sm text-fg-muted flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="mt-16">
          <span className="section-number">
            &sect; 06.4 &mdash; Gallery
          </span>
          <h2 className="font-editorial text-2xl mt-2 mb-4 text-fg">
            Demo Gallery
          </h2>
          <div className="card-editorial rounded-lg p-6">
            <p className="text-fg-muted leading-relaxed">
              40 teams built at the intersection of AI and security across two
              events. 15 projects at PRIME 2025, 25 at SINGULARITY 2026.
              Everything from autonomous agent exploits to self-healing defense
              systems to zero-knowledge trust protocols. Every team demoed live.
            </p>
            <a
              href="https://nebulafog.ai/gallery.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 font-meta text-accent hover:underline"
            >
              Browse all demos <ExternalLink size={12} />
            </a>
          </div>
        </section>

        {/* Upcoming */}
        <section className="mt-12">
          <div className="p-6 border border-dashed border-border rounded-lg text-center">
            <p className="font-editorial text-lg text-fg">
              NEBULA:FOG NOVA
            </p>
            <p className="text-sm text-fg-muted mt-2">
              Next event in the series. Details coming soon.
            </p>
            <a
              href="https://nebulafog.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 font-meta text-accent hover:underline"
            >
              Follow at nebulafog.ai <ExternalLink size={10} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
