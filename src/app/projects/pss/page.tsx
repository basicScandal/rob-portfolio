import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

const PSS_URL = "https://pss.kimi.page/";

export const metadata: Metadata = {
  title: "The search outlives the agent",
  description:
    "How some agent systems hold a goal like find RCE on *.company.com for days, what it costs them, and when a single agent is the better tool.",
};

export default function PssPage() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 pb-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <Link
            href="/projects"
            className="font-meta text-fg-muted hover:text-accent transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            Projects
          </Link>
          <Link
            href="/projects/pss/examples"
            className="font-meta text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1.5 ml-auto"
          >
            Just the examples
            <ArrowRight size={14} />
          </Link>
          <a
            href={PSS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-meta text-fg-muted hover:text-accent transition-colors inline-flex items-center gap-1.5"
          >
            Open in new tab
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="card-editorial rounded-lg overflow-hidden">
          <iframe
            src={PSS_URL}
            title="The search outlives the agent"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="block w-full h-[calc(100vh-10rem)] min-h-[600px] bg-white"
          />
        </div>
      </div>
    </div>
  );
}
