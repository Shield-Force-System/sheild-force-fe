import type { Metadata } from "next";
import Link from "next/link";
import {
  FleetCard,
  HeroRotorcraft,
  ServiceVisual,
} from "@/components/aviation-showcase";
import { HelicopterEnquiryForm } from "@/components/helicopter-enquiry-form";
import { ActionLink, ArrowIcon, SectionHeading } from "@/components/site-primitives";

const helicopterServices = [
  {
    title: "Private Charter",
    text: "Business and leisure rotorcraft transfers with concierge-grade timing, curated routes, and discreet service.",
    tag: "VIP",
    variant: "sunset",
    href: "#flight-enquiry",
  },
  {
    title: "Scenic Tours",
    text: "Low-altitude city reveals, coastal flyovers, and high-drama arrival moments for premium travelers.",
    tag: "TOUR",
    variant: "copper",
    href: "#flight-enquiry",
  },
  {
    title: "Corporate Transfer",
    text: "Fast intercity movement for leadership teams, investors, and executive scheduling teams.",
    tag: "OPS",
    variant: "night",
    href: "#flight-enquiry",
  },
] as const;

const featuredFleet = [
  {
    name: "CRH 29M",
    price: "₹125K/hour",
    tone: "dark",
  },
  {
    name: "CRH 28",
    price: "₹145k/hour",
    tone: "light",
  },
] as const;

const charterBands = [
  {
    title: "Commercial Range",
    text: "₹50,000 to ₹350,000 per hour depending on aircraft, route, positioning, and standby rules.",
  },
  {
    title: "Operational Geography",
    text: "Current emphasis is UP and NCR, aligned with the first phase service footprint.",
  },
  {
    title: "Commercial Note",
    text: "Terms and conditions apply to route availability, positioning legs, and event-day scheduling.",
  },
] as const;

const helicopterFlow = [
  "Share route, date, passenger count, and mission type through the website enquiry form.",
  "Shield Force reviews flight feasibility along with event support, airport coordination, or rally timing.",
  "The team follows up with aircraft suitability, commercial range, and the next scheduling step.",
  "Ground movement can be matched with bodyguard support or protected vehicle requirements if needed.",
] as const;

export const metadata: Metadata = {
  title: "Helicopter Booking",
  description:
    "Shield Force helicopter booking page with charter options, fleet visuals, website enquiry capture, and manual follow-up flow.",
};

export default function HelicopterBookingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-[1720px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 2xl:px-10">
        <div className="mx-auto grid w-full gap-5">
          <div className="space-y-5">
            <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_18%),radial-gradient(circle_at_61%_40%,rgba(255,255,255,0.06),transparent_16%),radial-gradient(circle_at_44%_82%,rgba(255,255,255,0.12),transparent_24%)]" />

              <div className="relative min-h-[36rem] overflow-hidden px-4 pb-6 pt-7 sm:px-6 sm:pb-8 sm:pt-8 lg:min-h-[38rem] lg:px-8 lg:pb-10 lg:pt-10">
                <div className="absolute inset-x-[18%] bottom-14 h-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.28),rgba(255,255,255,0.08)_30%,transparent_72%)] blur-[34px]" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />

                <div className="relative z-20 max-w-[21rem] pt-2 sm:pt-4 lg:pt-10">
                  <h1 className="hero-title text-[clamp(1.8rem,8.5vw,3rem)] text-white sm:text-[3.75rem] lg:text-[4.4rem]">
                    <span className="block whitespace-nowrap">Helicopter Rental</span>
                    <span className="block whitespace-nowrap">- On Demand Services</span>
                  </h1>

                  <p className="mt-7 max-w-[18rem] text-sm leading-6 text-white/58 sm:text-[14px]">
                   Skip traffic. Save time. Arrive in style.
