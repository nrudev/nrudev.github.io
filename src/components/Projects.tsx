import { PORTFOLIO } from "@/data";
import type { ProjectItem } from "@/types";
import { ArrowOut } from "@/components/Icons";

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
  return (
    <a
      className="proj-card"
      href={proj.href || "#"}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
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

export function Projects() {
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
        </div>
      </div>
    </section>
  );
}
