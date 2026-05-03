import type { ParsedFrontMatter, PostMeta } from "@/types";

const FRONT_MATTER_RE = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/;

/**
 * Lightweight YAML-ish front matter parser.
 * Supports `key: value` and `key: [a, b, c]` (string array).
 */
export function parseFrontMatter(raw: string): ParsedFrontMatter {
  const m = raw.match(FRONT_MATTER_RE);
  if (!m) return { meta: {}, body: raw };
  const [, head = "", body = ""] = m;

  const meta: Record<string, string | string[]> = {};
  for (const line of head.split(/\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const rawVal = line.slice(idx + 1).trim();
    if (rawVal.startsWith("[") && rawVal.endsWith("]")) {
      meta[key] = rawVal
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      meta[key] = rawVal.replace(/^["']|["']$/g, "");
    }
  }

  return { meta: meta as Partial<PostMeta>, body };
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;",
  );
}

export function parseRoute(): import("./types").Route {
  const h = window.location.hash || "";
  const m = h.match(/^#post\/(.+)$/);
  if (m && m[1]) return { name: "post", slug: decodeURIComponent(m[1]) };
  return { name: "home" };
}
