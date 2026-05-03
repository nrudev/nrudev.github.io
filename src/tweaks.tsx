import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const PAD = 16;

export function useTweaks<T extends Record<string, unknown>>(
  defaults: T,
): [T, (keyOrEdits: keyof T | Partial<T>, val?: T[keyof T]) => void] {
  const [values, setValues] = useState<T>(defaults);
  const setTweak = useCallback(
    (keyOrEdits: keyof T | Partial<T>, val?: T[keyof T]) => {
      const edits =
        typeof keyOrEdits === "object" && keyOrEdits !== null
          ? (keyOrEdits as Partial<T>)
          : ({ [keyOrEdits as string]: val } as Partial<T>);
      setValues((prev) => ({ ...prev, ...edits }));
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits }, "*");
    },
    [],
  );
  return [values, setTweak];
}

interface TweaksPanelProps {
  title?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function TweaksPanel({
  title = "Tweaks",
  defaultOpen = false,
  children,
}: TweaksPanelProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef({ x: PAD, y: PAD });

  // Register host protocol — listener BEFORE announce.
  useEffect(() => {
    const onMsg = (ev: MessageEvent) => {
      const t = ev.data?.type;
      if (t === "__activate_edit_mode") setOpen(true);
      else if (t === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
  };

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className="tweaks-panel"
      style={{
        position: "fixed",
        right: offsetRef.current.x,
        bottom: offsetRef.current.y,
        width: 280,
        background: "var(--canvas)",
        border: "1px solid var(--hairline)",
        borderRadius: 12,
        padding: 16,
        zIndex: 1000,
        boxShadow: "0 8px 24px rgba(20,20,19,0.08)",
        fontFamily: "var(--sans)",
        color: "var(--ink)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <strong style={{ fontSize: 14, fontWeight: 600 }}>{title}</strong>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close tweaks"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--muted)",
            fontSize: 18,
            lineHeight: 1,
            padding: 4,
          }}
        >
          ×
        </button>
      </div>
      {children}
    </div>
  );
}

interface TweakSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function TweakSection({ title, subtitle, children }: TweakSectionProps) {
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 11,
            color: "var(--muted)",
            marginTop: 2,
            marginBottom: 10,
          }}
        >
          {subtitle}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

interface TweakRadioOption<V extends string> {
  value: V;
  label: string;
}

interface TweakRadioProps<V extends string> {
  value: V;
  options: TweakRadioOption<V>[];
  onChange: (v: V) => void;
}

export function TweakRadio<V extends string>({
  value,
  options,
  onChange,
}: TweakRadioProps<V>) {
  return (
    <div
      role="radiogroup"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        gap: 4,
        background: "var(--surface-card)",
        padding: 4,
        borderRadius: 8,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            style={{
              padding: "8px 10px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 500,
              background: active ? "var(--canvas)" : "transparent",
              color: active ? "var(--ink)" : "var(--muted)",
              boxShadow: active ? "0 1px 2px rgba(20,20,19,0.06)" : "none",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
