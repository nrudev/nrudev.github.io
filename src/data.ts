import type { PortfolioData } from "@/types";

export const PORTFOLIO: PortfolioData = {
  name: "구희승",
  role: "Full-stack Developer",
  location: "Seoul, KR",
  email: "nrudev@naver.com",
  github: "https://github.com/nrudev",
  githubHandle: "nrudev",
  available: "신규 합류·협업 문의 열려 있음",

  heroIntro:
    "금융 도메인을 중심으로 백엔드 시스템과 사용자 인터페이스 사이의 연결을 설계합니다. 사용자의 입장에서 고민하고 코드로 표현하는 과정을 즐깁니다.",

  about: [
    "미래에셋생명 마이데이터, 네이버파이낸셜 Npay Biz 결제 솔루션 등 금융권 프로젝트에 주로 참여하였습니다.",
    "Spring Boot · Kotlin 기반의 서버 작업과 React · TypeScript 기반의 UI 작업 사이에서 양쪽 맥락을 함께 잡는 역할을 즐깁니다.",
  ],

  primaryStack: [
    "Kotlin",
    "Java",
    "Spring Boot",
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
  ],

  experience: [
    {
      company: "지음지식서비스",
      team: "B/E개발팀",
      role: "Full-stack Developer",
      period: "2022.02 — 현재",
      durationLabel: "현재 진행중",
      summary: [
        {
          name: "네이버파이낸셜 Npay Biz 결제 솔루션 홈페이지 및 어드민 시스템 구축",
          period: "2024.09 - 현재",
          summary: [
            "Npay Biz 결제 솔루션의 정산 및 운영 관리를 위한 통합 어드민 시스템 백엔드 개발",
            "https://npaybiz.com",
          ],
          stack: ["Kotlin", "Spring Boot"],
        },
        {
          name: "메리츠화재 AI PoC용 화면 개발",
          period: "2024.02 - 2024.08",
          summary: [
            "보험사 인·아웃바운드 상담 효율화를 위한 AI 통화 요약 및 의료 진단서 AI 자동 분석 솔루션 인터페이스 개발",
          ],
          stack: ["React", "TypeScript", "Vite", "Python"],
        },
        {
          name: "Zwave AI E-News 화면 개발",
          period: "2023.06 - 2024.02",
          summary: [
            "경제 뉴스 및 증권사 리포트 요약에 특화된 LLM 파인튜닝 기반 AI 어시스턴트 인터페이스 개발",
            "사내 AI 개발 역량 실증을 위한 전략 프로젝트 수행 및 B2B 대외 영업용 기술 모델 구축",
          ],
          stack: ["React", "TypeScript", "Vite"],
        },
        {
          name: "Zwave-Converter 화면 개발",
          period: "2023.02 - 2023.06",
          summary: [
            "금융 전문 데이터의 JSON 파싱 및 시각화를 위한 전용 솔루션 화면 구현",
          ],
          stack: ["React", "JavaScript"],
        },
        {
          name: "미래에셋생명 마이데이터 사업자 서비스 구축",
          period: "2022.09 - 2023.02",
          summary: [
            "마이데이터 사업자 표준 규격 대응을 위한 기존 솔루션 최적화 및 시스템 아키텍처 고도화",
          ],
          stack: ["Node.js", "JavaScript"],
        },
      ],
    },
  ],

  projects: [
    {
      title: "가상화폐 자동매매 솔루션 - 오아시스",
      summary: "https://cloud.oasisbot24.com",
      stack: ["JavaScript", "TypeScript", "React.js", "Next.js"],
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
