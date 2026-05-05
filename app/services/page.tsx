import type { Metadata } from "next";
import Image from "next/image";
import {
  deploymentProtocol,
  pricingRows,
  serviceCards,
} from "@/components/site-data";
import { ActionLink, SectionHeading } from "@/components/site-primitives";

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
            <h1 className="display-title text-[3rem] leading-[0.88] text-white sm:text-[4rem]">
             End-to-End Security and Mobility Solutions
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

          {/* <div className="warm-panel rounded-[1.9rem] border border-white/10 px-5 py-5 text-[#fff2d8] sm:px-6">
            <div className="relative z-10">
              <div>
                <DetailList items={serviceSupportNotes} tone="warm" />
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <section className="mt-6 section-card rounded-[2rem] px-6 py-7 sm:px-8">
        <div className="relative z-10">
          <SectionHeading
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
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
                  <div className="flex min-h-full flex-col justify-between gap-8">
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
                      <p className="mt-4 max-w-[34rem] text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
                        {service.summary}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
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

                  <div className="flex min-h-full">
                    <div className="relative w-full overflow-hidden rounded-[1.45rem] border border-white/8 bg-[radial-gradient(circle_at_72%_22%,rgba(209,161,93,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.14))]">
                      <div className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/16 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-white/58">
                        {service.location}
                      </div>
                      <div className="relative h-full min-h-[18rem] sm:min-h-[20rem]">
                        <Image
                          src={service.image.src}
                          alt={service.image.alt}
                          fill
                          sizes="(min-width: 1024px) 42vw, (min-width: 640px) 45vw, 100vw"
                          className="object-contain p-6 sm:p-7"
                        />
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
              title="Pricing Overview"
              description=""
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
            <p className="mt-4 text-sm italic text-white/64">
              *Custom quotes available for long-term and high-risk assignments.
            </p>
          </div>

      </section>

      <section className="mt-6 section-card rounded-[2rem] px-6 py-7 sm:px-8">
        <div className="relative z-10">
          <h2 className="display-title max-w-[18ch] text-[2rem] leading-[0.92] text-white sm:text-[2.6rem] lg:max-w-none">
            Shield Force Is Designed For
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {serviceAudiences.map((audience) => (
              <article key={audience} className="rounded-[1.5rem] border border-white/8 bg-white/4 p-5">
                <h3 className="text-lg font-semibold leading-7 text-white">{audience}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
