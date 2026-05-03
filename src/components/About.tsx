import { PORTFOLIO } from "@/data";

export function About() {
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
