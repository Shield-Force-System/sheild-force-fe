import type { Metadata } from "next";
import Link from "next/link";
import { HomepageHeroCarousel } from "@/components/homepage-hero-carousel";
import {
  deploymentProtocol,
  pricingRows,
  serviceCards,
  serviceSupportNotes,
} from "@/components/site-data";
import { ArrowIcon, SectionHeading } from "@/components/site-primitives";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Shield Force homepage for personal bodyguards, armed security, helicopter booking, event deployment, and protected vehicles.",
};

function ServicePanel({
  title,
  summary,
  href,
  price,
  support,
  location,
  tag,
  tone,
}: {
  title: string;
  summary: string;
  href: string;
  price: string;
  support: string;
  location: string;
  tag: string;
  tone: "dark" | "warm" | "olive";
}) {
  const tones = {
    dark: "section-card text-white",
    warm: "warm-panel border border-white/10 text-[#fff2d8]",
    olive: "olive-panel border border-white/10 text-white",
  };

  return (
    <article className={`relative overflow-hidden rounded-[1.7rem] p-5 ${tones[tone]}`}>
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="rounded-full border border-white/12 bg-black/12 px-3 py-1 text-[0.7rem] uppercase tracking-[0.24em] text-white/72">
            {tag}
          </div>
          <div className="text-right text-xs uppercase tracking-[0.2em] text-white/42">{location}</div>
        </div>

        <h3 className="display-title mt-5 text-[1.55rem] leading-[0.95]">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/72">{summary}</p>

        <div className="mt-5 space-y-2 rounded-[1.2rem] border border-white/10 bg-black/12 p-4 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-white/56">Primary pricing</span>
            <span>{price}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-white/56">Commercial note</span>
            <span className="text-right">{support}</span>
          </div>
        </div>

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2.5 text-sm font-medium transition hover:bg-white/12"
        >
          Explore service
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-[1720px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 2xl:px-10">
        <div className="mx-auto grid w-full gap-5">
          <div className="space-y-5">
            <HomepageHeroCarousel />

            <section
              id="services"
              className="lux-shell rounded-[2rem] border border-white/8 px-5 py-6 sm:px-7 sm:py-8"
            >
              <SectionHeading
                eyebrow="Service Coverage"
                title="The homepage now fronts the full Shield Force service stack, not just helicopters."
                description="Clients can move from a single landing page into bodyguards, armed security, helicopter rental, events coverage, or protected vehicles without the site feeling like a one-service brand."
              />

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {serviceCards.map((service, index) => (
                  <ServicePanel
                    key={service.id}
                    title={service.title}
                    summary={service.summary}
                    href={service.href}
                    price={service.price}
                    support={service.support}
                    location={service.location}
                    tag={service.tag}
                    tone={index % 3 === 0 ? "warm" : index % 3 === 1 ? "dark" : "olive"}
                  />
                ))}
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
              <article className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
                <div className="relative z-10">
                  <SectionHeading
                    eyebrow="Pricing Snapshot"
                    title="Core website pricing remains visible for the main service lines."
                    description="The initial phase is enquiry-led, but the homepage still gives users enough commercial detail to understand monthly, hourly, and event-based service bands."
                  />

                  <div className="table-shell mt-7 overflow-x-auto">
                    <table>
                      <thead>
                        <tr className="text-sm uppercase tracking-[0.18em] text-white/52">
                          <th>Service</th>
                          <th>Price</th>
                          <th>Location</th>
                          <th>Events</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm leading-6 text-white/78">
                        {pricingRows.map((row) => (
                          <tr key={row.service}>
                            <td className="font-medium text-white">{row.service}</td>
                            <td>{row.price}</td>
                            <td>{row.location}</td>
                            <td>{row.eventRate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </article>

              <article className="warm-panel rounded-[2rem] border border-white/10 px-6 py-7 text-[#fff2d8] sm:px-8">
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#fff0cf]/70">Readiness Layer</p>
                  <h2 className="display-title mt-4 max-w-[13ch] text-[2rem] leading-[0.92] sm:text-[2.5rem]">
                    Operations are presented around verified deployment, not generic staffing.
                  </h2>

                  <div className="mt-6 space-y-4">
                    {deploymentProtocol.map((item) => (
                      <div key={item.title} className="rounded-[1.35rem] border border-white/10 bg-black/12 p-5">
                        <div className="text-base font-semibold text-white">{item.title}</div>
                        <div className="mt-2 text-sm leading-7 text-[#fff1d8]/78">{item.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </section>

            <section className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
              <div className="relative z-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                <div>
                  <p className="eyebrow">Launch Notes</p>
                  <h2 className="display-title mt-4 max-w-[13ch] text-[2rem] leading-[0.92] text-white sm:text-[2.5rem]">
                    The homepage now sells the full command model behind Shield Force.
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {serviceSupportNotes.map((note) => (
                    <div key={note} className="rounded-[1.35rem] border border-white/8 bg-white/4 p-5 text-sm leading-7 text-[var(--ink-muted)]">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