Charter premium helicopters for business, events, or personal travel with seamless coordination from request to landing.

                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="#charter-services"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ae7f4f] px-5 py-3 text-sm font-medium text-[#130f0a] transition hover:bg-[#be9161]"
                    >
                      View services
                      <ArrowIcon />
                    </Link>
                    <Link
                      href="#flight-enquiry"
                      className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-[#111111] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#171717]"
                    >
                      Send enquiry
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>

                <div className="hero-float pointer-events-none relative z-10 mx-auto mt-10 w-[118%] max-w-[1020px] -translate-x-[10%] sm:mt-6 sm:w-[112%] sm:max-w-[1120px] sm:-translate-x-[3%] lg:absolute lg:bottom-2 lg:left-[18%] lg:mt-0 lg:w-[79%] lg:max-w-none lg:translate-x-0">
                  <HeroRotorcraft />
                </div>
              </div>
            </section>

            <section
              id="charter-services"
              className="lux-shell rounded-[2rem] border border-white/8 px-5 py-6 sm:px-7 sm:py-8"
            >
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <h2 className="max-w-[14ch] font-display text-[2.1rem] leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.9rem] lg:max-w-none">
                      A Dedicated Charter Experience
                    </h2>
                     <div className="max-w-md">
                    <p className="text-sm leading-7 text-white/56">
                      Review the charter use cases, submit your route and timing, and the team will
                      come back with aircraft suitability and commercial terms.
                    </p>
                    <Link
                      href="#flight-enquiry"
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/12"
                    >
                      Send helicopter enquiry
                      <ArrowIcon />
                    </Link>
                  </div>
                  </div>
                 
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {helicopterServices.slice(0, 2).map((service) => (
                    <article key={service.title} className="rounded-[1.6rem] border border-white/8 bg-white/3 p-4">
                      <ServiceVisual variant={service.variant} />
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <h3 className="font-display text-[1.55rem] tracking-[-0.05em] text-white">
                          {service.title}
                        </h3>
                        <span className="rounded-full border border-white/8 bg-white/6 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-white/56">
                          {service.tag}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/58">{service.text}</p>
                      <Link
                        href={service.href}
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#ae7f4f] px-3 py-2 text-xs font-medium text-[#140f09]"
                      >
                        Send enquiry
                        <ArrowIcon />
                      </Link>
                    </article>
                  ))}

                  <article className="rounded-[1.6rem] border border-white/8 bg-white/3 p-4 lg:col-span-2">
                    <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                      <ServiceVisual variant={helicopterServices[2].variant} />
                      <div className="flex flex-col justify-between gap-4">
                        <div>
                          <div className="w-fit rounded-full border border-white/8 bg-white/6 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-white/56">
                            {helicopterServices[2].tag}
                          </div>
                          <h3 className="mt-4 font-display text-[1.9rem] tracking-[-0.05em] text-white">
                            {helicopterServices[2].title}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-white/58">{helicopterServices[2].text}</p>
                        </div>
                        <Link
                          href={helicopterServices[2].href}
                          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/12"
                        >
                          Send transfer enquiry
                          <ArrowIcon />
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            <section
              id="fleet"
              className="lux-shell rounded-[2rem] border border-white/8 px-5 py-6 sm:px-7 sm:py-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="max-w-[12ch] font-display text-[2.2rem] leading-[0.95] tracking-[-0.05em] text-white sm:text-[3rem] lg:max-w-none">
                    Our Fleet of Luxurious Helicopters
                  </h2>
                   <p className="max-w-md text-sm leading-6 text-white/55">
                  Explore aircraft configured for executive movement, scenic experiences, and
                  ultra-fast regional transfers.
                </p>
                </div>
               
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {featuredFleet.map((craft) => (
                  <FleetCard
                    key={craft.name}
                    name={craft.name}
                    price={craft.price}
                    tone={craft.tone}
                    href="#flight-enquiry"
                  />
                ))}
              </div>
            </section>

            <section className="mt-6 grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
              <article id="flight-enquiry" className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
                <div className="relative z-10">
                  <SectionHeading
                    title="Plan Your Charter"
                    description="Share the route, timing, and passenger details here, and Shield Force follows up manually with the next steps."
                  />

                  <HelicopterEnquiryForm />
                </div>
              </article>

              <article className="warm-panel rounded-[2rem] border border-white/10 px-6 py-7 text-[#fff2d8] sm:px-8">
                <div className="relative z-10">
                  <h2 className="display-title max-w-[13ch] text-[2rem] leading-[0.92] sm:text-[2.5rem] lg:max-w-none">
                    Charter Pricing Overview
                  </h2>

                  <div className="mt-6 space-y-4">
                    {charterBands.map((item) => (
                      <div key={item.title} className="rounded-[1.35rem] border border-white/10 bg-black/12 p-5">
                        <div className="text-base font-semibold text-white">{item.title}</div>
                        <div className="mt-2 text-sm leading-7 text-[#fff1d8]/78">{item.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </section>

            <section className="mt-6 grid gap-4 xl:grid-cols-[0.96fr_1.04fr]">
              <article className="olive-panel rounded-[2rem] border border-white/10 px-6 py-7 text-white sm:px-8">
                <div className="relative z-10">
                  <h2 className="display-title max-w-[13ch] text-[2rem] leading-[0.92] sm:text-[2.5rem] lg:max-w-none">
                    How It Works
                  </h2>
                  <div className="mt-6 space-y-4">
                    {helicopterFlow.map((item, index) => (
                      <div key={item} className="flex gap-4 rounded-[1.35rem] border border-white/10 bg-black/12 px-4 py-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(209,161,93,0.14)] text-sm font-semibold text-[var(--brand-strong)]">
                          0{index + 1}
                        </div>
                        <div className="text-sm leading-7 text-white/72">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <article className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
                <div className="relative z-10">
                  <SectionHeading
                    title="Built for High-Stakes Movement:"
                    description="Shield Force integrates air mobility with on-ground protection and transport ensuring a seamless, secure experience"
                  />

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.35rem] border border-white/8 bg-white/4 p-5">
                      <div className="text-lg font-semibold text-white">VIP & Celebrity Airport Transfers</div>
                      <div className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
                        Pair helicopter arrival with personal or armed bodyguard support on the ground.
                      </div>
                    </div>
                    <div className="rounded-[1.35rem] border border-white/8 bg-white/4 p-5">
                      <div className="text-lg font-semibold text-white">Political Rally & Campaign Travel</div>
                      <div className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
                        Continue high-sensitivity movement with an on-demand bullet proof SUV when needed.
                      </div>
                    </div>
                    <div className="rounded-[1.35rem] border border-white/8 bg-white/4 p-5">
                      <div className="text-lg font-semibold text-white">Corporate Executive Movement</div>
                      <div className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
                        Airport pickup and drop for VIP, celebrity, and executive travel
                      </div>
                    </div>
                    <div className="rounded-[1.35rem] border border-white/8 bg-white/4 p-5">
                      <div className="text-lg font-semibold text-white">High-Security or Time-Sensitive Operations</div>
                      <div className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">
                        Politician rally movement with time-sensitive land-to-air coordination
                      </div>
                    </div>
                  </div>

                  <div className="mt-7">
                    <ActionLink href="/bodyguards" variant="ghost">
                      Add bodyguard support
                    </ActionLink>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
