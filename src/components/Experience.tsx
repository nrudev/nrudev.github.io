import { PORTFOLIO } from "@/data";
import { Accordion } from "@/components/Accordion";
import type { ExperienceItem, ExperienceSummary } from "@/types";

interface ExperienceCardProps {
  job: ExperienceItem;
  index: number;
}

function ExperienceProject({
  project,
  stack,
}: {
  project: ExperienceSummary;
  stack: string[];
}) {
  return (
    <Accordion
      className="experience-project"
      title={project.name}
      meta={project.period}
    >
      <ul className="project-summary-list">
        {project.summary.map((summary) => (
          <li key={summary}>{summary}</li>
        ))}
      </ul>
      {stack.length > 0 && (
        <div className="project-stack">
          {stack.map((stackItem) => (
            <span key={stackItem} className="chip">
              {stackItem}
            </span>
          ))}
        </div>
      )}
    </Accordion>
  );
}

function ExperienceCard({ job, index }: ExperienceCardProps) {
  return (
    <div className="tl-item">
      <div className="tl-period">
        <div>{job.period}</div>
        {index === 0 && job.durationLabel && (
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
            /0{index + 1}
          </span>
        </div>
        <div className="company">
          <span className="swatch"></span>
          {job.company} · {job.team}
        </div>
        <div className="summary">
          {job.summary.map((project) => (
            <ExperienceProject
              key={`${project.name}-${project.period}`}
              project={project}
              stack={project.stack || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <div className="sec-head">
          <div className="left">
            <div className="eyebrow">Experience</div>
            <h2 className="display-lg">함께 만들어 온 일들.</h2>
            <p className="desc">
              금융 도메인의 안정적인 백엔드 설계를 기반으로, 사용자 경험의
              접점까지 고민하며 제품의 완성도를 높여온 기록들입니다.
            </p>
          </div>
        </div>
        <div className="timeline">
          {PORTFOLIO.experience.map((job, i) => (
            <ExperienceCard job={job} index={i} key={`${job.company}-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
