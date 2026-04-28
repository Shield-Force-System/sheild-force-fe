import { frequentlyAskedQuestions } from "@/components/site-data";
import { SectionHeading } from "@/components/site-primitives";

export function SiteFaqSection() {
  return (
    <section id="faq" data-public-chrome="faq" className="page-shell pb-4 sm:pb-6 lg:pb-8">
      <div className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
        <div className="relative z-10">
          <SectionHeading
            title="Frequently Asked Questions"
            description="Users can access booking, protection, mobility, and helicopter information directly from any page."
          />

          <div className="mt-8 grid gap-3 lg:grid-cols-2">
            {frequentlyAskedQuestions.map((item, index) => (
              <details
                key={item.question}
                className="rounded-[1.35rem] border border-white/8 bg-white/4 transition hover:bg-white/[0.06]"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <div>
                    <div className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--brand-strong)]">
                      {item.category}
                    </div>
                    <h3 className="mt-2 text-base font-semibold leading-7 text-white">
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
