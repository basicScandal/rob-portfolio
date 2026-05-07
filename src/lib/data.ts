export const siteConfig = {
  name: "Rob Ragan",
  title: "Rob Ragan - Security Researcher & AI Red Teamer",
  description:
    "Principal Technology Strategist at Bishop Fox. Security researcher, tool builder, and speaker at Black Hat, DEF CON, and RSA.",
  url: "https://theoradical.ai",
  social: {
    twitter: "https://x.com/sweepthatleg",
    github: "https://github.com/basicScandal",
    linkedin: "https://linkedin.com/in/robragan/",
  },
};

export const stats = [
  { value: "15+", label: "Years in Security", index: "S01" },
  { value: "4x", label: "Black Hat Speaker", index: "S02" },
  { value: "10+", label: "Open Source Tools", index: "S03" },
  { value: "1", label: "Book Published", index: "S04" },
];

export interface Talk {
  year: string;
  conference: string;
  title: string;
  coPresenter?: string;
  tags: string[];
}

export const talks: Talk[] = [
  {
    year: "2025",
    conference: "Dark Reading Panel",
    title: "The Promise and Perils of AI: Navigating Emerging Cyber Threats",
    tags: ["AI", "panel"],
  },
  {
    year: "2024",
    conference: "HackGDL",
    title: "Testing LLM Algorithms While AI Tests Us",
    coPresenter: "Oscar Salazar",
    tags: ["AI/LLM", "keynote"],
  },
  {
    year: "2020",
    conference: "Black Hat USA",
    title: "SmogCloud: Expose Yourself Without Insecurity",
    coPresenter: "Oscar Salazar",
    tags: ["cloud", "AWS"],
  },
  {
    year: "2019",
    conference: "BSidesSF",
    title: "Twist & Shout: Ferris Bueller's Guide to Abuse Domain Permutations",
    coPresenter: "Kelly Albrink",
    tags: ["DNS", "OSINT"],
  },
  {
    year: "2014",
    conference: "Black Hat USA",
    title: "CloudBots: Harvesting Crypto Coins Like a Botnet Farmer",
    coPresenter: "Oscar Salazar",
    tags: ["cloud", "research"],
  },
  {
    year: "2012",
    conference: "DEF CON 20",
    title: "Tenacious Diggity: Skinny Dippin' in a Sea of Bing",
    coPresenter: "Francis Brown",
    tags: ["OSINT", "tools"],
  },
  {
    year: "2011",
    conference: "Black Hat USA",
    title: "Pulp Google Hacking: The Next Generation Search Engine Hacking Arsenal",
    coPresenter: "Fran Brown",
    tags: ["OSINT", "tools"],
  },
  {
    year: "2010",
    conference: "Black Hat USA / DEF CON 18",
    title: "Lord of the Bing: Taking Back Search Engine Hacking",
    coPresenter: "Francis Brown",
    tags: ["OSINT", "tools"],
  },
  {
    year: "2009",
    conference: "OuterZ0ne",
    title: "IDS/WAF Evasion Tactics & HTTP 100 Snort Bypass",
    tags: ["evasion", "research"],
  },
  {
    year: "2008",
    conference: "SummerCon",
    title: "Static Analysis: First Solo Conference Talk",
    tags: ["static analysis", "tools"],
  },
];

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Alpharius",
    description:
      "LLM-powered autonomous security testing agent. Finds business logic flaws, IDOR vulnerabilities, race conditions, and auth bypasses that traditional scanners miss. Built on Claude Agent SDK.",
    tags: ["AI agent", "Claude SDK", "autonomous"],
    link: "https://github.com/BishopFox/Alpharius",
    featured: true,
  },
  {
    title: "Nebula Scanner",
    description:
      "Multi-agent automated penetration testing platform. Orchestrates web crawling, endpoint clustering, and parallel AI agent execution. Proprietary deduplication reduces token waste by 99%.",
    tags: ["multi-agent", "pentest", "platform"],
    link: "https://github.com/BishopFox/orchestration-pipeline-nebula-scanner",
  },
  {
    title: "Arbiter",
    description:
      "AI judge agent for NEBULA:FOG 2026. Watches hackathon demos via Gemini Live, scores with multi-model ensemble, detects prompt injection in 7 languages. Judged 25 live demos. 1,451 tests passing.",
    tags: ["AI judge", "prompt injection", "multi-model"],
    link: "https://github.com/basicScandal/arbiter",
  },
  {
    title: "WhoisGenius",
    description:
      "Domain intelligence API with AI-powered operator attribution. Fuses 11 data sources when WHOIS fails. Per-signal confidence breakdowns. 2,022 unit tests + 39 e2e tests.",
    tags: ["OSINT", "DNS", "AI"],
    link: "https://github.com/basicScandal/whoisgenius",
  },
  {
    title: "Starlog",
    description:
      "Expert-curated deep dives on offensive security tools and AI agents. Powered by GitHub stars and Claude. CLI pipeline that ingests stars, analyzes repos, generates articles. Live at starlog.is.",
    tags: ["publication", "Claude", "Astro"],
    link: "https://github.com/basicScandal/starlog",
  },
  {
    title: "fsociety-ai",
    description:
      "AI Testing Suite. Collection of opportunistic payloads for detecting indirect prompt injection. Covers hidden injection, chain-of-thought bypass, data exfil attempts, multi-language bypass.",
    tags: ["prompt injection", "AI testing", "payloads"],
    link: "https://github.com/basicScandal/fsociety-ai",
  },
  {
    title: "LLM Testing Findings",
    description:
      "Open-source templates for documenting vulnerabilities in LLM integrations. Curated list of every open-source LLM testing tool. 74 stars, community standard.",
    tags: ["AI/LLM", "methodology", "open-source"],
    link: "https://github.com/BishopFox/llm-testing-findings",
  },
  {
    title: "SmogCloud",
    description:
      "Find cloud assets that no one wants exposed. Discovers internet-facing AWS resources across 14 services. 348 stars. Used by security engineers and pentesters worldwide.",
    tags: ["AWS", "cloud", "Go"],
    link: "https://github.com/BishopFox/smogcloud",
  },
  {
    title: "my-precious-pii",
    description:
      "GPT-2 model trained on fake PII to study data leakage from language models. CTF-style challenge: extract synthetic PII from a spiked model using prompt injection and NLP techniques.",
    tags: ["AI safety", "PII leakage", "CTF"],
    link: "https://github.com/basicScandal/my-precious-pii",
  },
  {
    title: "Google Hacking Diggity Project",
    description:
      "The search engine hacking toolkit. GoogleDiggity, BingDiggity, SHODANDiggity, and more. Created the Bing Hacking Database. Started it all.",
    tags: ["OSINT", "recon", "classic"],
    link: "https://bishopfox.com/tools/google-hacking-diggity-project-2/",
  },
];

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Why Indirect Prompt Injection Is the Supply Chain Attack of AI Systems",
    excerpt:
      "Direct prompt injection gets the headlines, but indirect injection through retrieval-augmented generation is the systemic risk. How untrusted data flowing through tool-use chains creates attack surfaces that mirror traditional supply chain compromises.",
    date: "2025-03-10",
    tags: ["AI/LLM", "prompt injection"],
    slug: "indirect-prompt-injection-supply-chain",
  },
  {
    title: "What 15 Years of Offensive Research Taught Me About AI System Failure Modes",
    excerpt:
      "The patterns repeat: every new computing paradigm ships with the same category of vulnerability dressed in new abstractions. Here's what web app exploitation, cloud security, and now LLM testing have in common, and what it tells us about where AI systems will break next.",
    date: "2025-01-15",
    tags: ["AI/LLM", "methodology"],
    slug: "offensive-research-ai-failure-modes",
  },
  {
    title: "Tool-Use Attacks: When LLMs Have Real-World Capabilities",
    excerpt:
      "An LLM that can only generate text has a bounded blast radius. An LLM with tool access, code execution, or API credentials is a different threat model entirely. Lessons from testing agentic systems where model failures have consequences beyond the chat window.",
    date: "2024-09-20",
    tags: ["agentic AI", "red teaming"],
    slug: "tool-use-attacks-agentic-ai",
  },
  {
    title: "The Cloud Exposure Problem Nobody Talks About",
    excerpt:
      "Ephemeral cloud resources create dynamic attack surfaces that traditional scanners miss entirely. How SmogCloud changes the equation.",
    date: "2023-11-20",
    tags: ["cloud", "AWS"],
    slug: "cloud-exposure-problem",
  },
];

