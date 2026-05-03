declare const React: any;
declare const ReactDOM: any;
declare const marked: { parse: (s: string) => string };

const { useState, useEffect, useCallback } = React;

/* ===== Types ===== */
interface NavItem {
  label: string;
  href: string;
}
interface ExperienceItem {
  company: string;
  team: string;
  role: string;
  period: string;
  durationLabel?: string;
  summary: string;
  stack: string[];
}
interface ProjectItem {
  title: string;
  summary: string;
  stack: string[];
  href?: string;
  placeholder?: boolean;
}
interface PortfolioData {
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
interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
}
type Theme = "light" | "dark";
type Route = { name: "home" } | { name: "post"; slug: string };

/* ===== Data ===== */
const PORTFOLIO: PortfolioData = {
  name: "구희승",
  role: "Backend Engineer",
  location: "Seoul, KR",
  email: "nrudev@naver.com",
  github: "https://github.com/nrudev",
  githubHandle: "nrudev",
  available: "신규 합류·협업 문의 열려 있음",
  heroIntro:
    "금융 도메인을 중심으로 백엔드 시스템과 사용자 인터페이스 사이의 연결을 설계합니다. 견고한 데이터 흐름과 차분한 UI를 만들고자 합니다.",
  about: [
    "BE 개발팀에서 일하고 있습니다. 금융권 프로젝트에 주로 참여하였습니다.",
    "Spring Boot · Kotlin 기반의 서버 작업과 React · TypeScript 기반의 UI 작업 사이에서 양쪽 맥락을 함께 잡는 역할을 즐깁니다.",
  ],
  primaryStack: [
    "Kotlin",
    "Java",
    "Spring Boot",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
  ],
  experience: [
    {
      company: "지음지식서비스",
      team: "B/E개발팀",
      role: "Backend Engineer",
      period: "2022.02 — 현재",
      durationLabel: "현재 진행중",
      summary:
        "금융권을 중심으로 한 프로젝트에 참여하며 안정성과 운영 편의를 함께 고려한 시스템을 만들어 왔습니다.",
      stack: ["Kotlin", "Spring Boot", "JavaScript", "TypeScript", "React"],
    },
  ],
  projects: [
    {
      title: "프로젝트를 추가해주세요",
      summary:
        "src/data.ts 파일의 projects 배열에 사이드 프로젝트를 추가하면 이 자리에 표시됩니다.",
      stack: [],
      placeholder: true,
    },
  ],
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Writing", href: "#writing" },
    { label: "Contact", href: "#contact" },
  ],
};

