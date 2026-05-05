"use client";

import { useState } from "react";
import { frequentlyAskedQuestions } from "@/components/site-data";
import { SectionHeading } from "@/components/site-primitives";

const faqCategories = Array.from(
  new Set(frequentlyAskedQuestions.map((item) => item.category)),
);

export function SiteFaqSection() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0]);
  const visibleQuestions = frequentlyAskedQuestions.filter(
    (item) => item.category === activeCategory,
  );

  return (
    <section id="faq" data-public-chrome="faq" className="page-shell pb-4 sm:pb-6 lg:pb-8">
      <div className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
        <div className="relative z-10">
          <SectionHeading
            title="Frequently Asked Questions"
            description=""
          />

          <div
            role="tablist"
            aria-label="FAQ Categories"
            className="mt-8 flex flex-wrap gap-2"
          >
            {faqCategories.map((category) => {
              const isActive = category === activeCategory;
              const questionCount = frequentlyAskedQuestions.filter(
                (item) => item.category === category,
              ).length;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition ${
                    isActive
                      ? "border-[rgba(239,201,139,0.36)] bg-[rgba(209,161,93,0.12)] text-[var(--brand-strong)]"
                      : "border-white/10 bg-white/4 text-white/68 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  <span className="font-medium">{category}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.18em] ${
                      isActive ? "bg-black/18 text-[#fff1d8]" : "bg-black/14 text-white/42"
                    }`}
                  >
                    {questionCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* <div className="mt-4 rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-[var(--ink-muted)]">
            Showing {visibleQuestions.length} question{visibleQuestions.length === 1 ? "" : "s"} in {activeCategory}.
          </div> */}

          <div className="mt-8 grid gap-3 lg:grid-cols-2">
            {visibleQuestions.map((item, index) => (
              <details
                key={item.question}
                className="rounded-[1.35rem] border border-white/8 bg-white/4 transition hover:bg-white/[0.06]"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <div>
                    <h3 className="text-base font-semibold leading-7 text-white">
                      {index + 1}. {item.question}
                    </h3>
                  </div>

                  <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/12 text-lg font-semibold leading-none text-[var(--brand-strong)]">
                    +
                  </span>
                </summary>

                <div className="border-t border-white/8 px-5 py-4 text-sm leading-7 text-[var(--ink-muted)]">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
