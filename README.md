# Portfolio

구희승 — Backend Engineer 의 개인 포트폴리오. **Vite + React + TypeScript** 로 빌드하고 GitHub Pages 에 배포합니다.

## 개발

```bash
npm install
npm run dev          # http://localhost:5173
npm run typecheck    # 타입 검사 (CI 용)
npm run build        # dist/ 산출물 생성
npm run preview      # 빌드 산출물 로컬 미리보기
```

## 콘텐츠 편집

| 무엇을          | 어디서                                          |
| --------------- | ----------------------------------------------- |
| 이름·소개·경력  | `src/data.ts`                                   |
| 사이드 프로젝트 | `src/data.ts` 의 `projects` 배열                |
| 프로필 사진     | `public/assets/profile.jpg`                     |
| 블로그 글       | `public/posts/*.md` + `public/posts/index.json` |
| 색·여백·타입    | `src/styles.css`                                |

`src/data.ts` 의 모든 필드는 `src/types.ts` 의 인터페이스로 타입 보호됩니다.

## 블로그 글 추가

1. `public/posts/내-글.md` 작성:

   ```
   ---
   title: 제목
   date: 2026-05-03
   summary: 한 줄 요약
   tags: [tag1, tag2]
   ---

   본문 markdown…
   ```

2. `public/posts/index.json` 에 항목 추가 (slug 는 파일명):
   ```json
   {
     "slug": "내-글",
     "title": "...",
     "date": "...",
     "summary": "...",
     "tags": []
   }
   ```

## GitHub Pages 배포

`.github/workflows/deploy.yml` 가 main 브랜치 push 마다 빌드하고 Pages 에 배포합니다.
저장소 Settings → Pages → Source = "GitHub Actions" 로 설정하세요.

저장소가 `nrudev.github.io/portfolio` 같은 프로젝트 페이지라면 `vite.config.ts` 의
`base` 를 `"/portfolio/"` 로 바꾸면 됩니다. 사용자 페이지 (`nrudev.github.io`)
라면 `"./"` 또는 `"/"` 그대로 두세요.
