export type ProjectStatus = "Active" | "Iterating" | "Paused" | "Shipped";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  oneLiner: string;
  description: string;
  tags: string[];
  links: {
    demo?: string;
    repo?: string;
  };
  updatedAt: string;
  next?: string;
};

export type LabItem = {
  title: string;
  description: string;
  tags: string[];
  date: string;
  link?: string;
};

export type LogItem = {
  date: string;
  title: string;
  body: string;
  tags: string[];
};

export const siteContent = {
  meta: {
    domain: "todrod.com",
    name: "Todd Rodriguez",
    navTitle: "todrod",
    tagline: "I build systems. I test ideas. I improve things.",
    subline: "AI, education, and experience design.",
    description:
      "Personal operating system for Todd Rodriguez: projects, experiments, and build logs.",
    about: [
      "I like turning rough ideas into working systems that people can actually use.",
      "Most of my work sits at the edge of AI workflows, practical education tools, and product experience design.",
      "I ship quickly, measure what matters, and refine in public.",
      "This site is my builder dashboard: what I am making, what I am testing, and what I am learning.",
    ],
    contact: {
      email: "mailto:hello@todrod.com",
      socials: [
        { label: "GitHub", href: "#" },
        { label: "X", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
  },
  projects: [
    {
      slug: "the-goofy-trooper",
      name: "The Goofy Trooper",
      status: "Active",
      oneLiner: "Disney day-planning platform with practical park tools and dashboards.",
      description:
        "A production Next.js app focused on Disney planning: wait-time views, park utilities, dining tooling, and lightweight social features. Current work is focused on UI hardening, stability, and simpler operations.",
      tags: ["Next.js", "Supabase", "VPS", "Product Ops"],
      links: {
        demo: "https://www.thegoofytrooper.com",
      },
      updatedAt: "2026-02-21",
      next: "Tighten release automation and improve mobile-first navigation consistency.",
    },
    {
      slug: "todd-echo-bootcamp",
      name: "Todd Echo Bootcamp",
      status: "Iterating",
      oneLiner: "A practical learning system for rapid AI skill transfer.",
      description:
        "A cohort-style learning framework that converts real workflows into repeatable training loops. The core is short cycles: explain, build, test, and reflect with clear artifacts.",
      tags: ["Education", "AI", "Curriculum"],
      links: {
        repo: "#",
      },
      updatedAt: "2026-02-19",
      next: "Lock in module templates and learner progress checkpoints.",
    },
    {
      slug: "openclaw-experiments",
      name: "OpenClaw Experiments",
      status: "Active",
      oneLiner: "Operational experiments for multi-agent workflows and deployment reliability.",
      description:
        "A set of tested patterns for agent routing, fallback behavior, and environment reliability. Focus is on reducing friction in real usage, especially when tasks cross coding and ops boundaries.",
      tags: ["Agents", "Automation", "Reliability"],
      links: {
        repo: "#",
      },
      updatedAt: "2026-02-20",
      next: "Add clearer model routing rules and tighter failure diagnostics.",
    },
    {
      slug: "spanish-voice-bot",
      name: "Spanish Voice Bot",
      status: "Paused",
      oneLiner: "Conversational practice bot for real-world Spanish fluency drills.",
      description:
        "Prototype voice assistant for short, scenario-based speaking practice. Paused while core content scaffolding and scoring logic are being redesigned.",
      tags: ["Voice", "Language Learning", "Prototype"],
      links: {
        demo: "#",
      },
      updatedAt: "2026-01-28",
      next: "Restart with a narrower MVP around role-play sessions and session summaries.",
    },
    {
      slug: "ops-release-playbook",
      name: "Ops Release Playbook",
      status: "Shipped",
      oneLiner: "A repeatable deployment playbook for solo-operated products.",
      description:
        "A simple release framework with preflight checks, clean-build strategy, environment validation, and post-deploy health verification. Built to reduce avoidable breakage.",
      tags: ["DevOps", "Playbooks", "Quality"],
      links: {
        repo: "#",
      },
      updatedAt: "2026-02-10",
      next: "Keep this stable and fold lessons into future project templates.",
    },
  ] satisfies Project[],
  lab: [
    {
      title: "Festival App Workflow",
      description: "Operational flow for volunteer intake, admin scheduling, assignment review, and day-of execution.",
      tags: ["Scheduling", "Workflow", "Operations"],
      date: "2026-02-28",
      link: "/lab/festival-workflow",
    },
    {
      title: "Prompt Compression Tests",
      description: "Comparing long vs constrained prompts for consistent output quality.",
      tags: ["LLM", "Prompting"],
      date: "2026-02-20",
    },
    {
      title: "Model Routing Heuristics",
      description: "Rules for selecting smaller models before escalating to flagship models.",
      tags: ["Routing", "Cost"],
      date: "2026-02-19",
    },
    {
      title: "Voice-to-Task Parser",
      description: "Converting short voice notes into structured action lists.",
      tags: ["Speech", "Productivity"],
      date: "2026-02-17",
    },
    {
      title: "Deployment Error Triage",
      description: "Cataloging recurring CI/CD failures and writing deterministic fixes.",
      tags: ["CI/CD", "Reliability"],
      date: "2026-02-16",
    },
    {
      title: "Micro-Curriculum Generator",
      description: "Auto-generating 30-minute learning modules from raw notes.",
      tags: ["Education", "Automation"],
      date: "2026-02-12",
    },
    {
      title: "Personal Dashboard Density",
      description: "Testing card density and readability on mobile for builder dashboards.",
      tags: ["UX", "Mobile"],
      date: "2026-02-09",
    },
    {
      title: "Geo-Triggered Checklist",
      description: "Location-aware checklist prompts for on-site workflows.",
      tags: ["Geolocation", "Checklists"],
      date: "2026-02-07",
    },
  ] satisfies LabItem[],
  log: [
    {
      date: "2026-02-21",
      title: "Stabilized deploy pipeline checks",
      body: "Tightened install verification logic in deployment to avoid false negatives from package layout differences.",
      tags: ["Deploy", "Reliability"],
    },
    {
      date: "2026-02-20",
      title: "Refined mobile navigation behavior",
      body: "Resolved click-layer conflicts and improved z-index strategy so mobile menu actions are deterministic.",
      tags: ["UI", "Mobile"],
    },
    {
      date: "2026-02-20",
      title: "Consolidated dashboard routing",
      body: "Reworked route organization to reduce ambiguity between feature sections and internal tools.",
      tags: ["Architecture"],
    },
    {
      date: "2026-02-19",
      title: "Moved env checks earlier",
      body: "Added preflight runtime key checks before build to fail fast and reduce wasted deployment cycles.",
      tags: ["DevOps", "Environment"],
    },
    {
      date: "2026-02-18",
      title: "Documented auth troubleshooting flow",
      body: "Wrote a concise runbook for magic-link issues and invalid-session edge cases.",
      tags: ["Auth", "Docs"],
    },
    {
      date: "2026-02-16",
      title: "Reduced visual noise on home",
      body: "Cut redundant UI blocks and focused hero actions to make primary paths obvious.",
      tags: ["UX", "Product"],
    },
    {
      date: "2026-02-14",
      title: "Set up baseline release cadence",
      body: "Standardized local test, push, and VPS deploy steps for faster weekly iterations.",
      tags: ["Process"],
    },
  ] satisfies LogItem[],
};

export const projectStatuses: ProjectStatus[] = ["Active", "Iterating", "Paused", "Shipped"];
