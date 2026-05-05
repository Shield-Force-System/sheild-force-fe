import type { Metadata } from "next";
import Link from "next/link";
import { BodyguardOnboardingForm } from "@/components/bodyguard-onboarding-form";
import {
  bodyguardProfiles,
  bookingSteps,
  deploymentProtocol,
} from "@/components/site-data";
import { listBodyguards, mapBodyguardCard } from "@/lib/shield-force-api";
import { ActionLink, SectionHeading } from "@/components/site-primitives";

const clientProof = [
  "Background check status before deployment approval",
  "Licence confirmation where armed deployment is involved",
  "Role fit based on family, executive, event, or rally movement",
  "Issued I-card, dress standard, safari suit, and walky talky readiness",
] as const;

const armedServiceDetails = [
  "Rapid Emergency Response",
  "VIP & Asset Protection",
  "Advanced Surveillance Monitoring",
  "Crisis & Threat Management",
  "Law Enforcement Coordination",
] as const;

function getProfileServiceDetails(role: string) {
  const normalizedRole = role.toLowerCase();

  if (normalizedRole.includes("rifle") || normalizedRole.includes("pistol")) {
    return armedServiceDetails;
  }

  return null;
}

export const metadata: Metadata = {
  title: "Bodyguards",
  description:
    "Shield Force bodyguard roster, onboarding flow, and website enquiry capture for personal and armed protection.",
};

async function getBodyguardProfiles() {
  try {
    const records = await listBodyguards({ status: "ACTIVE" });
    const cards = records.map((record, index) => mapBodyguardCard(record, index));
    return cards.length > 0 ? cards : bodyguardProfiles;
  } catch {
    return bodyguardProfiles;
  }
}

export default async function BodyguardsPage() {
  const profiles = await getBodyguardProfiles();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#10181a_0%,#192224_42%,#5f4122_150%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="absolute -right-16 top-8 h-64 w-64 rounded-full bg-[rgba(209,161,93,0.18)] blur-3xl" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="display-title max-w-[11ch] text-[3rem] leading-[0.88] text-white sm:text-[4rem] lg:max-w-none">
              Armed Security Guard and Bodyguard Services
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
             Browse verified Shield Force professionals, review profiles, and submit your requirement.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="#guard-onboarding">View Professionals</ActionLink>
              <ActionLink href="#customer-enquiry" variant="ghost">
                Request Protection
              </ActionLink>
            </div>
          </div>

        </div>
      </section>

      <section className="mt-6 section-card rounded-[2rem] px-6 py-7 sm:px-8">
        <div className="relative z-10">
          <SectionHeading
            title="Verified Professionals. Ready for Deployment."
            description=""
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {profiles.map((profile) => {
              const serviceDetails = getProfileServiceDetails(profile.role);

              return (
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
                    {serviceDetails ? (
                      <div>
                        <div className="text-white/42">Service Details</div>
                        <ol className="mt-2 list-decimal space-y-1 pl-5 text-[var(--ink-muted)]">
                          {serviceDetails.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ol>
                      </div>
                    ) : null}
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
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[0.98fr_1.02fr]">
        <article className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
          <div className="relative z-10">
            <SectionHeading
              title="How Deployment Works"
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
            <h2 className="display-title max-w-[13ch] text-[2rem] leading-[0.92] sm:text-[2.5rem] lg:max-w-none">
              Every Deployment Includes
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
            <h2 className="display-title max-w-[13ch] text-[2rem] leading-[0.94] text-white sm:text-[2.5rem] lg:max-w-none">
              Submit a Bodyguard Enquiry
            </h2>

            <form className="mt-6 grid gap-4" action="#">
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
            </form>
          </div>
        </article>

        <article id="guard-onboarding" className="warm-panel rounded-[2rem] border border-white/10 px-6 py-7 text-[#fff2d8] sm:px-8">
          <div className="relative z-10">
            <h2 className="display-title max-w-[13ch] text-[2rem] leading-[0.94] sm:text-[2.5rem] lg:max-w-none">
              Join Shield Force: One of the Leading Elite Security Organizations
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#fff1d8]/82">
              Complete the onboarding steps and upload the required documents for review. Approved
              bodyguards are moved into the Shield Force roster after verification.
            </p>

            <BodyguardOnboardingForm />
          </div>
        </article>
      </section>
    </div>
  );
}
