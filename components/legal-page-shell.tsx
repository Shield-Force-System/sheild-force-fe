import type { ReactNode } from "react";

type Highlight = {
  label: string;
  value: ReactNode;
};

type LegalSection = {
  title: string;
  content: ReactNode;
};

export function LegalPageShell({
  eyebrow,
  title,
  description,
  highlights,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  highlights: readonly Highlight[];
  sections: readonly LegalSection[];
}) {
  const highlightColumns =
    highlights.length <= 1
      ? "sm:grid-cols-1"
      : highlights.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-3";

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="w-full">
        <header className="border-b border-white/10 pb-8">
          <h1 className="display-title mt-4 text-[2.8rem] leading-[0.92] text-white sm:text-[3.6rem]">
            {title}
          </h1>
          <p className="mt-6 text-base leading-8 text-white/74 sm:text-lg">
            {description}
          </p>
        </header>

        <section className="mt-8 border-b border-white/10 pb-8">
          <dl className={`grid gap-6 ${highlightColumns}`}>
            {highlights.map((item) => (
              <div key={item.label}>
                <dt className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--brand-strong)]">
                  {item.label}
                </dt>
                <dd className="mt-3 text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <article className="mt-10 space-y-10">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className={index === sections.length - 1 ? "" : "border-b border-white/8 pb-10"}
            >
              <h2 className="display-title text-[2rem] leading-[0.95] text-white sm:text-[2.3rem]">
                {section.title}
              </h2>
              <div className="mt-5 text-sm leading-8 text-[var(--ink-muted)] sm:text-base [&_li]:text-[var(--ink-muted)] [&_p+p]:mt-4 [&_p+ul]:mt-4 [&_p]:text-[var(--ink-muted)] [&_strong]:font-semibold [&_strong]:text-white/90 [&_ul+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                {section.content}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
