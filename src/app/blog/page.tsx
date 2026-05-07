import type { Metadata } from "next";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical writing by Rob Ragan on AI/LLM security, cloud security, OSINT, and offensive research.",
};

export default function BlogPage() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <span className="section-number">&sect; 04 &mdash; Writing</span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold mt-3 text-fg">
          Writing
        </h1>
        <p className="mt-4 text-lg text-fg-muted max-w-2xl">
          Technical writing on security research, AI/LLM testing, cloud
          security, and the tools I build. No hype. Just findings and
          methodology.
        </p>

        <div className="mt-12 space-y-6">
          {blogPosts.map((post, i) => (
            <article
              key={post.slug}
              className="card-editorial rounded-lg p-6 grid gap-4 sm:grid-cols-[100px_1fr]"
            >
              <div>
                <span className="font-meta text-accent">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
                <p className="font-meta text-fg-faint mt-1">
                  {String(i + 1).padStart(2, "0")} &middot; Essay
                </p>
              </div>
              <div>
                <h2 className="font-editorial text-xl text-fg leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-fg-muted mt-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-dashed border-border">
                  <div className="flex gap-1.5">
                    {post.tags.map((tag) => (
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
            </article>
          ))}
        </div>

        {/* Placeholder for more content */}
        <div className="mt-12 p-6 border border-dashed border-border rounded-lg text-center">
          <p className="text-sm text-fg-muted">
            More writing coming soon. In the meantime, check out my
            contributions on{" "}
            <a
              href="https://bishopfox.com/authors/rob-ragan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Bishop Fox Blog
            </a>{" "}
            and{" "}
            <a
              href="https://www.darkreading.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Dark Reading
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
