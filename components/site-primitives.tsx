import Link from "next/link";
import type { ReactNode } from "react";

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M5 15 15 5" />
      <path d="M7 5h8v8" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="m4.5 10.5 3.2 3.2 7.8-8" />
    </svg>
  );
}

export function ActionLink({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition ${
        variant === "solid"
          ? "bg-[var(--brand)] text-[#0f120f] hover:bg-[var(--brand-strong)]"
          : "border border-white/12 bg-white/4 text-white hover:bg-white/10"
      }`}
    >
      <span>{children}</span>
      <ArrowIcon />
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-[72rem]">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className={`display-title ${eyebrow ? "mt-4" : "mt-0"} max-w-[24ch] text-[2rem] leading-[0.92] text-white sm:max-w-[30ch] sm:text-[2.6rem]`}>
        {title}
      </h2>
      <p className="mt-4 max-w-[72ch] text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
        {description}
      </p>
    </div>
  );
}

export function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="section-card rounded-[1.5rem] px-4 py-4">
      <div className="text-[1.7rem] font-semibold tracking-[-0.04em] text-white">{value}</div>
      <div className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{label}</div>
    </div>
  );
}

export function DetailList({
  items,
  tone = "dark",
}: {
  items: readonly string[];
  tone?: "dark" | "warm";
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
              tone === "warm" ? "bg-black/18 text-[#fff2d5]" : "bg-white/8 text-[var(--brand-strong)]"
            }`}
          >
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          <span className={tone === "warm" ? "text-sm leading-6 text-[#fff1d8]" : "text-sm leading-6 text-[var(--ink-muted)]"}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
