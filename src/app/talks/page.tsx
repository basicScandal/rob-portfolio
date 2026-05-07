import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { talks, podcasts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Talks",
  description:
    "Conference presentations by Rob Ragan at Black Hat, DEF CON, RSA, BSides, and more. 15+ years of security research on stage.",
};

export default function TalksPage() {
  const years = [...new Set(talks.map((t) => t.year))];

  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <span className="section-number">&sect; 03 &mdash; Talks</span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold mt-3 text-fg">
          Conference Talks
        </h1>
        <p className="mt-4 text-lg text-fg-muted max-w-2xl">
          A selection of presentations at Black Hat, DEF CON, RSA, BSides, and
          industry summits. From search engine hacking to AI security, a
          career told through conferences.
        </p>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-6 mt-12 p-6 border border-border rounded-lg">
          <div className="text-center">
            <p className="font-editorial text-3xl font-bold text-fg">
              4
            </p>
            <p className="font-meta text-fg-muted mt-1">
              Black Hat
            </p>
          </div>
          <div className="text-center border-x border-border">
            <p className="font-editorial text-3xl font-bold text-fg">
              2+
            </p>
            <p className="font-meta text-fg-muted mt-1">
              DEF CON
            </p>
          </div>
          <div className="text-center">
            <p className="font-editorial text-3xl font-bold text-fg">
              15+
            </p>
            <p className="font-meta text-fg-muted mt-1">
              Total Talks
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-16 space-y-12">
          {years.map((year) => {
            const yearTalks = talks.filter((t) => t.year === year);
            return (
              <div key={year}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-editorial text-2xl text-fg font-bold">
                    {year}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="space-y-4">
                  {yearTalks.map((talk, i) => (
                    <div
                      key={talk.title}
                      className="card-editorial rounded-lg p-6 grid gap-4 sm:grid-cols-[120px_1fr]"
                    >
                      <div>
                        <p className="font-meta text-accent">
                          {talk.conference}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-editorial text-lg text-fg leading-snug">
                          {talk.title}
                        </h3>
                        {talk.coPresenter && (
                          <p className="text-sm text-fg-faint mt-1">
                            with {talk.coPresenter}
                          </p>
                        )}
                        <div className="flex gap-1.5 mt-3">
                          {talk.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-meta text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Podcasts */}
        <section className="mt-16">
          <span className="section-number">
            &sect; 04.1 &mdash; Podcasts
          </span>
          <h2 className="font-editorial text-2xl mt-2 mb-8 text-fg">
            Podcast Appearances
          </h2>
          <div className="space-y-4">
            {podcasts.map((pod, i) => (
              <a
                key={pod.title}
                href={pod.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-editorial rounded-lg p-5 grid gap-3 sm:grid-cols-[140px_1fr] group block"
              >
                <div>
                  <span className="font-meta text-accent">{pod.show}</span>
                  <p className="font-meta text-fg-faint mt-1">
                    {new Date(pod.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-editorial text-base text-fg leading-snug group-hover:text-accent transition-colors">
                      {pod.title}
                    </h3>
                    <ExternalLink
                      size={14}
                      className="text-fg-faint group-hover:text-accent transition-colors shrink-0 ml-2 mt-1"
                    />
                  </div>
                  <p className="text-sm text-fg-muted mt-1 leading-relaxed">
                    {pod.description}
                  </p>
                  <p className="font-meta text-fg-faint mt-2">
                    Host: {pod.host}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Additional Conferences */}
        <div className="mt-16 p-6 border border-dashed border-border rounded-lg">
          <span className="font-meta text-fg-faint">
            Also presented at
          </span>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              "RSA Conference",
              "BSides San Francisco",
              "BSides Pittsburgh",
              "Interop ITX",
              "SecurityWeek Summit",
              "Adobe Security Summit",
              "Boston Security Meetup",
            ].map((conf) => (
              <span
                key={conf}
                className="text-sm px-3 py-1.5 rounded-full border border-border text-fg-muted"
              >
                {conf}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
