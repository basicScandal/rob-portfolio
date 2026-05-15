export const siteConfig = {
  name: "Rob Ragan",
  title: "Rob Ragan - Applied Security Research & Agentic Engineering",
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
  { value: "18+", label: "Years in Security", index: "S01" },
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
  slides?: string;
  video?: string;
  link?: string;
}

export const talks: Talk[] = [
  {
    year: "2026",
    conference: "Decibel RSAC Founder Festival",
    title: "Every 3 Months, It's a New World: Building Agents That Build Experiences",
    tags: ["agentic AI", "coding agents", "RSA week"],
    slides: "https://speakerdeck.com/basicscandal/every-3-months-its-a-new-world",
  },
  {
    year: "2025",
    conference: "Dark Reading Panel",
    title: "The Promise and Perils of AI: Navigating Emerging Cyber Threats",
    tags: ["AI", "panel"],
    video: "https://www.youtube.com/watch?v=k8AbPDrew-w",
    link: "https://bishopfox.com/resources/dark-reading-panel-promise-perils-ai-navigating-emerging-cyber-threats",
  },
  {
    year: "2024",
    conference: "HackGDL",
    title: "Testing LLM Algorithms While AI Tests Us",
    coPresenter: "Oscar Salazar",
    tags: ["AI/LLM", "keynote"],
    video: "https://www.youtube.com/watch?v=bpw0zopn1H0",
  },
  {
    year: "2024",
    conference: "BSidesSF",
    title: "LLM Privacy Paradox: Balancing Data Utility with Security",
    coPresenter: "Aashiq Ramachandran",
    tags: ["AI safety", "PII leakage"],
    link: "https://github.com/basicScandal/my-precious-pii",
    video: "https://www.youtube.com/watch?v=9vyUGcyX4mA",
  },
  {
    year: "2020",
    conference: "Black Hat USA",
    title: "SmogCloud: Expose Yourself Without Insecurity",
    coPresenter: "Oscar Salazar",
    tags: ["cloud", "AWS"],
    slides: "https://www.slideshare.net/slideshow/expose-yourself-without-insecurity-cloud-breach-patterns/224829553",
  },
  {
    year: "2019",
    conference: "BSidesSF",
    title: "Twist & Shout: Ferris Bueller's Guide to Abuse Domain Permutations",
    coPresenter: "Kelly Albrink",
    tags: ["DNS", "OSINT"],
    slides: "https://www.slideshare.net/bishopfox/ferris-buellers-guide-to-abuse-domain-permutations",
  },
  {
    year: "2019",
    conference: "OWASP AppSec Cali",
    title: "Pose a Threat: Perceptual Analysis for Bug Hunters",
    coPresenter: "Oscar Salazar",
    tags: ["visual analysis", "automation"],
    video: "https://www.youtube.com/watch?v=unAQCEkOtFk",
  },
  {
    year: "2015",
    conference: "BSides Pittsburgh",
    title: "Never Surrender: Reducing Social Engineering Risk",
    coPresenter: "Christina Camilleri",
    tags: ["social engineering", "defense"],
    slides: "https://www.slideshare.net/slideshow/bsidespgh-never-surrender-20150619/49698144",
    video: "https://www.youtube.com/watch?v=fIQdEEN0p5k",
  },
  {
    year: "2014",
    conference: "Black Hat USA",
    title: "CloudBots: Harvesting Crypto Coins Like a Botnet Farmer",
    coPresenter: "Oscar Salazar",
    tags: ["cloud", "research"],
    slides: "https://www.slideshare.net/slideshow/cloudbots-harvesting-crypto-currency-like-a-botnet-farmer/37994151",
  },
  {
    year: "2012",
    conference: "DEF CON 20",
    title: "Tenacious Diggity: Skinny Dippin' in a Sea of Bing",
    coPresenter: "Francis Brown",
    tags: ["OSINT", "tools"],
    slides: "https://www.slideshare.net/slideshow/tencious-diggity-skinny-dippin-in-a-sea-of-bing/13816252",
  },
  {
    year: "2011",
    conference: "Black Hat USA",
    title: "Pulp Google Hacking: The Next Generation Search Engine Hacking Arsenal",
    coPresenter: "Fran Brown",
    tags: ["OSINT", "tools"],
    slides: "https://www.slideshare.net/slideshow/black-hat-2011-pulp-google-hacking/8829971",
  },
  {
    year: "2010",
    conference: "Black Hat USA / DEF CON 18",
    title: "Lord of the Bing: Taking Back Search Engine Hacking",
    coPresenter: "Francis Brown",
    tags: ["OSINT", "tools"],
    slides: "https://www.slideshare.net/slideshow/lord-of-the-bing-black-hat-usa-2010/4929285",
  },
  {
    year: "2009",
    conference: "OuterZ0ne",
    title: "IDS/WAF Evasion Tactics & HTTP 100 Snort Bypass",
    tags: ["evasion", "research"],
    slides: "https://www.slideshare.net/slideshow/filter-evasion-houdini-on-the-wire/1127990",
  },
  {
    year: "2008",
    conference: "SummerCon",
    title: "Static Analysis: First Solo Conference Talk",
    tags: ["static analysis", "tools"],
    slides: "https://www.slideshare.net/slideshow/static-analysis-the-art-of-fighting-without-fighting/1127989",
  },
];

