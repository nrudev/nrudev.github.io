import { PORTFOLIO } from "@/data";

function ProfileCard() {
  return (
    <aside className="profile-card">
      <div className="profile-img-wrap">
        <img src="./assets/profile.jpg" alt={`${PORTFOLIO.name} 프로필 사진`} />
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

export function Hero() {
  const firstWord = PORTFOLIO.role.split(" ")[0] ?? "";
  const restWords = PORTFOLIO.role.split(" ").slice(1).join(" ") || "Engineer";

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
              {firstWord} <em>{restWords}</em> who values quiet, durable
              systems.
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
                <dd>{PORTFOLIO.experience[0]?.company ?? "—"}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Fullstack</dd>
              </div>
            </dl>
          </div>

          <ProfileCard />
        </div>
      </div>
    </section>
  );
}
