import { useEffect, useState } from "react";
import { marked } from "marked";
import { escapeHtml, parseFrontMatter } from "@/lib";
import type { PostMeta } from "@/types";

interface ArticleProps {
  slug: string;
  onBack: () => void;
}

interface ArticleState {
  loading: boolean;
  meta: Partial<PostMeta>;
  html: string;
}

export function Article({ slug, onBack }: ArticleProps) {
  const [state, setState] = useState<ArticleState>({
    loading: true,
    meta: {},
    html: "",
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`./posts/${slug}.md`);
        if (!res.ok) throw new Error("not found");
        const raw = await res.text();
        const { meta, body } = parseFrontMatter(raw);
        const html = await Promise.resolve(marked.parse(body));
        if (!cancelled) {
          setState({
            loading: false,
            meta,
            html: typeof html === "string" ? html : escapeHtml(body),
          });
        }
      } catch {
        if (!cancelled) {
          setState({
            loading: false,
            meta: {},
            html: "<p>글을 불러오지 못했습니다.</p>",
          });
        }
      }
    }
    load();
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state.loading) {
    return (
      <section className="article-section">
        <div className="container">
          <div className="article">
            <div className="post-empty">불러오는 중…</div>
          </div>
        </div>
      </section>
    );
  }

  const m = state.meta;
  return (
    <section className="article-section">
      <div className="container">
        <article className="article">
          <a
            className="back"
            href="#writing"
            onClick={(e) => {
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
