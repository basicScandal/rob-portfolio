import Link from "next/link";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "./SocialIcons";
import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* About Column */}
          <div>
            <span className="section-number">Colophon</span>
            <h3 className="font-editorial text-lg mt-2 mb-3 text-fg">
              Rob Ragan
            </h3>
            <p className="text-sm text-fg-muted leading-relaxed max-w-sm">
              Principal Technology Strategist at Bishop Fox. Building security
              tools, breaking AI systems, and speaking at conferences about what
              I find.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon size={18} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <span className="section-number">Navigate</span>
            <ul className="mt-3 space-y-2">
              {["About", "Projects", "Talks", "Writing", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-sm text-fg-muted hover:text-accent transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Research */}
          <div>
            <span className="section-number">Research</span>
            <ul className="mt-3 space-y-2">
              {[
                "AI/LLM Security",
                "Cloud Security",
                "OSINT Tools",
                "Bishop Fox Labs",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-fg-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <span className="section-number">Elsewhere</span>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Bishop Fox", href: "https://bishopfox.com" },
                {
                  label: "GitHub",
                  href: siteConfig.social.github,
                },
                {
                  label: "LinkedIn",
                  href: siteConfig.social.linkedin,
                },
                { label: "@sweepthatleg", href: siteConfig.social.twitter },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-fg-muted hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
          <p className="font-meta text-fg-faint">
            &copy; {new Date().getFullYear()} Rob Ragan
          </p>
          <p className="font-meta text-fg-faint">
            theoradical.ai
          </p>
        </div>
      </div>
    </footer>
  );
}
