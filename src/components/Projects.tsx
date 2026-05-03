import { PORTFOLIO } from "../data";
import type { ProjectItem } from "../types";
import { ArrowOut } from "./Icons";

interface ProjCardProps {
  proj: ProjectItem;
  index: number;
}

function ProjCard({ proj, index }: ProjCardProps) {
  if (proj.placeholder) {
    return (
      <div className="proj-card placeholder">
        <p>{proj.summary}</p>
      </div>
    );
  }

  const external = Boolean(proj.href);
  const num = `/ ${String(index + 1).padStart(2, "0")}`;

  return (
    <a
      className="proj-card flip"
      href={proj.href || "#"}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`${proj.title} — ${proj.summary}`}
    >
      <div className="flip-inner">
        {/* Front — screenshot */}
        <div className="flip-face flip-front">
          {proj.image ? (
            <img
              className="flip-shot"
              src={proj.image}
              alt={`${proj.title} screenshot`}
              loading="lazy"
            />
          ) : (
            <div className="flip-shot flip-shot-fallback" aria-hidden="true" />
          )}
          <div className="flip-front-overlay">
            <span className="flip-num">{num}</span>
            <span className="flip-meta">{proj.meta || proj.title}</span>
          </div>
        </div>

        {/* Back — details */}
        <div className="flip-face flip-back">
          <div className="num">{num}</div>
          <div className="row">
            <h3>{proj.title}</h3>
            <span className="arrow">
              <ArrowOut />
            </span>
          </div>
          <p className="proj-period">{proj.period}</p>
          <p className="proj-role">역할: {proj.role}</p>
          {proj.summary && proj.summary.length > 0 && (
            <ul className="proj-summary">
              {proj.summary.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
          {proj.stack && proj.stack.length > 0 && (
            <div className="proj-stack">
              {proj.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

export function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="sec-head">
          <div className="left">
            <div className="eyebrow">Side Projects</div>
            <h2 className="display-lg">곁에서 만들어 본 것들.</h2>
            <p className="desc">
              업무 바깥에서 시도해 본 작은 실험과 도구들. 카드에 마우스를 올리면
              프로젝트 정보를 볼 수 있습니다.
            </p>
          </div>
        </div>
        <div className="proj-grid">
          {PORTFOLIO.projects.map((proj: ProjectItem, i: number) => (
            <ProjCard key={i} proj={proj} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