export const expertise = [
  {
    category: "Offensive Security",
    items: [
      "Web Application Penetration Testing",
      "Red Team Operations",
      "Attack Chaining & Advanced Exploitation",
      "Social Engineering & BEC",
    ],
  },
  {
    category: "AI & LLM Security",
    items: [
      "LLM Integration Testing",
      "Prompt Injection & Data Leakage",
      "Agentic AI Threat Modeling",
      "Adversarial Robustness Evaluation",
    ],
  },
  {
    category: "Cloud & Automation",
    items: [
      "AWS Exposure Analysis",
      "Continuous Attack Surface Management",
      "Security Automation Strategy",
      "Zero Trust Architecture",
    ],
  },
  {
    category: "Research & OSINT",
    items: [
      "Search Engine Hacking",
      "Domain Abuse & DNS Security",
      "Open Source Intelligence",
      "Automated Reconnaissance",
    ],
  },
];

export const timeline = [
  {
    period: "2020 - Present",
    role: "Principal Technology Strategist",
    company: "Bishop Fox",
    description:
      "Leading AI/LLM security testing methodology. Driving cross-functional strategy across product, sales, and research. Building open-source tools for the security community.",
  },
  {
    period: "2012 - 2020",
    role: "Principal Researcher",
    company: "Bishop Fox",
    description:
      "Cloud security research (SmogCloud, CloudBots). Search engine hacking toolkit development. Conference speaker at Black Hat, DEF CON, and RSA.",
  },
  {
    period: "2009 - 2012",
    role: "Security Researcher",
    company: "Stach & Liu → Bishop Fox",
    description:
      "Web application security research. Built the Google Hacking Diggity Project. Early search engine hacking and OSINT tooling.",
  },
  {
    period: "2005 - 2009",
    role: "Software Engineer",
    company: "SPI Dynamics → HP",
    description:
      "Built dynamic analysis engines for WebInspect and static analysis for DevInspect. SPI Dynamics acquired by Hewlett-Packard in 2007.",
  },
];
