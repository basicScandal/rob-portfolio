import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { stats, talks, projects, blogPosts } from "@/lib/data";
import robPhoto from "../../public/rob-ragan-2024.jpg";

function SectionHeader({
  number,
  title,
  href,
}: {
  number: string;
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <span className="section-number">&sect; {number}</span>
        <h2 className="font-editorial text-2xl sm:text-3xl mt-1 text-fg">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="font-meta text-accent hover:underline flex items-center gap-1"
        >
          View all <ArrowRight size={12} />
        </Link>
      )}
    </div>
  );
}

function StatCard({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: string;
}) {
  return (
    <div className="text-center sm:text-left">
      <span className="font-meta text-fg-faint">
        {index}
      </span>
      <p className="font-editorial text-4xl sm:text-5xl font-bold text-fg mt-1">
        {value}
      </p>
      <p className="font-meta text-fg-muted mt-2">
        {label}
      </p>
    </div>
  );
}

function TerminalBlock() {
  return (
    <div className="terminal shadow-2xl">
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="ml-2 text-[10px] text-gray-500 font-mono">
          ~/nebulafog/arbiter
        </span>
      </div>
      <div className="p-4 sm:p-6 space-y-2 text-sm">
        <p>
          <span className="text-green-400">$</span>{" "}
          <span className="text-gray-300">
            python arbiter.py --mode live-judge
          </span>
        </p>
        <p className="text-amber-400 mt-3">
          [*] Arbiter v1.0 // AI Hackathon Judge
        </p>
        <p className="text-gray-400">
          [+] Gemini Live connected (camera + audio)
        </p>
        <p className="text-gray-400">
          [+] Scoring ensemble: Gemini + Claude + Groq
        </p>
        <p className="text-gray-500 text-xs mt-1">
          &gt; Demo 14/25 | Team: ghost_protocol
        </p>
        <p className="text-green-400 mt-3 text-xs leading-relaxed">
          SCORE: 8.7/10 | Innovation: 9 | Technical: 8
          <br />
          &quot;Clever use of tool-use sandboxing to
          <br />
          contain agent lateral movement...&quot;
        </p>
        <p className="mt-3">
          <span className="text-green-400">$</span>{" "}
          <span className="inline-block w-2 h-4 bg-amber-400 cursor-blink" />
        </p>
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  link,
  index,
}: {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  index: string;
}) {
  return (
    <div className="card-editorial rounded-lg overflow-hidden flex flex-col">
      {/* Color bar */}
      <div className="h-1 bg-gradient-to-r from-accent to-accent/50" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-editorial text-lg text-fg">
            {title}
          </h3>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-faint hover:text-accent transition-colors shrink-0 ml-2"
              aria-label={`View ${title}`}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
        <p className="text-sm text-fg-muted leading-relaxed flex-1">
          {description}
        </p>
        <div className="mt-4 pt-3 border-t border-dashed border-border flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-meta text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="font-meta text-fg-faint">
            {index}
          </span>
        </div>
      </div>
    </div>
  );
}

