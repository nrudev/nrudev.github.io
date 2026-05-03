import { PORTFOLIO } from "@/data";

export function CTA() {
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

export function Footer() {
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
              함께 다루며 신뢰성 있는 시스템을 만들고자 노력합니다.
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
