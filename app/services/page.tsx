import type { Metadata } from "next";
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

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#11191b_0%,#1a2123_45%,#654522_150%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_20%,rgba(209,161,93,0.18),transparent_30%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Service Map</p>
            <h1 className="display-title mt-5 max-w-[12ch] text-[3rem] leading-[0.88] text-white sm:text-[4rem]">
              Six commercial fronts, one Shield Force operating standard.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              The services page is structured around what clients actually ask for first: protection,
              mobility, event control, and protected transport.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="/bodyguards">Choose Bodyguards</ActionLink>
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
            title="Each category now has pricing cues, usage context, and direct paths into booking."
            description="This page acts as the operational catalogue for the frontend release."
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[0.98fr_1.02fr]">
        <article className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
          <div className="relative z-10">
            <SectionHeading
              eyebrow="Commercial Grid"
              title="The initial price table stays visible, simple, and ready for quote escalation."
              description="It gives visitors a fast commercial snapshot before they move into enquiry forms."
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
              Service pages only work if they also explain readiness, not just listings.
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
