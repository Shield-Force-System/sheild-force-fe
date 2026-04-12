import type { Metadata } from "next";
import {
  deploymentProtocol,
  roadmapItems,
  serviceSupportNotes,
} from "@/components/site-data";
import { ActionLink, DetailList, SectionHeading } from "@/components/site-primitives";

const operatingPoints = [
  "In-house guard model for stronger control over training, discipline, and deployment readiness.",
  "Client-first verification flow where background and licence checks happen before assignment confirmation.",
  "A combined security and mobility offering that brings guards, helicopter charter, events, and protected vehicles under one brand.",
  "Website-first launch that can be used immediately while the longer-term app layer is defined.",
] as const;

const trustSignals = [
  {
    title: "Verified before booking",
    text: "Profile, background, and licence details are reviewed before the client sees the final recommendation.",
  },
  {
    title: "Issued operating kit",
    text: "Walky talky, I-cards, safari suit, and deployment accessories are standardised through Shield Force.",
  },
  {
    title: "Designed for exposed movement",
    text: "The service mix supports airport runs, celebrity events, politician rallies, and executive movement.",
  },
] as const;

export const metadata: Metadata = {
  title: "About",
  description:
    "About Shield Force, its in-house protection model, verification process, and phased product rollout.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#11181a_0%,#182123_55%,#3c4b3d_140%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(239,201,139,0.16),transparent_28%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">About Shield Force</p>
            <h1 className="display-title mt-5 max-w-[12ch] text-[3rem] leading-[0.88] text-white sm:text-[4rem]">
              Built for security-sensitive movement, not generic staffing.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Shield Force is positioned as an operational brand for personal security, armed
              deployment, helicopter coordination, protected transport, and event movement support
              across UP and NCR.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="/services">See Service Coverage</ActionLink>
              <ActionLink href="/bodyguards" variant="ghost">
                View Bodyguard Roster
              </ActionLink>
            </div>
          </div>

          <div className="section-card rounded-[1.9rem] px-5 py-5 sm:px-6">
            <div className="relative z-10">
              <p className="eyebrow">Operating Principles</p>
              <div className="mt-5">
                <DetailList items={operatingPoints} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {trustSignals.map((item, index) => (
          <article
            key={item.title}
            className={`rounded-[1.8rem] border border-white/10 px-6 py-6 ${
              index === 1 ? "warm-panel text-[#fff2d8]" : "section-card text-white"
            }`}
          >
            <div className="relative z-10">
              <div className="text-[0.72rem] uppercase tracking-[0.22em] text-white/52">0{index + 1}</div>
              <h2 className="display-title mt-5 text-[1.8rem] leading-[0.94]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/72">{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 section-card rounded-[2rem] px-6 py-7 sm:px-8">
        <div className="relative z-10">
          <SectionHeading
            eyebrow="Deployment Standard"
            title="The business model is framed around verification, visible readiness, and cleaner field communication."
            description="This section explains the operational standard that sits behind the frontend experience."
          />

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

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="olive-panel rounded-[2rem] border border-white/10 px-6 py-7 text-white sm:px-8">
          <div className="relative z-10">
            <p className="eyebrow text-white/58">Business Support</p>
            <h2 className="display-title mt-4 max-w-[13ch] text-[2rem] leading-[0.92] sm:text-[2.5rem]">
              The frontend also explains how Shield Force supports the edge cases around deployment.
            </h2>
            <div className="mt-6">
              <DetailList items={serviceSupportNotes} />
            </div>
          </div>
        </article>

        <article className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
          <div className="relative z-10">
            <p className="eyebrow">Roadmap</p>
            <h2 className="display-title mt-4 max-w-[14ch] text-[2rem] leading-[0.92] text-white sm:text-[2.5rem]">
              Product scope grows from website enquiries into an operational app layer.
            </h2>

            <div className="mt-6 space-y-4">
              {roadmapItems.map((item) => (
                <div key={item.phase} className="rounded-[1.35rem] border border-white/8 bg-white/4 p-5">
                  <div className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--brand-strong)]">
                    {item.phase}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--ink-muted)]">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
