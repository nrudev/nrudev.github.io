import { type ReactNode, useId, useState } from "react";

interface AccordionProps {
  title: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Accordion({
  title,
  meta,
  children,
  defaultOpen = false,
  className = "",
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className={`accordion ${isOpen ? "open" : ""} ${className}`.trim()}>
      <button
        className="accordion-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="accordion-title">{title}</span>
        <span className="accordion-meta">{meta}</span>
        <span className="accordion-icon" aria-hidden="true" />
      </button>
      <div
        className="accordion-content"
        id={contentId}
        role="region"
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}
