import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TraceExplorer } from "@/components/TraceExplorer";
import { castleTrace, defenseTrace, offenseTrace } from "@/lib/pssTraces";

export const metadata: Metadata = {
  title: "The search outlives the agent: three examples",
  description:
    "A castle, an offensive security goal and an incident question, each stepped through on a shared board of facts, intents and hints.",
};

const mapping: [string, string][] = [
  ["Treasure", "The goal"],
  ["Castle", "The environment"],
  ["Rooms, doors and passages", "The state space"],
  ["Explorers", "Workers, which are short agent sessions"],
  ["Notebook", "The board, a persistent graph or database"],
  ["Team leader", "The planner"],
  ["Discoveries", "Facts"],
  ["Places to examine", "Intents"],
  ["Finding the treasure", "Verified completion of the goal"],
];

const legend: { label: string; node: React.ReactNode }[] = [
  { label: "fact", node: <circle cx="9" cy="9" r="7" fill="var(--bg-card)" stroke="var(--fg)" strokeWidth="1.5" /> },
  { label: "negative fact", node: <circle cx="9" cy="9" r="7" fill="color-mix(in srgb, var(--fg-faint) 30%, var(--bg-card))" stroke="var(--fg-faint)" strokeWidth="1.5" /> },
  { label: "unverified claim", node: <circle cx="9" cy="9" r="7" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 2" /> },
  { label: "verified fact", node: <circle cx="9" cy="9" r="7" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.5" /> },
  { label: "pending intent", node: <rect x="2.5" y="2.5" width="13" height="13" rx="2" fill="var(--bg-card)" stroke="var(--fg-muted)" strokeWidth="1.5" strokeDasharray="3 2" /> },
  { label: "running intent", node: <rect x="2.5" y="2.5" width="13" height="13" rx="2" fill="color-mix(in srgb, #4f8cff 18%, var(--bg-card))" stroke="#4f8cff" strokeWidth="1.5" /> },
  { label: "dropped intent", node: <><rect x="2.5" y="2.5" width="13" height="13" rx="2" fill="var(--bg-card)" stroke="var(--fg-faint)" strokeWidth="1.5" strokeDasharray="2 2" /><line x1="4" y1="14" x2="14" y2="4" stroke="var(--fg-faint)" strokeWidth="1.5" /></> },
  { label: "operator hint or hold", node: <rect x="4" y="4" width="10" height="10" rx="1.5" transform="rotate(45 9 9)" fill="color-mix(in srgb, var(--gold) 18%, var(--bg-card))" stroke="var(--gold)" strokeWidth="1.5" /> },
];

function Takeaways({ items }: { items: [string, string][] }) {
  return (
    <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
      {items.map(([head, body]) => (
        <li key={head} className="border-t border-dashed border-border pt-3">
          <p className="font-editorial text-lg text-fg">{head}</p>
          <p className="text-sm text-fg-muted leading-relaxed mt-1">{body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function PssExamplesPage() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 sm:pt-16 pb-20">
        <Link
          href="/projects"
          className="font-meta text-fg-muted hover:text-accent transition-colors inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={14} />
          Projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <span className="section-number">Research &mdash; the examples</span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold mt-3 text-fg text-balance">
            The search outlives the agent
          </h1>
          <p className="mt-5 text-lg text-fg-muted leading-relaxed">
            Some agent systems hold a goal like{" "}
            <em className="text-fg">find RCE on *.company.com</em> for days by
            keeping the search outside the model: the known facts, the
            investigations in progress and the rejected ideas live on a shared
            board, and every model session is replaceable. Here are three runs
            of that idea, one step at a time.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <a href="#castle" className="font-meta text-accent hover:text-accent-hover">01 A castle</a>
            <a href="#offense" className="font-meta text-accent hover:text-accent-hover">02 Offense</a>
            <a href="#defense" className="font-meta text-accent hover:text-accent-hover">03 Defense</a>
            <Link href="/projects/pss" className="font-meta text-fg-muted hover:text-accent inline-flex items-center gap-1.5">
              Read the full paper <ArrowRight size={12} />
            </Link>
          </div>
        </header>

        {/* Legend */}
        <div className="mt-10 border border-border rounded-lg bg-bg-card p-4 sm:p-5">
          <p className="font-meta text-fg-faint">How to read the graphs</p>
          <p className="text-sm text-fg-muted leading-relaxed mt-2 max-w-3xl">
            Circles are facts and squares are intents. Each intent cites the
            facts that motivate it, and each fact records the intent that
            produced it, so the graph only grows forward. Step through a run,
            or select any entry to trace its links.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {legend.map((l) => (
              <li key={l.label} className="inline-flex items-center gap-2 text-xs text-fg-muted">
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">{l.node}</svg>
                {l.label}
              </li>
            ))}
          </ul>
        </div>

        {/* 01 Castle */}
        <section id="castle" className="mt-20 scroll-mt-24">
          <span className="section-number">Example 01 &mdash; the intuition</span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold mt-2 text-fg">
            A castle, a treasure, a notebook
          </h2>
          <p className="mt-4 text-fg-muted leading-relaxed max-w-3xl">
            A treasure is somewhere in a large castle. Send a team, and give
            them one notebook that remembers everything. It keeps its notes
            when you sleep, when you return the next day, and when a friend
            takes your place. Nobody has to start again.
          </p>
          <TraceExplorer trace={castleTrace} label="The castle" />
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm min-w-[420px]">
              <thead>
                <tr className="text-left">
                  <th className="font-meta text-fg-faint font-normal pb-2 pr-6 w-2/5">In the castle</th>
                  <th className="font-meta text-fg-faint font-normal pb-2">In the system</th>
                </tr>
              </thead>
              <tbody>
                {mapping.map(([a, b]) => (
                  <tr key={a} className="border-t border-border">
                    <td className="py-2 pr-6 text-fg">{a}</td>
                    <td className="py-2 text-fg-muted">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-fg-muted leading-relaxed max-w-3xl">
            A single agent is one capable explorer who must remember
            everything. This architecture is an expedition: an explorer can get
            confused, get tired or leave, and the expedition still keeps what
            it learned.
          </p>
        </section>

        {/* 02 Offense */}
        <section id="offense" className="mt-24 scroll-mt-24">
          <span className="section-number">Example 02 &mdash; offense</span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold mt-2 text-fg">
            One goal, traced
          </h2>
          <p className="mt-4 text-fg-muted leading-relaxed max-w-3xl">
            Show code execution on a host in *.company.com, in an authorized
            assessment. Actions are read-only by default, the system touches
            no data and leaves nothing behind, and each state-changing action
            needs approval. This is a generic composite with no payloads, tools
            or technique detail. Only one command ever runs on the target: a
            harmless marker, approved by a human first.
          </p>
          <TraceExplorer trace={offenseTrace} label="The offensive run" />
          <Takeaways
            items={[
              ["Two facts converge", "The leaked account and the portal's upload feature are not findings alone. One intent joins them from opposite sides of the graph."],
              ["A negative fact saves work", "The main application's inputs are clean, so the planner never returns to them."],
              ["An idea is dropped, with a reason", "Trying default logins was reasonable until another fact made it unnecessary. The report can still say it was considered."],
              ["A human approves the one risky action", "The only state-changing step waits for approval and runs under written conditions."],
              ["Evidence is replayed", "The goal is declared only after separate sessions reproduce every fact on the path from its stored artifact."],
            ]}
          />
        </section>

        {/* 03 Defense */}
        <section id="defense" className="mt-24 scroll-mt-24">
          <span className="section-number">Example 03 &mdash; defense</span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold mt-2 text-fg">
            One question, traced
          </h2>
          <p className="mt-4 text-fg-muted leading-relaxed max-w-3xl">
            An alert reports an unusual sign-in on a build server at 02:14. The
            incident lead must answer one question before morning: did the
            intruder reach the customer database, and how far did the intruder
            get?
          </p>
          <TraceExplorer trace={defenseTrace} label="The defensive run" />
          <Takeaways
            items={[
              ["All the work runs in parallel", "Read-only queries cannot disturb each other or production."],
              ["The evidence already exists", "A log is an artifact. Each fact points to rows a second analyst can read, which is what an incident report needs."],
              ["A negative fact supports the answer", "No unusual egress is what lets the answer say nothing was exported in bulk."],
              ["A hint is cheap", "The logs alone made the backup theory plausible. One sentence from a person who knows the environment removed it."],
            ]}
          />
        </section>

        {/* Footer */}
        <footer className="mt-24 border-t border-border pt-8">
          <p className="text-fg-muted leading-relaxed max-w-3xl">
            The architecture does not always pay. In one controlled evaluation
            it used about four times the tokens of a single agent on a security
            benchmark and was slower on 30 of 40 tasks, while finishing sooner
            on 76.5% of the hardest ones. The full paper covers the mechanisms,
            the evidence and where it breaks.
          </p>
          <Link href="/projects/pss" className="mt-5 inline-flex items-center gap-2 btn-primary rounded px-4 py-2.5 text-sm font-medium">
            Read the full paper <ArrowRight size={14} />
          </Link>
          <p className="mt-8 text-xs text-fg-faint leading-relaxed max-w-3xl">
            The three runs are schematic and follow the paper&rsquo;s castle
            analogy and its Figs. 10 and 11. Some board entries are filled in
            to keep each walk-through complete. Every security example assumes
            written authorization and an enforced scope.
          </p>
        </footer>
      </div>
    </div>
  );
}