export interface Video {
  title: string;
  youtubeId: string;
  year: string;
  venue: string;
  coPresenter?: string;
}

export const videos: Video[] = [
  {
    title: "The Evolution of Pentesting with AI",
    youtubeId: "1Aa_eYWODOI",
    year: "2025",
    venue: "AI Security Podcast",
  },
  {
    title: "The Promise and Perils of AI: Navigating Emerging Cyber Threats",
    youtubeId: "k8AbPDrew-w",
    year: "2025",
    venue: "Dark Reading Panel",
  },
  {
    title: "Testing LLM Algorithms While AI Tests Us",
    youtubeId: "bpw0zopn1H0",
    year: "2024",
    venue: "HackGDL",
    coPresenter: "Oscar Salazar",
  },
  {
    title: "From Software Developer to Penetration Tester",
    youtubeId: "TeNaN9jtpaI",
    year: "2024",
    venue: "The Hacker Factory",
  },
  {
    title: "Rob Ragan on AI Solving Security Problems",
    youtubeId: "HABl8PquzL8",
    year: "2023",
    venue: "Security Conversations",
  },
  {
    title: "Rob Ragan on AI (Extended Interview)",
    youtubeId: "u8ezhHln-P4",
    year: "2023",
    venue: "Security Conversations",
  },
  {
    title: "SmogCloud: Expose Yourself Without Insecurity",
    youtubeId: "MU6IPajqX2g",
    year: "2020",
    venue: "Black Hat USA",
  },
  {
    title: "Twist & Shout: Ferris Bueller's Guide to Domain Permutations",
    youtubeId: "Yp19i40plOA",
    year: "2019",
    venue: "BSidesSF",
    coPresenter: "Kelly Albrink",
  },
  {
    title: "Pose a Threat: Perceptual Analysis for Bug Hunters",
    youtubeId: "unAQCEkOtFk",
    year: "2019",
    venue: "OWASP AppSec Cali",
    coPresenter: "Oscar Salazar",
  },
  {
    title: "Never Surrender: Reducing Social Engineering Risk",
    youtubeId: "fIQdEEN0p5k",
    year: "2015",
    venue: "BSides Pittsburgh",
    coPresenter: "Christina Camilleri",
  },
  {
    title: "CloudBots: Harvesting Crypto Coins Like a Botnet Farmer",
    youtubeId: "llW8rI_l0u4",
    year: "2014",
    venue: "Black Hat USA",
    coPresenter: "Oscar Salazar",
  },
  {
    title: "USA TODAY: Google Hacking Tool for Consumers",
    youtubeId: "g1Succb1zi8",
    year: "2012",
    venue: "USA TODAY",
  },
  {
    title: "Tenacious Diggity: Skinny Dippin' in a Sea of Bing",
    youtubeId: "SxUjmfN0rEY",
    year: "2012",
    venue: "DEF CON 20",
    coPresenter: "Francis Brown",
  },
  {
    title: "Pulp Google Hacking: Next Gen Search Engine Arsenal",
    youtubeId: "iAvWNX4zLps",
    year: "2011",
    venue: "Black Hat USA",
    coPresenter: "Fran Brown",
  },
  {
    title: "Lord of the Bing: Taking Back Search Engine Hacking",
    youtubeId: "OAwhzUMdY4E",
    year: "2010",
    venue: "DEF CON 18",
    coPresenter: "Francis Brown",
  },
  {
    title: "Filter Evasion: Houdini on the Wire",
    youtubeId: "CMfa56dusMI",
    year: "2009",
    venue: "OuterZ0ne",
  },
];

