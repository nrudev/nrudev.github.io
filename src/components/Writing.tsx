import type { PostMeta } from "@/types";
import { ArrowOut } from "@/components/Icons";

interface WritingProps {
  posts: PostMeta[];
  onSelect: (slug: string) => void;
}

export function Writing({ posts, onSelect }: WritingProps) {
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
                onClick={(e) => {
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
