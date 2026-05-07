import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open-source security tools and research projects by Rob Ragan. LLM Testing Findings, SmogCloud, Google Hacking Diggity, and more.",
};

export default function ProjectsPage() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <span className="section-number">&sect; 02 &mdash; Projects</span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold mt-3 text-fg">
          Tools &amp; Research
        </h1>
        <p className="mt-4 text-lg text-fg-muted max-w-2xl">
          Open-source security tools, research projects, and offensive
          methodologies. Everything here is built to be used, not just
          demonstrated.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="card-editorial rounded-lg overflow-hidden flex flex-col"
            >
              {/* Header gradient */}
              <div className="h-32 bg-gradient-to-br from-charcoal-light to-charcoal relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(57,211,83,0.25) 7px, rgba(57,211,83,0.25) 8px), repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(57,211,83,0.25) 7px, rgba(57,211,83,0.25) 8px)`,
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-4xl text-accent/20 font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {project.featured && (
                  <span className="absolute top-3 right-3 font-meta text-[9px] px-2 py-0.5 rounded bg-gold/90 text-charcoal">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-editorial text-xl text-fg">
                    {project.title}
                  </h2>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg-faint hover:text-accent transition-colors shrink-0 ml-2"
                      aria-label={`View ${project.title}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <p className="text-sm text-fg-muted leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="mt-4 pt-3 border-t border-dashed border-border flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-meta text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-meta text-fg-faint">
                    P{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