export interface Podcast {
  show: string;
  title: string;
  date: string;
  host: string;
  link: string;
  description: string;
}

export const podcasts: Podcast[] = [
  {
    show: "AI Security Podcast",
    title: "The Evolution of Pentesting with AI",
    date: "2025-05-15",
    host: "AI Security Podcast",
    link: "https://www.youtube.com/watch?v=1Aa_eYWODOI",
    description:
      "How AI is transforming penetration testing. Building autonomous security agents, the evolution from manual to AI-augmented offensive security, and what the future of pentesting looks like.",
  },
  {
    show: "CyberScoop Safe Mode",
    title: "The 'Iron Man' Suit for Pen Testers",
    date: "2025-05-29",
    host: "Greg Otto",
    link: "https://cyberscoop.com/radio/bishop-fox-rob-ragan-iron-man-suit-agentic-ai/",
    description:
      "Building agentic AI that augments offensive security professionals. How adaptive AI tools are reshaping penetration testing.",
  },
  {
    show: "Forgepoint Capital",
    title: "Demystifying AI and LLM Pen Testing",
    date: "2024-07-30",
    host: "Kathryn Shih",
    link: "https://forgepointcap.com/perspectives/tales-from-the-forefront-demystifying-ai-and-llm-pen-testing/",
    description:
      "Critical vulnerabilities in LLM applications. RCE, API key exposure, injection in output rendering. What enterprises get wrong.",
  },
  {
    show: "The Hacker Factory",
    title: "From Software Developer to Penetration Tester",
    date: "2024-01-13",
    host: "Phillip Wylie",
    link: "https://www.youtube.com/watch?v=TeNaN9jtpaI",
    description:
      "Origin story. How 2600 Magazine and hacker culture led from software development into professional penetration testing.",
  },
  {
    show: "Security Conversations",
    title: "The Excitement of AI Solving Security Problems",
    date: "2023-12-07",
    host: "Ryan Naraine",
    link: "https://securityconversations.com/episode/rob-ragan-on-the-excitement-of-ai-solving-security-problems/",
    description:
      "Scaling pen testing ops, AI as an inflection point comparable to the internet, and the case for equitable global AI access.",
  },
  {
    show: "The Segment (Illumio)",
    title: "Live from RSAC! Test, Verify, Validate",
    date: "2023-06-07",
    host: "Raghu Nandakumara",
    link: "https://www.illumio.com/podcast/live-from-rsac-test-verify-validate",
    description:
      "Zero Trust in hybrid environments. OT/IoT vulnerabilities in legacy critical infrastructure. Threat actor categorization.",
  },
  {
    show: "The Official OffSec Podcast",
    title: "Continuous Security Testing with Rob Ragan",
    date: "2022-10-25",
    host: "FalconSpy",
    link: "https://creators.spotify.com/pod/show/offsec/episodes/36-Continuous-Security-Testing-with-Rob-Ragan--Principal-Researcher-at-Bishop-Fox-e1pmug6",
    description:
      "Building continuous security testing programs. Real bugs found deploying continuous tooling. Career advice for aspiring security professionals.",
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
    title: "Cosmos",
    description:
      "AI-powered application security testing product at Bishop Fox. Autonomous agents that test entire application portfolios at scale, finding vulnerabilities across web apps that manual testing misses. Shipped to production, used by enterprise customers.",
    tags: ["AI product", "appsec", "agentic"],
    link: "https://bishopfox.com/blog/most-security-programs-test-a-fraction-of-their-applications-that-changes-today",
    featured: true,
  },
  {
    title: "Arbiter",
    description:
      "AI judge agent for NEBULA:FOG 2026. Watches hackathon demos via Gemini Live, scores with a multi-model ensemble (Claude + Gemini + Groq), defends against prompt injection in 7 languages. Judged 25 live demos. 1,451 tests passing.",
    tags: ["AI judge", "prompt injection", "Claude"],
    link: "https://github.com/basicScandal/arbiter",
  },
  {
    title: "Starlog",
    description:
      "Expert-curated deep dives on offensive security tools and AI agents. CLI pipeline powered by Claude that ingests GitHub stars, analyzes repos, and generates long-form articles autonomously. Live at starlog.is.",
    tags: ["publication", "Claude", "agentic"],
    link: "https://starlog.is",
  },
  {
    title: "LLM Testing Findings",
    description:
      "Open-source templates for documenting vulnerabilities in LLM integrations. Curated list of every open-source LLM testing tool. 74 stars, community standard.",
    tags: ["AI/LLM", "methodology", "open-source"],
    link: "https://github.com/BishopFox/llm-testing-findings",
  },
  {
    title: "METR Cybersecurity Benchmark",
    description:
      "Contributed the 'rcrce' cybersecurity challenge to METR's HCAST benchmark for evaluating autonomous AI agents. A 2.8-hour PHP race condition exploit task requiring RCE and flag retrieval. Zero AI agents have solved it. Built to the METR Task Standard for measuring frontier model capabilities.",
    tags: ["AI safety", "benchmarks", "METR"],
    link: "https://arxiv.org/abs/2503.17354",
  },
  {
    title: "my-precious-pii",
    description:
      "AI safety research: GPT-2 model trained on fake PII to study data leakage from language models. CTF-style challenge where participants extract synthetic PII using prompt injection and NLP techniques. Demonstrates real risks in model memorization.",
    tags: ["AI safety", "PII leakage", "model security"],
    link: "https://github.com/basicScandal/my-precious-pii",
  },
  {
    title: "SmogCloud",
    description:
      "Find cloud assets that no one wants exposed. Discovers internet-facing AWS resources across 14 services. 348 stars. Used by security engineers and pentesters worldwide.",
    tags: ["AWS", "cloud", "Go"],
    link: "https://github.com/BishopFox/smogcloud",
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
  url: string;
  publication: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "I Built a Skin System for Claude Code — Here's How It Works",
    excerpt:
      "A customizable theming system for Claude Code with nine visual and behavioral personas. Modifies terminal colors, ASCII banners, status indicators, and personality narration styles.",
    date: "2026-05-12",
    tags: ["Claude", "open source"],
    url: "https://dev.to/basicscandal/i-built-a-skin-system-for-claude-code-heres-how-it-works-4pdi",
    publication: "DEV Community",
  },
  {
    title: "Most Security Programs Test a Fraction of Their Applications. That Changes Today.",
    excerpt:
      "Announcing Cosmos AI-powered application security testing. How organizations can finally test entire application portfolios at scale.",
    date: "2026-02-09",
    tags: ["AI", "automation"],
    url: "https://bishopfox.com/blog/most-security-programs-test-a-fraction-of-their-applications-that-changes-today",
    publication: "Bishop Fox",
  },
  {
    title: "The Promise and Perils of AI: Navigating Emerging Cyber Threats",
    excerpt:
      "Recap of the Dark Reading panel. How AI simultaneously empowers defenders and attackers. Prompt injection, deepfakes, AI-driven social engineering.",
    date: "2025-04-16",
    tags: ["AI", "panel"],
    url: "https://bishopfox.com/blog/dark-reading-panel-promise-perils-ai-navigating-emerging-cyber-threats-blog",
    publication: "Bishop Fox",
  },
  {
    title: "Demystifying AI and LLM Pen Testing",
    excerpt:
      "Critical vulnerabilities in LLM applications. RCE, API key exposure, injection in output rendering. What enterprises get wrong about AI security testing.",
    date: "2024-07-30",
    tags: ["AI/LLM", "pen testing"],
    url: "https://forgepointcap.com/perspectives/tales-from-the-forefront-demystifying-ai-and-llm-pen-testing/",
    publication: "Forgepoint Capital",
  },
  {
    title: "Get Organized Like a Villain",
    excerpt:
      "FIN7 used Jira, HipChat, and JabbR to coordinate attacks like an agile engineering team. What offensive security teams can learn from it.",
    date: "2019-12-12",
    tags: ["threat intel", "red team"],
    url: "https://www.darkreading.com/vulnerabilities-threats/get-organized-like-a-villain",
    publication: "Dark Reading",
  },
  {
    title: "Is Your Perimeter Inventory Leaving You Exposed? Why It's Time to Switch from IP to DNS",
    excerpt:
      "Modern dynamic cloud perimeters make IP-based inventories dangerously incomplete. Track internet-facing assets via DNS records instead.",
    date: "2019-05-22",
    tags: ["cloud", "DNS"],
    url: "https://www.helpnetsecurity.com/2019/05/22/switch-from-ip-to-dns/",
    publication: "Help Net Security",
  },
  {
    title: "How End-User Devices Get Hacked: 8 Easy Ways",
    excerpt:
      "The most common attack vectors cybercriminals use to compromise end-user devices. From phishing with macro-laden Office docs to drive-by downloads.",
    date: "2017-06-09",
    tags: ["endpoints", "attacks"],
    url: "https://www.darkreading.com/cyberattacks-data-breaches/how-end-user-devices-get-hacked-8-easy-ways",
    publication: "Dark Reading",
  },
  {
    title: "Social Engineering Defenses: Reducing The Human Element",
    excerpt:
      "Security awareness training is ineffective and expensive. Time to shift toward technical controls instead of relying on user behavior change.",
    date: "2015-04-30",
    tags: ["social engineering", "defense"],
    url: "https://www.darkreading.com/cyber-risk/social-engineering-defenses-reducing-the-human-element",
    publication: "Dark Reading",
  },
  {
    title: "CloudBot: A Free, Malwareless Alternative To Traditional Botnets",
    excerpt:
      "1,000+ cloud service accounts across 150 providers. No malware required. Free, resilient botnets built entirely from trial accounts.",
    date: "2014-08-01",
    tags: ["cloud", "research"],
    url: "https://www.darkreading.com/cyberattacks-data-breaches/cloudbot-a-free-malwareless-alternative-to-traditional-botnets",
    publication: "Dark Reading",
  },
  {
    title: "Five Steps To Help Repel The 'Lulz'",
    excerpt:
      "Practical defensive steps against LulzSec-style attacks. Google-hack yourself, scan your own systems, and hire someone to break in.",
    date: "2011-06-01",
    tags: ["defense", "practical"],
    url: "https://www.darkreading.com/cyberattacks-data-breaches/five-steps-to-help-repel-the-lulz-",
    publication: "Dark Reading",
  },
];