function TalkCard({
  year,
  conference,
  title,
  coPresenter,
  tags,
  index,
}: {
  year: string;
  conference: string;
  title: string;
  coPresenter?: string;
  tags: string[];
  index: string;
}) {
  return (
    <div className="card-editorial rounded-lg p-5">
      <div className="flex items-start justify-between mb-2">
        <span className="font-meta text-accent">
          {year}
        </span>
        <span className="font-meta text-fg-faint">
          {index}
        </span>
      </div>
      <p className="font-meta text-fg-muted mb-1">
        {conference}
      </p>
      <h3 className="font-editorial text-base text-fg leading-snug">
        {title}
      </h3>
      {coPresenter && (
        <p className="text-xs text-fg-faint mt-2">
          w/ {coPresenter}
        </p>
      )}
      <div className="flex gap-1.5 mt-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-meta text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function BlogCard({
  title,
  excerpt,
  date,
  tags,
  index,
}: {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  index: string;
}) {
  return (
    <div className="card-editorial rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-meta text-accent">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })}
        </span>
        <span className="font-meta text-fg-faint">
          {index}
        </span>
      </div>
      <h3 className="font-editorial text-lg text-fg mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-fg-muted leading-relaxed">
        {excerpt}
      </p>
      <div className="mt-4 pt-3 border-t border-dashed border-border flex items-center justify-between">
        <div className="flex gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-meta text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="font-meta text-accent">
          Soon &rarr;
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const featuredTalks = talks.slice(0, 3);

  return (
    <div className="grid-bg">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr] items-center">
          {/* Text */}
          <div className="animate-fade-in-up">
            <span className="section-number">&sect; 00 &mdash; Introduction</span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 text-fg leading-[1.1]">
              Applied Security
              <br />
              <span className="text-accent">
                Research Leader.
              </span>
              <br />
              Agentic Engineer.
            </h1>
            <p className="mt-6 text-lg text-fg-muted leading-relaxed max-w-xl">
              I&apos;m Rob Ragan, Principal Technology Strategist at{" "}
              <a
                href="https://bishopfox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Bishop Fox
              </a>
              . I lead a team of agentic engineers and I research and design
              cutting-edge offensive security agents that attack web
              applications and other systems. 15+ years of breaking things so
              they can be built back stronger.
            </p>
            <div className="flex gap-3 mt-8">
              <Link
                href="/projects"
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium"
              >
                View Research <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-fg hover:border-accent transition-colors"
              >
                About Me
              </Link>
            </div>
          </div>

          {/* Portrait */}
          <div className="animate-fade-in-up animate-delay-200 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="portrait-duotone w-64 h-72 sm:w-72 sm:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-accent/20 to-charcoal-light">
                <Image
                  src={robPhoto}
                  alt="Rob Ragan"
                  className="w-full h-full object-cover object-top"
                  priority
                  placeholder="blur"
                />
              </div>
              <div className="mt-3 text-center">
                <span className="font-mono text-[10px] text-fg-faint tracking-wider">
                  Plate I &middot; San Francisco, CA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatCard key={stat.index} {...stat} />
          ))}
        </div>
      </section>

      {/* ── Featured Project ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <SectionHeader number="01" title="Featured Research" />
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] items-start">
          <div>
            <span className="font-meta text-accent">
              Built for NEBULA:FOG 2026
            </span>
            <h3 className="font-editorial text-2xl mt-2 text-fg">
              Arbiter
            </h3>
            <p className="mt-3 text-fg-muted leading-relaxed">
              AI judge agent that watched 25 live hackathon demos in real time
              via Gemini Live API. Scores projects with a multi-model ensemble
              (Gemini + Claude + Groq), delivers commentary via Cartesia TTS,
              and defends itself against prompt injection attempts in 7
              languages. 1,451 tests passing.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Real-time camera + audio capture via Gemini Live API
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Multi-model scoring ensemble with outlier detection
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Prompt injection defense: regex + semantic classifier, 7 languages
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Cross-team deliberation with full demo memory
              </li>
            </ul>
            <a
              href="https://github.com/basicScandal/arbiter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 font-meta text-accent hover:underline"
            >
              View on GitHub <ExternalLink size={12} />
            </a>
          </div>
          <TerminalBlock />
        </div>
      </section>

      {/* ── NEBULA:FOG ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <SectionHeader
          number="02"
          title="NEBULA:FOG"
          href="/hackathons"
        />
        <div className="card-editorial rounded-lg p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="font-meta text-accent">
                Co-founder &amp; Organizer // San Francisco
              </span>
              <h3 className="font-editorial text-2xl mt-2 text-fg">
                AI x Security Hackathon Series
              </h3>
              <p className="mt-3 text-fg-muted leading-relaxed">
                I co-founded NEBULA:FOG because I wanted a room full of builders
                who actually break and defend AI systems, not just talk about it.
                120+ builders at our first event, 24 projects shipped in a single
                day. Everyone builds. Everyone demos. No spectators.
              </p>
              <div className="flex gap-6 mt-4">
                <div>
                  <p className="font-editorial text-2xl font-bold text-fg">
                    120+
                  </p>
                  <p className="font-meta text-fg-faint">Builders</p>
                </div>
                <div>
                  <p className="font-editorial text-2xl font-bold text-fg">
                    24
                  </p>
                  <p className="font-meta text-fg-faint">Projects Shipped</p>
                </div>
                <div>
                  <p className="font-editorial text-2xl font-bold text-fg">
                    2
                  </p>
                  <p className="font-meta text-fg-faint">Events Run</p>
                </div>
              </div>
              <a
                href="https://nebulafog.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 font-meta text-accent hover:underline"
              >
                nebulafog.ai <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <SectionHeader number="03" title="Tools & Projects" href="/projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={`C${String(i + 1).padStart(2, "0")}`}
            />
          ))}
        </div>
      </section>

      {/* ── Talks ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <SectionHeader number="04" title="Conference Talks" href="/talks" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTalks.map((talk, i) => (
            <TalkCard
              key={talk.title}
              {...talk}
              index={`T${String(i + 1).padStart(2, "0")}`}
            />
          ))}
        </div>
      </section>

      {/* ── Writing ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <SectionHeader number="05" title="Writing" href="/blog" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <BlogCard
              key={post.slug}
              {...post}
              index={`W${String(i + 1).padStart(2, "0")}`}
            />
          ))}
        </div>
      </section>

      {/* ── Errata / Anti-Marketing ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="border border-dashed border-border rounded-lg p-6 sm:p-8 relative">
          <span className="absolute -top-3 left-6 px-2 bg-bg font-meta text-fg-faint">
            Errata
          </span>
          <h3 className="font-editorial text-xl text-fg mb-4">
            What you won&apos;t find here
          </h3>
          <ul className="space-y-2 text-sm text-fg-muted">
            <li className="strike-accent">
              AI hype without evidence or evals
            </li>
            <li className="strike-accent">
              Security theater disguised as compliance
            </li>
            <li className="strike-accent">
              Demos that don&apos;t survive contact with production
            </li>
            <li className="strike-accent">
              Vendor pitches masquerading as research
            </li>
            <li className="strike-accent">
              Findings without a path to remediation
            </li>
          </ul>
          <p className="mt-4 text-sm text-fg-muted">
            Everything here is backed by hands-on testing, reproducible
            findings, and code you can run. The goal is making systems more
            robust, not just demonstrating they&apos;re broken.
          </p>
        </div>
      </section>
    </div>
  );
}
