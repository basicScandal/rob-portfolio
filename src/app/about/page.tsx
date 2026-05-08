import type { Metadata } from "next";
import { timeline, expertise } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rob Ragan - Principal Technology Strategist at Bishop Fox. 18+ years of security research, from search engine hacking to AI/LLM security.",
};

export default function AboutPage() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        {/* Header */}
        <span className="section-number">&sect; 01 &mdash; About</span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold mt-3 text-fg">
          Rob Ragan
        </h1>
        <p className="font-meta text-fg-muted mt-2">
          Principal Technology Strategist &middot; Bishop Fox &middot; San
          Francisco
        </p>

        {/* Bio */}
        <div className="mt-12 prose prose-lg max-w-none">
          <p>
            I&apos;ve spent 18+ years finding ways to break things that
            weren&apos;t supposed to break. Started building security testing
            tools at SPI Dynamics (later acquired by HP), working on the dynamic
            analysis engine for WebInspect and static analysis for DevInspect.
          </p>
          <p>
            After the acquisition I moved to Bishop Fox (originally Stach &amp;
            Liu) and never left. Went from web app pentester to principal
            researcher to technology strategist. Along the way I created the{" "}
            <strong>Google Hacking Diggity Project</strong>, which became one of
            the most widely used search engine hacking toolkits in the industry.
          </p>
          <p>
            My research path tells the story: search engine hacking (Black Hat
            2010, 2011; DEF CON 18, 20), then cloud security exploitation
            (Black Hat 2014, 2020), and now{" "}
            <strong>leading a team of agentic engineers building AI-powered
            offensive security agents</strong>. I research and design
            cutting-edge agents that attack web applications and other systems.
            The kind of work where you&apos;re teaching AI to think like a
            pentester and then watching it find things humans missed.
          </p>
          <p>
            The most valuable security work I&apos;ve done sits at the
            intersection of offensive expertise and genuine curiosity about how
            systems behave at scale. Finding a single vulnerability matters less
            than understanding the class of problem it represents, and building
            the agents and tooling that find the next ten automatically.
          </p>
          <p>
            Contributing author to{" "}
            <em>Hacking Exposed Web Applications, 3rd Edition</em> (McGraw-Hill).
            Spoken at Black Hat, DEF CON, RSA, BSides, and a bunch of enterprise
            security summits. I maintain several open-source tools including
            SmogCloud (AWS exposure detection) and the LLM Testing Findings
            repository.
          </p>
          <p>
            When I&apos;m not breaking AI systems I&apos;m building cyber decks,
            DNS sinkholing via Pi-hole, cooking with donabe, or driving
            Porsches.
          </p>
        </div>

        {/* Expertise Grid */}
        <section className="mt-20">
          <span className="section-number">
            &sect; 01.1 &mdash; Areas of Expertise
          </span>
          <h2 className="font-editorial text-2xl mt-2 mb-8 text-fg">
            What I Work On
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertise.map((area, i) => (
              <div
                key={area.category}
                className="card-editorial rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-editorial text-lg text-fg">
                    {area.category}
                  </h3>
                  <span className="font-meta text-fg-faint">
                    E{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="space-y-2">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-fg-muted"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-20">
          <span className="section-number">
            &sect; 01.2 &mdash; Career Timeline
          </span>
          <h2 className="font-editorial text-2xl mt-2 mb-8 text-fg">
            Professional Journey
          </h2>
          <div className="space-y-0">
            {timeline.map((entry, i) => (
              <div
                key={entry.period}
                className="relative pl-8 pb-10 last:pb-0 border-l border-border"
              >
                {/* Dot */}
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-accent" />

                <span className="font-meta text-accent">
                  {entry.period}
                </span>
                <h3 className="font-editorial text-lg mt-1 text-fg">
                  {entry.role}
                </h3>
                <p className="font-meta text-fg-muted mt-0.5">
                  {entry.company}
                </p>
                <p className="text-sm text-fg-muted mt-2 leading-relaxed">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Publications */}
        <section className="mt-20">
          <span className="section-number">
            &sect; 01.3 &mdash; Education &amp; Publications
          </span>
          <h2 className="font-editorial text-2xl mt-2 mb-8 text-fg">
            Credentials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-editorial rounded-lg p-6">
              <span className="font-meta text-accent">
                Education
              </span>
              <h3 className="font-editorial text-lg mt-2 text-fg">
                Pennsylvania State University
              </h3>
              <p className="text-sm text-fg-muted mt-1">
                B.S. Information Sciences &amp; Technology
              </p>
              <p className="text-sm text-fg-faint mt-0.5">
                Focus: Systems Development
              </p>
            </div>
            <div className="card-editorial rounded-lg p-6">
              <span className="font-meta text-accent">
                Publication
              </span>
              <h3 className="font-editorial text-lg mt-2 text-fg">
                Hacking Exposed Web Applications
              </h3>
              <p className="text-sm text-fg-muted mt-1">
                3rd Edition &middot; McGraw-Hill
              </p>
              <p className="text-sm text-fg-faint mt-0.5">
                Contributing Author
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