export const expertise = [
  {
    category: "AI-Powered Security Products",
    items: [
      "Agentic Application Architecture",
      "Multi-Model Orchestration (Claude, Gemini, Groq)",
      "AI/LLM Integration Testing",
      "Prompt Injection Defense & AI Safety",
    ],
  },
  {
    category: "Offensive Security Engineering",
    items: [
      "Web Application Penetration Testing",
      "Red Team Tooling & Attack Automation",
      "Attack Chaining & Advanced Exploitation",
      "Adversarial Robustness Evaluation",
    ],
  },
  {
    category: "Product & Platform Engineering",
    items: [
      "Full-Stack Prototyping & Rapid Iteration",
      "DAST/SAST Engine Development",
      "Cloud Infrastructure (AWS)",
      "Security Automation at Scale",
    ],
  },
  {
    category: "Research & Communication",
    items: [
      "Published Author (McGraw-Hill)",
      "4x Black Hat Speaker",
      "Customer-Facing Technical Strategy",
      "Open Source Intelligence & Tooling",
    ],
  },
];

export const timeline = [
  {
    period: "2020 - Present",
    role: "Principal Technology Strategist",
    company: "Bishop Fox",
    description:
      "Built and shipped Cosmos, an AI-powered application security testing product. Building agentic systems that autonomously test web applications at scale. Working directly with enterprise customers and cross-functional teams across product, sales, and research.",
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
      "Built the dynamic analysis (DAST) engine for WebInspect and the static analysis engine for DevInspect. Commercial cybersecurity products used by thousands of enterprises. SPI Dynamics acquired by Hewlett-Packard in 2007 on the strength of this product line.",
  },
];
