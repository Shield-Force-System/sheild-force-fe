import type { Metadata } from "next";
import { deploymentProtocol } from "@/components/site-data";
import { ActionLink } from "@/components/site-primitives";

const heroHighlights = [
  {
    title: "Operational Focus",
    detail: "Security-critical assignments where safety, timing, and control cannot be compromised.",
  },
  {
    title: "Ground Presence",
    detail: "Delhi NCR, Lucknow, and key routes across Uttar Pradesh.",
  },
  {
    title: "Mobility Support",
    detail: "Helicopter rentals and helicopter-assisted mobility with protection.",
  },
] as const;

const whoWeAreSpecialties = [
  "Personal Bodyguard Services",
  "Armed and Unarmed Security Deployment",
  "VIP and Celebrity Protection",
  "Event and Political Movement Security",
  "Helicopter Rentals and Helicopter-Assisted Mobility With Protection",
] as const;

const operatingCoverage = [
  "Delhi NCR",
  "Lucknow",
  "Key routes across Uttar Pradesh",
] as const;

const whoWeServeClients = [
  "High Net Worth Individuals (HNI)",
  "Politicians and Public Figures",
  "Celebrities and Media Personalities",
  "Corporate Leaders and Executives",
  "Event Organizers",
] as const;

export const metadata: Metadata = {
  title: "About",
  description:
    "About Shield Force, its operational security model, deployment coverage, and integrated mobility support across Delhi NCR, Lucknow, and Uttar Pradesh.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#11181a_0%,#182123_55%,#3c4b3d_140%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(239,201,139,0.16),transparent_28%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="display-title max-w-[13ch] text-[3rem] leading-[0.88] text-white sm:text-[4rem] lg:max-w-none">
              Need Security or Helicopter Rental? We’ve Got You Covered
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Shield Force delivers integrated protection solutions for VIPs, executives, and high-risk movement across Delhi NCR and UP, combining trained personnel, controlled deployment, and coordinated mobility.

From personal bodyguards to helicopter-assisted movement, every operation is handled with precision.

            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="/services">See Service Coverage</ActionLink>
              <ActionLink href="/bodyguards" variant="ghost">
                View Bodyguard Roster
              </ActionLink>
            </div>
          </div>

          <div className="section-card rounded-[1.9rem] px-5 py-5 sm:px-6">
            <div className="relative z-10 grid gap-3">
              {heroHighlights.map((item) => (
                <div key={item.title} className="rounded-[1.3rem] border border-white/8 bg-white/4 px-4 py-4">
                  <div className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--brand-strong)]">
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <article className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
          <div className="relative z-10">
            <div className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--brand-strong)]">
              WHO WE ARE
            </div>
            <h2 className="display-title mt-5 max-w-[14ch] text-[2rem] leading-[0.92] text-white sm:text-[2.5rem] lg:max-w-none">
              Built for Security-Critical Operations
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
              Shield Force is an operational security platform designed for environments where
              safety, timing, and control cannot be compromised.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
              We specialize in:
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {whoWeAreSpecialties.map((specialty) => (
                <div key={specialty} className="rounded-[1.35rem] border border-white/8 bg-white/4 p-5">
                  <h3 className="text-base font-semibold leading-7 text-white">{specialty}</h3>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
              Our focus is not just providing manpower but ensuring secure, well-coordinated
              movement for every client.
            </p>
          </div>
        </article>

        <article className="warm-panel rounded-[2rem] border border-white/10 px-6 py-7 text-[#fff2d8] sm:px-8">
          <div className="relative z-10">
            <div className="text-[0.72rem] uppercase tracking-[0.24em] text-[#fff0cf]/72">
              WHERE WE OPERATE
            </div>
            <h2 className="display-title mt-5 max-w-[13ch] text-[2rem] leading-[0.92] text-white sm:text-[2.5rem] lg:max-w-none">
              Focused Coverage. Strong Ground Presence.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#fff1d8]/80 sm:text-base">
              Shield Force currently operates across:
            </p>

            <div className="mt-6 space-y-4">
              {operatingCoverage.map((location) => (
                <div key={location} className="rounded-[1.35rem] border border-white/10 bg-black/12 p-5">
                  <div className="text-base font-semibold leading-7 text-white">{location}</div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-7 text-[#fff1d8]/80 sm:text-base">
              With expanding capabilities for intercity movement and event-based deployment.
            </p>
          </div>
        </article>
      </section>

      <section className="mt-6 section-card rounded-[2rem] px-6 py-7 sm:px-8">
        <div className="relative z-10">
          <div className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--brand-strong)]">
            WHAT MAKES US DIFFERENT
          </div>
          <h2 className="display-title mt-5 max-w-[16ch] text-[2rem] leading-[0.92] text-white sm:text-[2.5rem] lg:max-w-none">
            Designed for Real-World Security Scenarios
          </h2>

          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            {deploymentProtocol.map((item) => (
              <div key={item.title} className="rounded-[1.4rem] border border-white/8 bg-white/4 p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 section-card rounded-[2rem] px-6 py-7 sm:px-8">
        {/* <article className="olive-panel rounded-[2rem] border border-white/10 px-6 py-7 text-white sm:px-8">
          <div className="relative z-10">
            <div className="text-[0.72rem] uppercase tracking-[0.24em] text-white/60">
              DEPLOYMENT MODEL
            </div>
            <h2 className="display-title mt-5 max-w-[15ch] text-[2rem] leading-[0.92] sm:text-[2.5rem] lg:max-w-none">
              Shield Force Operates on a Structured Deployment Model to Ensure Reliability and
              Clarity at Every Stage.
            </h2>
          </div>
        </article> */}

        {/* <article className="section-card rounded-[2rem] px-6 py-7 sm:px-8"> */}
          <div className="relative z-10">
            <div className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--brand-strong)]">
              WHO WE SERVE
            </div>
            <h2 className="display-title mt-5 max-w-[14ch] text-[2rem] leading-[0.92] text-white sm:text-[2.5rem] lg:max-w-none">
              Clients We Work With
            </h2>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {whoWeServeClients.map((client) => (
                <div key={client} className="rounded-[1.35rem] border border-white/8 bg-white/4 p-5">
                  <h3 className="text-base font-semibold leading-7 text-white">{client}</h3>
                </div>
              ))}
            </div>
          </div>
        {/* </article> */}
      </section>
    </div>
  );
}
