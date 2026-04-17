import type { Metadata } from "next";
import Link from "next/link";
import {
  bodyguardProfiles,
  bookingSteps,
  deploymentProtocol,
} from "@/components/site-data";
import { ActionLink, SectionHeading } from "@/components/site-primitives";
import GuardOnboardinfForm from "@/components/forms/guard-onboarding-form";
import CustomerEnquiryForm from "@/components/forms/customer-enquiry-form";

const clientProof = [
  "Background check status before deployment approval",
  "Licence confirmation where armed deployment is involved",
  "Role fit based on family, executive, event, or rally movement",
  "Issued I-card, dress standard, safari suit, and walky talky readiness",
] as const;

export const metadata: Metadata = {
  title: "Bodyguards",
  description:
    "Shield Force bodyguard roster, onboarding flow, and website enquiry capture for personal and armed protection.",
};

export default function BodyguardsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#10181a_0%,#192224_42%,#5f4122_150%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="absolute -right-16 top-8 h-64 w-64 rounded-full bg-[rgba(209,161,93,0.18)] blur-3xl" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">Bodyguard Page</p>
            <h1 className="display-title mt-5 max-w-[11ch] text-[3rem] leading-[0.88] text-white sm:text-[4rem]">
              Choose a guard, review the profile, then send the enquiry.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              This page now supports both sides of the Shield Force bodyguard flow: guards can onboard,
              and customers can browse listed profiles before sending a request for follow-up.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="#customer-enquiry">Customer Enquiry</ActionLink>
              <ActionLink href="#guard-onboarding" variant="ghost">
                Guard Onboarding
              </ActionLink>
            </div>
          </div>

          <div className="section-card rounded-[1.9rem] px-5 py-5 sm:px-6">
            <div className="relative z-10">
              <p className="eyebrow">Selection Layer</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {clientProof.map((item) => (
                  <div key={item} className="rounded-[1.3rem] border border-white/8 bg-white/4 px-4 py-4 text-sm leading-6 text-[var(--ink-muted)]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 section-card rounded-[2rem] px-6 py-7 sm:px-8">
        <div className="relative z-10">
          <SectionHeading
            eyebrow="Live Roster"
            title="The website now presents selectable bodyguard profiles instead of a generic enquiry-only wall."
            description="These profiles help customers review options and send a lead with a preferred guard, rather than relying on a blind callback request."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {bodyguardProfiles.map((profile) => (
              <article key={profile.name} className="rounded-[1.7rem] border border-white/8 bg-white/4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[0.72rem] uppercase tracking-[0.2em] text-white/42">
                      {profile.base}
                    </div>
                    <h2 className="display-title mt-3 text-[1.7rem] leading-[0.95] text-white">
                      {profile.name}
                    </h2>
                    <p className="mt-2 text-sm text-white/68">{profile.role}</p>
                  </div>
                  <span className="rounded-full border border-[rgba(239,201,139,0.28)] bg-[rgba(209,161,93,0.08)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--brand-strong)]">
                    {profile.availability}
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm leading-6">
                  <div>
                    <div className="text-white/42">Training</div>
                    <div className="text-[var(--ink-muted)]">{profile.training}</div>
                  </div>
                  <div>
                    <div className="text-white/42">Verification</div>
                    <div className="text-[var(--ink-muted)]">{profile.licence}</div>
                  </div>
                  <div>
                    <div className="text-white/42">Issued kit</div>
                    <div className="text-[var(--ink-muted)]">{profile.equipment}</div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="#customer-enquiry"
                    className="inline-flex items-center rounded-full bg-[var(--brand)] px-4 py-2.5 text-sm font-medium text-[#11130f] transition hover:bg-[var(--brand-strong)]"
                  >
                    Request this guard
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-2.5 text-sm text-white transition hover:bg-white/12"
                  >
                    Review services
                  </Link>
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
            eyebrow="How Booking Works"
            title="Customer enquiries follow a short lead flow instead of an instant checkout."
            description="The page now makes it clear how a client picks a guard, submits the form, and gets a follow-up from the team."
          />

            <div className="mt-7 space-y-4">
              {bookingSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4 rounded-[1.35rem] border border-white/8 bg-white/4 px-4 py-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(209,161,93,0.14)] text-sm font-semibold text-[var(--brand-strong)]">
                    0{index + 1}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">{step.title}</div>
                    <div className="mt-1 text-sm leading-6 text-[var(--ink-muted)]">{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="olive-panel rounded-[2rem] border border-white/10 px-6 py-7 text-white sm:px-8">
          <div className="relative z-10">
            <p className="eyebrow text-white/58">Field Standard</p>
            <h2 className="display-title mt-4 max-w-[13ch] text-[2rem] leading-[0.92] sm:text-[2.5rem]">
              The bodyguard page also reinforces what every deployment unit carries and follows.
            </h2>
            <div className="mt-6 space-y-4">
              {deploymentProtocol.map((item) => (
                <div key={item.title} className="rounded-[1.35rem] border border-white/10 bg-black/12 p-5">
                  <div className="text-base font-semibold text-white">{item.title}</div>
                  <div className="mt-2 text-sm leading-7 text-white/72">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <article id="customer-enquiry" className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
          <div className="relative z-10">
            <p className="eyebrow">Customer Enquiry</p>
            <h2 className="display-title mt-4 max-w-[13ch] text-[2rem] leading-[0.94] text-white sm:text-[2.5rem]">
              Send a bodyguard enquiry with profile preference, location, and deployment brief.
            </h2>
            <CustomerEnquiryForm/>
            {/* <form className="mt-6 grid gap-4" action="#">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/78">
                  <span>Full name</span>
                  <input className="form-input" type="text" placeholder="Enter your full name" />
                </label>
                <label className="space-y-2 text-sm text-white/78">
                  <span>Phone number</span>
                  <input className="form-input" type="tel" placeholder="+91 98765 43210" />
                </label>
              </div>
              <label className="space-y-2 text-sm text-white/78">
                <span>Preferred guard</span>
                <input className="form-input" type="text" placeholder="Enter profile name or no preference" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/78">
                  <span>Service type</span>
                  <select className="form-select" defaultValue="personal">
                    <option value="personal">Personal bodyguard</option>
                    <option value="rifle">Armed security - rifle</option>
                    <option value="pistol">Armed security - pistol</option>
                    <option value="event">Event security</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm text-white/78">
                  <span>City</span>
                  <input className="form-input" type="text" placeholder="UP or NCR" />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/78">
                  <span>Start date</span>
                  <input className="form-input" type="date" />
                </label>
                <label className="space-y-2 text-sm text-white/78">
                  <span>Duration</span>
                  <input className="form-input" type="text" placeholder="Single day, monthly, custom" />
                </label>
              </div>
              <label className="space-y-2 text-sm text-white/78">
                <span>Movement brief</span>
                <textarea
                  className="form-textarea"
                  placeholder="Mention airport transfer, rally coverage, family movement, or executive route."
                />
              </label>
              <button
                type="submit"
                className="w-fit rounded-full bg-[var(--brand)] px-4 py-3 text-sm font-medium text-[#11130f] transition hover:bg-[var(--brand-strong)]"
              >
                Send enquiry
              </button>
            </form> */}
          </div>
        </article>

        <article id="guard-onboarding" className="warm-panel rounded-[2rem] border border-white/10 px-6 py-7 text-[#fff2d8] sm:px-8">
          <div className="relative z-10">
            <p className="eyebrow text-[#fff0cf]/70">Guard Onboarding</p>
            <h2 className="display-title mt-4 max-w-[13ch] text-[2rem] leading-[0.94] sm:text-[2.5rem]">
              Register to be listed on the Shield Force website.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#fff1d8]/82">
              The website now shows the registration flow clearly, including the ₹1,500 onboarding
              fee and the information needed for verification.
            </p>
           <GuardOnboardinfForm/>
          </div>
        </article>
      </section>
    </div>
  );
}
