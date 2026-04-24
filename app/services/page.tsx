import type { Metadata } from "next";
import Image from "next/image";
import {
  deploymentProtocol,
  pricingRows,
  serviceCards,
  serviceSupportNotes,
} from "@/components/site-data";
import { ActionLink, DetailList, SectionHeading } from "@/components/site-primitives";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Shield Force services covering armed bodyguards, personal protection, helicopter rental, events, and protected vehicles.",
};

const serviceAudiences = [
  "Corporate Executives",
  "High-Net-Worth Individuals",
  "Event Organisers",
  "Public Figures & Celebrities",
  "Families Requiring Personal Security",
] as const;

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#11191b_0%,#1a2123_45%,#654522_150%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(209,161,93,0.18),transparent_30%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Service Map</p>
            <h1 className="display-title mt-5 max-w-[12ch] text-[3rem] leading-[0.88] text-white sm:text-[4rem]">
             One Platform. Complete Protection / Security and Mobility. Unified
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              From elite security services to private air mobility, Shield Force delivers integrated solutions for safety, movement, and control seamlessly managed under one command.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="/bodyguards">Request Protection</ActionLink>
              <ActionLink href="/helicopter-booking" variant="ghost">
                Open Helicopter Booking
              </ActionLink>
            </div>
          </div>

          <div className="warm-panel rounded-[1.9rem] border border-white/10 px-5 py-5 text-[#fff2d8] sm:px-6">
            <div className="relative z-10">
              <p className="eyebrow text-[#fff0cf]/70">What Clients See</p>
              <div className="mt-5">
                <DetailList items={serviceSupportNotes} tone="warm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 section-card rounded-[2rem] px-6 py-7 sm:px-8">
        <div className="relative z-10">
          <SectionHeading
            eyebrow="Service Breakdown"
            title="Our Services"
            description="This page acts as the operational catalogue for the live website and lead flow."
          />

          <div className="mt-8 grid gap-4">
            {serviceCards.map((service, index) => (
              <article
                id={service.id}
                key={service.id}
                className={`rounded-[1.8rem] border border-white/8 p-6 ${
                  index % 2 === 0 ? "bg-white/4" : "bg-black/14"
                }`}
              >
                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[0.72rem] uppercase tracking-[0.22em] text-[var(--brand-strong)]">
                        {service.tag}
                      </span>
                      <span className="text-[0.72rem] uppercase tracking-[0.2em] text-white/42">
                        0{index + 1}
                      </span>
                    </div>
                    <h2 className="display-title mt-5 text-[2rem] leading-[0.92] text-white sm:text-[2.4rem]">
                      {service.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
                      {service.summary}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <div className="relative overflow-hidden rounded-[1.25rem] border border-white/8 bg-[radial-gradient(circle_at_72%_22%,rgba(209,161,93,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.14))]">
                      <div className="relative h-44 sm:h-48">
                        <Image
                          src={service.image.src}
                          alt={service.image.alt}
                          fill
                          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                          className="object-contain p-4"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                      <div className="rounded-[1.25rem] border border-white/8 bg-white/4 p-4">
                        <div className="text-xs uppercase tracking-[0.22em] text-white/42">Price</div>
                        <div className="mt-2 text-lg font-semibold text-white">{service.price}</div>
                      </div>
                      <div className="rounded-[1.25rem] border border-white/8 bg-white/4 p-4">
                        <div className="text-xs uppercase tracking-[0.22em] text-white/42">
                          Commercial Note
                        </div>
                        <div className="mt-2 text-sm leading-6 text-white/78">{service.support}</div>
                      </div>
                      <div className="rounded-[1.25rem] border border-white/8 bg-white/4 p-4">
                        <div className="text-xs uppercase tracking-[0.22em] text-white/42">Location</div>
                        <div className="mt-2 text-sm leading-6 text-white/78">{service.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 section-card rounded-[2rem] px-6 py-7 sm:px-8">
        <div className="relative z-10">
          <SectionHeading
            eyebrow="Who Do We Serve"
            title="Shield Force is Designed For"
            description="Our deployments are built for clients who need dependable protection, discreet coordination, and controlled movement support."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {serviceAudiences.map((audience, index) => (
              <article
                key={audience}
                className={`rounded-[1.5rem] border border-white/8 p-5 ${
                  index % 2 === 0 ? "bg-white/4" : "bg-black/14"
                }`}
              >
                <div className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--brand-strong)]">
                  0{index + 1}
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-7 text-white">{audience}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[0.98fr_1.02fr]">
        <article className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
          <div className="relative z-10">
            <SectionHeading
              eyebrow="Our Standard pricing"
              title="Pricing may vary with different factors as duration, risk factor and on events!"
              description="Every deployment is priced based on expertise, duration, and operational requirements ensuring clarity and complete trust."
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

        <article className="olive-panel rounded-[2rem] border border-white/10 px-6 py-7 text-white sm:px-8">
          <div className="relative z-10">
            <p className="eyebrow text-white/58">Operating Notes</p>
            <h2 className="display-title mt-4 max-w-[14ch] text-[2rem] leading-[0.92] sm:text-[2.5rem]">
             How Shield Force Works
            </h2>

            <div className="mt-6 grid gap-4">
              {deploymentProtocol.map((item) => (
                <div key={item.title} className="rounded-[1.35rem] border border-white/10 bg-black/14 p-5">
                  <div className="text-base font-semibold text-white">{item.title}</div>
                  <div className="mt-2 text-sm leading-7 text-white/70">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
