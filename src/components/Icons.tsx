interface IconProps {
  size?: number;
  className?: string;
}

export function Spike({ size = 18, className = "spike" }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <path d="M12 1.5c.4 0 .7.3.8.7l1.4 7.6c.1.5.5.9 1 1l7.6 1.4c.4.1.7.4.7.8s-.3.7-.7.8l-7.6 1.4c-.5.1-.9.5-1 1l-1.4 7.6c-.1.4-.4.7-.8.7s-.7-.3-.8-.7l-1.4-7.6c-.1-.5-.5-.9-1-1l-7.6-1.4c-.4-.1-.7-.4-.7-.8s.3-.7.7-.8l7.6-1.4c.5-.1.9-.5 1-1l1.4-7.6c.1-.4.4-.7.8-.7z" />
      </g>
    </svg>
  );
}

export function ArrowOut() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
