"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How quickly can Shield Force deploy a personal bodyguard?",
    a: "We offer same-day deployment in Delhi NCR and most major Indian metros. For outstation assignments, standard deployment is within 24 hours. Executive retainer clients receive priority response within 2 hours.",
  },
  {
    q: "Are your armed security personnel licensed and verified?",
    a: "Every armed guard deployed by Shield Force holds valid rifle or pistol licensing as required under the Private Security Agencies Regulation Act. Background verification, police clearance, and arms competency checks are completed before any assignment.",
  },
  {
    q: "What is covered under a monthly bodyguard retainer?",
    a: "A monthly retainer includes daily escort coverage, residence-to-destination movement, event attendance, and a dedicated point of contact for scheduling. Travel beyond city limits, air escorts, and overnight assignments are quoted separately.",
  },
  {
    q: "Can I book a bulletproof vehicle with a driver and guard together?",
    a: "Yes. Our protected vehicle packages include the armoured SUV, a vetted security driver, and an optional armed escort guard. All three are coordinated under a single booking and operate as a unified detail.",
  },
  {
    q: "Do you provide security for private events and celebrity appearances?",
    a: "Shield Force handles stage-side crowd control, airport pickups, green room security, and full venue perimeter coverage. We have managed security for political rallies, film promotions, and high-profile private gatherings across UP and NCR.",
  },
  {
    q: "How does the helicopter charter work for high-priority travel?",
    a: "You submit your route, date, and passenger count. We handle airport coordination, landing permissions, and ground security at both ends. The charter can be paired with an armed escort vehicle for end-to-end protected movement.",
  },
];

const testimonials = [
  {
    initials: "RV",
    name: "Rajiv Verma",
    role: "Managing Director, Noida",
    service: "Personal Bodyguard",
    stars: 5,
    quote:
      "My executive team travels across UP weekly. Shield Force has been our security partner for over a year — reliable, discreet, and always professional.",
  },
  {
    initials: "AS",
    name: "Anika Sharma",
    role: "Film Producer, Mumbai",
    service: "Events & Celebrity",
    stars: 5,
    quote:
      "We used Shield Force for a two-day film promotion across Delhi. Stage-side control was tight, crowd management was smooth — no incidents whatsoever.",
  },
  {
    initials: "MK",
    name: "Manish Kapoor",
    role: "Industrialist, Lucknow",
    service: "Protected Vehicles",
    stars: 5,
    quote:
      "The armoured SUV with a driver and escort guard gave my family real peace of mind during a period of heightened personal risk. Worth every rupee.",
  },
  {
    initials: "PS",
    name: "Priya Singh",
    role: "Politician, UP",
    service: "Armed Security",
    stars: 5,
    quote:
      "For rally coverage and constituency visits, I trust Shield Force. Their armed detail is disciplined, well-trained, and knows how to operate in crowded environments.",
  },
  {
    initials: "DM",
    name: "Dr. Deepak Mehta",
    role: "Surgeon, Gurugram",
    service: "Helicopter Rental",
    stars: 5,
    quote:
      "Time-critical travel between cities used to be a nightmare. The helicopter charter coordinated by Shield Force — including ground security at both ends — was seamless.",
  },
  {
    initials: "SB",
    name: "Sunita Bhatnagar",
    role: "HNI Client, Delhi",
    service: "Personal Bodyguard",
    stars: 5,
    quote:
      "My daughter's safety during college events and travel was something I could never compromise on. The female bodyguard assigned by Shield Force has been exceptional.",
  },
];

interface FaqItem {
  q: string;
  a: string;
}

interface Testimonial {
  initials: string;
  name: string;
  role: string;
  service: string;
  stars: number;
  quote: string;
}

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/8">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-[15px] font-medium leading-relaxed text-white/88 transition-colors duration-200 group-hover:text-[#ae7f4f]">
          {item.q}
        </span>

        {/* +/× icon */}
        <span
          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
            open
              ? "border-[rgba(174,127,79,0.4)] bg-[rgba(174,127,79,0.14)]"
              : "border-white/14"
          }`}
        >
          <span className="relative h-3 w-3">
            {/* horizontal bar */}
            <span className="absolute left-0 top-1/2 h-[1.5px] w-3 -translate-y-1/2 rounded-sm bg-white/70" />
            {/* vertical bar */}
            <span
              className={`absolute left-1/2 top-0 h-3 w-[1.5px] -translate-x-1/2 rounded-sm bg-white/70 transition-all duration-250 ${
                open ? "rotate-90 opacity-0" : "opacity-100"
              }`}
            />
          </span>
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[660px] pb-5 text-sm leading-7 text-white/52">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="#ae7f4f"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="group flex flex-col gap-5 rounded-[20px] border border-white/7 bg-[#0e0d0c] p-6 transition-colors duration-200 hover:border-[rgba(174,127,79,0.28)]">
      <div className="flex flex-col gap-3">
        {/* Service badge */}
        <span className="inline-flex w-fit items-center rounded-full border border-[rgba(174,127,79,0.22)] bg-[rgba(174,127,79,0.06)] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[rgba(174,127,79,0.8)]">
          {t.service}
        </span>
        {/* Stars */}
        <div className="flex gap-1">
          {Array.from({ length: t.stars }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
      </div>

    
      <p className="flex-1 text-sm leading-7 text-white/58">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 border-t border-white/6 pt-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[rgba(174,127,79,0.28)] bg-[rgba(174,127,79,0.14)] text-[13px] font-medium text-[#ae7f4f]">
          {t.initials}
        </div>
        <div>
          <p className="text-[13px] font-medium text-white/86">{t.name}</p>
          <p className="text-[12px] text-white/36">{t.role}</p>
        </div>
      </div>
    </div>
  );
}


export function FaqTestimonials() {
  return (
    <div className="bg-[#050505] border border-white/10 rounded-4xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      {/* ── FAQ ── */}
      <section className="mx-auto mb-24 max-w-[80%]">
        <div className="mb-12">
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/38">
            Common questions
          </p>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.15] text-white">
            Everything you need to{" "}
            <span className="text-[#ae7f4f]">know</span>
          </h2>
        </div>

        <div className="border-t border-white/8">
          {faqs.map((item, i) => (
            <FaqRow key={i} item={item} />
          ))}
        </div>
      </section>

     
      <section className="mx-auto max-w-full">
        <div className="mb-12">
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/38">
            Client voices
          </p>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.15] text-white">
            Trusted by those who{" "}
            <span className="text-[#ae7f4f]">can&apos;t afford risk</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </section>
    </div>
  );
}