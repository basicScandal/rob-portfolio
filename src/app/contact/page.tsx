import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/SocialIcons";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rob Ragan. Speaking engagements, security consulting, research collaboration.",
};

export default function ContactPage() {
  const links = [
    {
      label: "Twitter / X",
      handle: "@sweepthatleg",
      href: siteConfig.social.twitter,
      icon: TwitterIcon,
      description: "Security hot takes and AI/LLM findings",
    },
    {
      label: "GitHub",
      handle: "basicScandal",
      href: siteConfig.social.github,
      icon: GithubIcon,
      description: "Open-source tools and research code",
    },
    {
      label: "LinkedIn",
      handle: "robragan",
      href: siteConfig.social.linkedin,
      icon: LinkedinIcon,
      description: "Professional network and career history",
    },
    {
      label: "Bishop Fox",
      handle: "bishopfox.com",
      href: "https://bishopfox.com",
      icon: ExternalLink,
      description: "Enterprise security consulting and services",
    },
  ];

  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <span className="section-number">&sect; 05 &mdash; Contact</span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold mt-3 text-fg">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-fg-muted max-w-2xl">
          Interested in speaking engagements, security consulting, research
          collaboration, or just want to talk about breaking AI systems?
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-editorial rounded-lg p-6 flex gap-4 items-start group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Icon
                    size={18}
                    className="text-accent"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-editorial text-lg text-fg">
                      {link.label}
                    </h3>
                    <span className="font-meta text-fg-faint">
                      C{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-accent mt-0.5">
                    {link.handle}
                  </p>
                  <p className="text-sm text-fg-muted mt-1">
                    {link.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Speaking Section */}
        <section className="mt-16">
          <span className="section-number">
            &sect; 05.1 &mdash; Speaking
          </span>
          <h2 className="font-editorial text-2xl mt-2 mb-4 text-fg">
            Speaking Engagements
          </h2>
          <div className="card-editorial rounded-lg p-6">
            <p className="text-fg-muted leading-relaxed">
              I speak regularly at security conferences including Black Hat, DEF
              CON, RSA, and BSides events. Current topics include AI/LLM
              security testing methodology, cloud attack surface management, and
              offensive automation.
            </p>
            <p className="text-fg-muted leading-relaxed mt-3">
              For speaking inquiries, reach out via{" "}
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                LinkedIn
              </a>{" "}
              or through{" "}
              <a
                href="https://bishopfox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Bishop Fox
              </a>
              .
            </p>
          </div>
        </section>

        {/* Advisory */}
        <section className="mt-12">
          <span className="section-number">
            &sect; 05.2 &mdash; Advisory
          </span>
          <h2 className="font-editorial text-2xl mt-2 mb-4 text-fg">
            Advisory Work
          </h2>
          <div className="card-editorial rounded-lg p-6">
            <p className="text-fg-muted leading-relaxed">
              I serve as a technical advisor to security startups working on
              attack surface management, cloud security automation, and AI
              security tooling. If you&apos;re building in this space, I&apos;d
              like to hear from you.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
