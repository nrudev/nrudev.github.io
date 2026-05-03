export interface NavItem {
  label: string;
  href: string;
}

export interface ExperienceSummary {
  name: string;
  period: string;
  summary: string[];
  stack?: string[];
}

export interface ExperienceItem {
  company: string;
  team: string;
  role: string;
  period: string;
  durationLabel?: string;
  summary: ExperienceSummary[];
}

export interface ProjectItem {
  title: string;
  summary: string;
  stack: string[];
  href?: string;
  placeholder?: boolean;
}

export interface PortfolioData {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  githubHandle: string;
  available: string;
  heroIntro: string;
  about: string[];
  primaryStack: string[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  nav: NavItem[];
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
}

export interface ParsedFrontMatter {
  meta: Partial<PostMeta>;
  body: string;
}

export type Theme = "light" | "dark";

export type Route = { name: "home" } | { name: "post"; slug: string };
