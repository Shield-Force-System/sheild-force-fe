import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomepageHeroCarousel } from "@/components/homepage-hero-carousel";
import {
  deploymentProtocol,
  pricingRows,
  serviceCards,
  serviceSupportNotes,
} from "@/components/site-data";
import { ArrowIcon, SectionHeading } from "@/components/site-primitives";
import { FaqTestimonials } from "@/components/faq-testimonials";
import { ShieldCheck, MapPin, Zap } from "lucide-react";

 const stats = [
    {
      title: "Verified Guards",
      value: "500+",
      icon: ShieldCheck,
    },
    {
      title: "Coverage",
      value: "UP & NCR",
      icon: MapPin,
    },
    {
      title: "Deployment SLA",
      value: "24 hrs",
      icon: Zap,
    },
  ];


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
  image,
}: {
  title: string;
  summary: string;
  href: string;
  price: string;
  support: string;
  location: string;
  tag: string;
  tone: "dark" | "warm" | "olive";
  image: {
    src: string;
    alt: string;
  };
}) {
  const tones = {
    dark: "section-card text-white",
    warm: "warm-panel border border-white/10 text-[#fff2d8]",
    olive: "olive-panel border border-white/10 text-white",
  };
  const visuals = {
    dark:
      "bg-[radial-gradient(circle_at_70%_22%,rgba(101,139,152,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.12))]",
    warm:
      "bg-[radial-gradient(circle_at_68%_18%,rgba(255,214,160,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.12))]",
    olive:
      "bg-[radial-gradient(circle_at_70%_18%,rgba(200,220,170,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.14))]",
  };  

  return (
    <article className={`relative overflow-hidden rounded-[1.7rem] p-5 ${tones[tone]}`}>
      <div className="relative z-10">
        <div
          className={`relative mb-5 overflow-hidden rounded-[1.35rem] border border-white/8 ${visuals[tone]}`}
        >
          <div className="relative h-40 sm:h-44">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
              className="object-contain p-4"
            />
          </div>
        </div>

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
             <div className="max-w-[720px]">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Service Coverage
            </p>

            <h2 className="mt-4 text-[2rem] sm:text-[2.4rem] lg:text-[3.2rem] leading-[1.1] lg:leading-[1.05] font-semibold tracking-tight text-white max-w-[600px] lg:max-w-[720px]">
             <span className="text-[#ffd6a0]">Security services</span>  built for real-world deployment
            </h2>

            <p className="mt-5 text-[14px] sm:text-[15px] leading-7 text-white/60 max-w-[520px] lg:max-w-[600px]">
              From personal bodyguards to armed security, helicopter rental, and protected vehicles —
              deploy the right solution with verified professionals across UP & NCR.
            </p>
          </div>

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
                    image={service.image}
                  />
                ))}
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
              <article className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
                <div className="relative z-10">
                  <SectionHeading
                    // eyebrow="Pricing Snapshot"
                    title="Transparent rates.No hidden fees."
                    description="Monthly, hourly, and event-based service bands for all deployments across UP & NCR."
                  />

                  <div className="mt-8 space-y-4">
                    {pricingRows.map((row) => {
                    const Icon = row.icon;

                    return (
                    <div
                    key={row.service}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:bg-white/[0.06] transition"
                    >
                 
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/10">
                        <Icon className="h-5 w-5 text-[#e7c38a]" />
                      </div>

                      <div>
                        <div className="text-white font-medium">{row.service}</div>
                        <div className="text-white/50 text-sm">{row.location}</div>
                      </div>
                    </div>

                  
                    <div className="text-right">
                      <div className="text-[#e7c38a] font-medium">{row.price}</div>
                      <div className="text-white/50 text-sm">{row.eventRate}</div>
                    </div>
                    </div>
                    );
                    })}
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-3 mt-10">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="relative rounded-2xl border border-white/10 bg-[#0b0b0b] px-6 py-5 flex items-center gap-4
            hover:border-[#e7c38a]/40 transition"
          >
            {/* ICON */}
            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#1a1a1a]">
              <Icon className="h-6 w-6 text-[#e7c38a]" />
            </div>

            {/* TEXT */}
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                {item.title}
              </div>
              <div className="text-xl font-semibold text-[#e7c38a] mt-1">
                {item.value}
              </div>
            </div>

            {/* GLOW EFFECT */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#e7c38a]/5 to-transparent opacity-0 hover:opacity-100 transition pointer-events-none" />
          </div>
        );
      })}
    </div>
              </article>

              <article className="warm-panel rounded-[2rem] border border-white/10 px-6 py-7 text-[#fff2d8] sm:px-8">
                <div className="relative z-10">
                  {/* <p className="text-xs uppercase tracking-[0.28em] text-[#fff0cf]/70">Readiness Layer</p> */}
                  <h2 className="display-title   text-[2rem] leading-[0.92] sm:text-[2.5rem]">
                 Elite security through verified professionals
                  </h2>

                  <div className="mt-6 space-y-4">
                  {deploymentProtocol.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="flex items-center justify-between rounded-[1.35rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] px-5 py-4 hover:bg-white/[0.08] transition"
                      >
                        
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/10">
                            <Icon className="h-5 w-5 text-[#e7c38a]" />
                          </div>

                          <div>
                            <div className="text-white font-semibold">{item.title}</div>
                            <div className="text-sm text-white/60 leading-6 max-w-[28rem]">
                              {item.detail}
                            </div>
                          </div>
                        </div>

                        
                        <div className="text-white/30 text-sm font-medium">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div>
              </article>
            </section>

            
            <FaqTestimonials/>
          </div>
        </div>
      </main>
    </div>
  );
}