/* ===== Lib ===== */
function parseFrontMatter(raw: string): {
  meta: Partial<PostMeta>;
  body: string;
} {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, any> = {};
  (m[1] as string).split(/\n/).forEach((line: string) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val: any = line.slice(idx + 1).trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s: string) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      val = val.replace(/^["']|["']$/g, "");
    }
    meta[key] = val;
  });
  return { meta: meta as Partial<PostMeta>, body: m[2] || "" };
}
function parseRoute(): Route {
  const h = window.location.hash || "";
  const m = h.match(/^#post\/(.+)$/);
  if (m && m[1]) return { name: "post", slug: decodeURIComponent(m[1]) };
  return { name: "home" };
}

/* ===== Icons ===== */
function Spike({ size = 18 }: { size?: number }) {
  return (
    <svg
      className="spike"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <path d="M12 1.5c.4 0 .7.3.8.7l1.4 7.6c.1.5.5.9 1 1l7.6 1.4c.4.1.7.4.7.8s-.3.7-.7.8l-7.6 1.4c-.5.1-.9.5-1 1l-1.4 7.6c-.1.4-.4.7-.8.7s-.7-.3-.8-.7l-1.4-7.6c-.1-.5-.5-.9-1-1l-7.6-1.4c-.4-.1-.7-.4-.7-.8s.3-.7.7-.8l7.6-1.4c.5-.1.9-.5 1-1l1.4-7.6c.1-.4.4-.7.8-.7z" />
      </g>
    </svg>
  );
}
function ArrowOut() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ===== TopNav ===== */
function TopNav({
  theme,
  onToggleTheme,
  onBrandClick,
}: {
  theme: Theme;
  onToggleTheme: () => void;
  onBrandClick: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`top-nav${scrolled ? " scrolled" : ""}`}>
      <div className="container top-nav-inner">
        <a
          href="#top"
          className="brand"
          onClick={(e: any) => {
            e.preventDefault();
            onBrandClick();
          }}
        >
          <Spike />
          <span>{PORTFOLIO.name}</span>
        </a>
        <div className="nav-links">
          {PORTFOLIO.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle theme"
            onClick={onToggleTheme}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            className="btn btn-primary"
            href={PORTFOLIO.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowOut />
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ===== Hero ===== */
function ProfileCard() {
  return (
    <aside className="profile-card">
      <div className="profile-img-wrap">
        <img
          src="public/assets/profile.jpg"
          alt={`${PORTFOLIO.name} 프로필 사진`}
        />
      </div>
      <div className="profile-meta">
        <div>
          <div className="name">{PORTFOLIO.name}</div>
          <div className="role">
            {PORTFOLIO.role} · {PORTFOLIO.location}
          </div>
        </div>
        <div className="index">/ 01</div>
      </div>
    </aside>
  );
}
function Hero() {
  const first = PORTFOLIO.role.split(" ")[0] || "";
  const rest = PORTFOLIO.role.split(" ").slice(1).join(" ") || "Engineer";
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow">
              <span className="dot"></span>
              <span className="eyebrow">{PORTFOLIO.available}</span>
            </div>
            <h1 className="display-xl">
              {first} <em>{rest}</em> who values quiet, durable systems.
            </h1>
            <p className="lead">{PORTFOLIO.heroIntro}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#projects">
                Projects 보기
              </a>
              <a className="btn btn-secondary" href="#contact">
                연락하기
              </a>
            </div>
            <dl className="hero-meta">
              <div>
                <dt>Live in</dt>
                <dd>{PORTFOLIO.location}</dd>
              </div>
              <div>
                <dt>Currently</dt>
                <dd>{PORTFOLIO.experience[0]?.company || "—"}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Backend / Fintech</dd>
              </div>
            </dl>
          </div>
          <ProfileCard />
        </div>
      </div>
    </section>
  );
}

/* ===== About ===== */
function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="label">
            <div className="eyebrow">About</div>
            <div
              className="display-md"
              style={{ marginTop: 16, maxWidth: 280 }}
            >
              한 줄로 요약하면.
            </div>
          </div>
          <div>
            {PORTFOLIO.about.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <div className="stack-row">
              {PORTFOLIO.primaryStack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Experience ===== */
function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <div className="sec-head">
          <div className="left">
            <div className="eyebrow">Experience</div>
            <h2 className="display-lg">함께 만들어 온 일들.</h2>
            <p className="desc">
              금융 도메인의 백엔드 시스템을 중심으로, 운영과 신뢰성에 무게를 둔
              작업들입니다.
            </p>
          </div>
        </div>
        <div className="timeline">
          {PORTFOLIO.experience.map((job, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-period">
                <div>{job.period}</div>
                {i === 0 && job.durationLabel && (
                  <div className="now">{job.durationLabel}</div>
                )}
              </div>
              <div className="tl-body">
                <div className="role-row">
                  <h3>{job.role}</h3>
                  <span
                    className="caption"
                    style={{ fontFamily: "var(--mono)", fontSize: 12 }}
                  >
                    /0{i + 1}
                  </span>
                </div>
                <div className="company">
                  <span className="swatch"></span>
                  {job.company} · {job.team}
                </div>
                <p>{job.summary}</p>
                <div className="tl-stack">
                  {job.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Projects ===== */
function ProjCard({ proj, index }: { proj: ProjectItem; index: number }) {
  if (proj.placeholder)
    return (
      <div className="proj-card placeholder">
        <p>{proj.summary}</p>
      </div>
    );
  const ext = Boolean(proj.href);
  return (
    <a
      className="proj-card"
      href={proj.href || "#"}
      target={ext ? "_blank" : undefined}
      rel={ext ? "noopener noreferrer" : undefined}
    >
      <div className="num">/ {String(index + 1).padStart(2, "0")}</div>
      <div className="row">
        <h3>{proj.title}</h3>
        <span className="arrow">
          <ArrowOut />
        </span>
      </div>
      <p>{proj.summary}</p>
      {proj.stack && proj.stack.length > 0 && (
        <div className="proj-stack">
          {proj.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="sec-head">
          <div className="left">
            <div className="eyebrow">Side Projects</div>
            <h2 className="display-lg">곁에서 만들어 본 것들.</h2>
            <p className="desc">
              업무 바깥에서 시도해 본 작은 실험과 도구들. 시간이 닿는 만큼
              천천히 키워가고 있습니다.
            </p>
          </div>
        </div>
        <div className="proj-grid">
          {PORTFOLIO.projects.map((proj, i) => (
            <ProjCard key={i} proj={proj} index={i} />
          ))}
          <div className="proj-card placeholder">
            <p>
              새 프로젝트는{" "}
              <span
                style={{ fontFamily: "var(--mono)", color: "var(--on-dark)" }}
              >
                src/data.ts
              </span>{" "}
              의<br />
              <span
                style={{ fontFamily: "var(--mono)", color: "var(--on-dark)" }}
              >
                projects[]
              </span>{" "}
              에 추가하세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Writing & Article ===== */
function Writing({
  posts,
  onSelect,
}: {
  posts: PostMeta[];
  onSelect: (s: string) => void;
}) {
  return (
    <section className="writing-section" id="writing">
      <div className="container">
        <div className="sec-head">
          <div className="left">
            <div className="eyebrow">Writing</div>
            <h2 className="display-lg">기록해 두는 글들.</h2>
            <p className="desc">
              다루었던 문제와 작은 결정들을 흩어지지 않게 모아두는 자리입니다.
            </p>
          </div>
        </div>
        {posts.length === 0 ? (
          <div className="post-empty">아직 글이 없습니다.</div>
        ) : (
          <div className="post-list">
            {posts.map((p) => (
              <a
                key={p.slug}
                className="post-row"
                href={`#post/${p.slug}`}
                onClick={(e: any) => {
                  e.preventDefault();
                  onSelect(p.slug);
                }}
              >
                <span className="date">{p.date}</span>
                <span>
                  <span className="title">{p.title}</span>
                  {p.summary && <div className="summary">{p.summary}</div>}
                </span>
                <span className="arrow">
                  <ArrowOut />
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
function Article({ slug, onBack }: { slug: string; onBack: () => void }) {
  const [state, setState] = useState<{
    loading: boolean;
    meta: Partial<PostMeta>;
    html: string;
  }>({ loading: true, meta: {}, html: "" });
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`public/posts/${slug}.md`);
        if (!res.ok) throw new Error("not found");
        const raw = await res.text();
        const { meta, body } = parseFrontMatter(raw);
        const html = marked.parse(body);
        if (!cancelled) setState({ loading: false, meta, html });
      } catch {
        if (!cancelled)
          setState({
            loading: false,
            meta: {},
            html: "<p>글을 불러오지 못했습니다.</p>",
          });
      }
    })();
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    return () => {
      cancelled = true;
    };
  }, [slug]);
  if (state.loading)
    return (
      <section className="article-section">
        <div className="container">
          <div className="article">
            <div className="post-empty">불러오는 중…</div>
          </div>
        </div>
      </section>
    );
  const m = state.meta;
  return (
    <section className="article-section">
      <div className="container">
        <article className="article">
          <a
            className="back"
            href="#writing"
            onClick={(e: any) => {
              e.preventDefault();
              onBack();
            }}
          >
            ← Writing 으로 돌아가기
          </a>
          <div className="meta">
            {m.date && <span>{m.date}</span>}
            {m.tags && m.tags.length > 0 && <span>· {m.tags.join(" · ")}</span>}
          </div>
          <h1>{m.title || slug}</h1>
          {m.summary && <p className="lead">{m.summary}</p>}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: state.html }}
          />
        </article>
      </div>
    </section>
  );
}

/* ===== CTA + Footer ===== */
function CTA() {
  return (
    <section id="contact" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>함께 만들 일이 있다면, 편하게 말 걸어주세요.</h2>
            <p>
              합류 제안, 사이드 프로젝트, 혹은 소소한 기술 이야기까지 모두
              환영합니다.
            </p>
          </div>
          <div className="actions">
            <a className="btn btn-on-coral" href={`mailto:${PORTFOLIO.email}`}>
              이메일 보내기
            </a>
            <a className="email" href={`mailto:${PORTFOLIO.email}`}>
              {PORTFOLIO.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="brand-block">
            <div className="brand">
              <span>{PORTFOLIO.name}</span>
            </div>
            <p>
              {PORTFOLIO.role} · {PORTFOLIO.location}. 백엔드와 프론트엔드를
              함께 다루며 신뢰성 있는 시스템을 만듭니다.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Sections</h4>
              <ul>
                {PORTFOLIO.nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Elsewhere</h4>
              <ul>
                <li>
                  <a
                    href={PORTFOLIO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub @{PORTFOLIO.githubHandle}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${PORTFOLIO.email}`}>{PORTFOLIO.email}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {year} {PORTFOLIO.name}. All rights reserved.
          </span>
          <span>Built with care · Seoul</span>
        </div>
      </div>
    </footer>
  );
}

/* ===== Tweaks ===== */
function useTweaks<T extends Record<string, any>>(
  defaults: T,
): [T, (k: keyof T | Partial<T>, v?: any) => void] {
  const [values, setValues] = useState<T>(defaults);
  const setTweak = useCallback((k: any, v?: any) => {
    const edits = typeof k === "object" && k !== null ? k : { [k]: v };
    setValues((prev: T) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits }, "*");
  }, []);
  return [values, setTweak];
}
function TweaksPanel({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onMsg = (ev: MessageEvent) => {
      const t = (ev.data || {}).type;
      if (t === "__activate_edit_mode") setOpen(true);
      else if (t === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        width: 280,
        background: "var(--canvas)",
        border: "1px solid var(--hairline)",
        borderRadius: 12,
        padding: 16,
        zIndex: 1000,
        boxShadow: "0 8px 24px rgba(20,20,19,0.08)",
        fontFamily: "var(--sans)",
        color: "var(--ink)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <strong style={{ fontSize: 14, fontWeight: 600 }}>Tweaks</strong>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
          }}
          aria-label="Close"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--muted)",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
      {children}
    </div>
  );
}
function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (t: Theme) => void;
}) {
  const opts: { value: Theme; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
        Theme
      </div>
      <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
        페이지의 전체 톤을 바꿉니다.
      </div>
      <div
        role="radiogroup"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 4,
          background: "var(--surface-card)",
          padding: 4,
          borderRadius: 8,
        }}
      >
        {opts.map((o) => {
          const active = o.value === theme;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              style={{
                padding: "8px 10px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 500,
                background: active ? "var(--canvas)" : "transparent",
                color: active ? "var(--ink)" : "var(--muted)",
                boxShadow: active ? "0 1px 2px rgba(20,20,19,0.06)" : "none",
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ===== App ===== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ { theme: "light" }; /*EDITMODE-END*/

function App() {
  const [tweaks, setTweak] = useTweaks<{ theme: Theme }>(
    TWEAK_DEFAULTS as { theme: Theme },
  );
  const theme: Theme = tweaks.theme || "light";
  const [route, setRoute] = useState<Route>(parseRoute());
  const [posts, setPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    fetch("public/posts/index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((list: PostMeta[]) =>
        setPosts([...list].sort((a, b) => (a.date < b.date ? 1 : -1))),
      )
      .catch(() => setPosts([]));
  }, []);

  const goPost = (slug: string) => {
    window.location.hash = `#post/${slug}`;
  };
  const goHome = () => {
    window.location.hash = "";
    setRoute({ name: "home" });
  };

  return (
    <>
      <TopNav
        theme={theme}
        onToggleTheme={() =>
          setTweak("theme", theme === "dark" ? "light" : "dark")
        }
        onBrandClick={goHome}
      />
      {route.name === "post" ? (
        <Article slug={route.slug} onBack={goHome} />
      ) : (
        <>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Writing posts={posts} onSelect={goPost} />
          <CTA />
        </>
      )}
      <Footer />
      <TweaksPanel>
        <ThemeToggle theme={theme} onChange={(t) => setTweak("theme", t)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")!).render(<App />);
