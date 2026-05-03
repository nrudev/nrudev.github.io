import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { About } from "@/components/About";
import { Article } from "@/components/Article";
import { CTA, Footer } from "@/components/Footer";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { TopNav } from "@/components/TopNav";
import { Writing } from "@/components/Writing";
import { TweaksPanel, TweakSection, TweakRadio, useTweaks } from "@/tweaks";
import { parseRoute } from "@/lib";
import type { PostMeta, Route, Theme } from "@/types";
import "@/styles.css";

type Tweaks = {
  [key: string]: unknown;
  theme: Theme;
};

const TWEAK_DEFAULTS: Tweaks = {
  theme: "light",
};

function App() {
  const [tweaks, setTweak] = useTweaks<Tweaks>(TWEAK_DEFAULTS);
  const theme: Theme = tweaks.theme ?? "light";
  const [route, setRoute] = useState<Route>(parseRoute());
  const [posts, setPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    fetch("@/posts/index.json")
      .then((r) => (r.ok ? (r.json() as Promise<PostMeta[]>) : []))
      .then((list) => {
        const sorted = [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
        setPosts(sorted);
      })
      .catch(() => setPosts([]));
  }, []);

  const toggleTheme = () =>
    setTweak("theme", theme === "dark" ? "light" : "dark");
  const goPost = (slug: string) => {
    window.location.hash = `#post/${slug}`;
  };
  const goHome = () => {
    window.location.hash = "";
    setRoute({ name: "home" });
  };

  return (
    <>
      <TopNav theme={theme} onToggleTheme={toggleTheme} onBrandClick={goHome} />
      {route.name === "post" ? (
        <Article slug={route.slug} onBack={goHome} />
      ) : (
        <>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Writing posts={posts} onSelect={goPost} />
          <CTA />
        </>
      )}
      <Footer />

      <TweaksPanel title="Tweaks" defaultOpen={false}>
        <TweakSection title="Theme" subtitle="페이지의 전체 톤을 바꿉니다.">
          <TweakRadio
            value={theme}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
            onChange={(v) => setTweak("theme", v as Theme)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = document.getElementById("app");
if (root) createRoot(root).render(<App />);
