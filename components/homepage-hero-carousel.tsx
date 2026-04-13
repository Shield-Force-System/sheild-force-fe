"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChatIcon } from "@/components/aviation-showcase";
import { ArrowIcon } from "@/components/site-primitives";

const slides = [
  {
    id: "01",
    title: "Personal Bodyguard",
    lines: ["Personal", "Bodyguard"],
    description: "Daily escort, monthly retainers, and executive movement cover.",
    href: "/bodyguards",
    cta: "Choose bodyguard",
    image: {
      src: "/Images/bodyguard.png",
      alt: "Shield Force bodyguard",
      width: 2000,
      height: 2000,
      frameClassName: "mx-auto w-[72%] sm:w-[68%] lg:w-[62%]",
    },
    accent:
      "bg-[radial-gradient(circle_at_84%_16%,rgba(255,211,155,0.16),transparent_30%),radial-gradient(circle_at_12%_80%,rgba(255,255,255,0.08),transparent_22%)]",
  },
    {
    id: "02",
    title: "Helicopter Rental",
    lines: ["Helicopter", "Rental"],
    description:
      "Charter planning, airport coordination, and rapid movement support for high-priority travel.",
    href: "/helicopter-booking",
    cta: "Book helicopter",
    image: {
      src: "/Images/helicopter.png",
      alt: "Shield Force helicopter charter",
      width: 1920,
      height: 1080,
      frameClassName: "w-full",
    },
    accent:
      "bg-[radial-gradient(circle_at_82%_18%,rgba(156,182,206,0.18),transparent_28%),radial-gradient(circle_at_14%_76%,rgba(255,214,160,0.08),transparent_22%)]",
  },
  {
    id: "03",
    title: "Armed Security",
    lines: ["Armed", "Security"],
    description:
      "Rifle and pistol licensed deployment with verification before assignment.",
    href: "/services#armed-rifle",
    cta: "View armed cover",
    image: {
      src: "/Images/armed-security.svg",
      alt: "Shield Force armed security response",
      width: 1200,
      height: 720,
      frameClassName: "w-full",
    },
    accent:
      "bg-[radial-gradient(circle_at_82%_18%,rgba(214,122,87,0.18),transparent_28%),radial-gradient(circle_at_14%_78%,rgba(255,255,255,0.08),transparent_22%)]",
  },
  {
    id: "04",
    title: "Events & Celebrity",
    lines: ["Events", "& Celebrity"],
    description:
      "Airport pickup, public events, rally support, and stage-side control.",
    href: "/services#events-security",
    cta: "Open event support",
    image: {
      src: "/Images/events-security.svg",
      alt: "Shield Force events and celebrity security deployment",
      width: 1200,
      height: 720,
      frameClassName: "w-full",
    },
    accent:
      "bg-[radial-gradient(circle_at_84%_16%,rgba(135,144,111,0.22),transparent_30%),radial-gradient(circle_at_12%_80%,rgba(255,255,255,0.08),transparent_22%)]",
  },
  {
    id: "05",
    title: "Protected Vehicles",
    lines: ["Protected", "Vehicles"],
    description:
      "On-demand bullet proof SUVs integrated with guard and route support.",
    href: "/services#on-demand-vehicle",
    cta: "Request vehicle",
    image: {
      src: "/Images/protected-vehicle.svg",
      alt: "Shield Force protected vehicle convoy",
      width: 1200,
      height: 720,
      frameClassName: "w-full",
    },
    accent:
      "bg-[radial-gradient(circle_at_84%_16%,rgba(209,161,93,0.2),transparent_30%),radial-gradient(circle_at_12%_80%,rgba(255,255,255,0.08),transparent_22%)]",
  },
] as const;

const heroBadges = [
  "Personal Bodyguard",
  "Armed Security",
  "Helicopter Rental",
  "Events",
  "Bullet Proof Vehicles",
] as const;

export function HomepageHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_18%),radial-gradient(circle_at_61%_40%,rgba(255,255,255,0.06),transparent_16%),radial-gradient(circle_at_44%_82%,rgba(255,255,255,0.12),transparent_24%)]" />
      <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${activeSlide.accent}`} />

      <div className="relative min-h-[38rem] overflow-hidden px-4 pb-6 pt-7 sm:px-6 sm:pb-8 sm:pt-8 lg:min-h-[40rem] lg:px-8 lg:pb-10 lg:pt-10">
        <div className="absolute inset-x-[18%] bottom-14 h-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.28),rgba(255,255,255,0.08)_30%,transparent_72%)] blur-[34px]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />

        <div className="relative z-20 max-w-[30rem] pt-2 sm:pt-4 lg:pt-10">

          <div key={activeSlide.id} className="transition duration-500 ease-out">
            <h1 className="hero-title mt-4 text-[3rem] text-white sm:text-[3.75rem] lg:text-[4.4rem]">
              <span className="block">{activeSlide.lines[0]}</span>
              <span className="block">{activeSlide.lines[1]}</span>
            </h1>

            <p className="mt-7 max-w-[25rem] text-sm leading-6 text-white/58 sm:text-[14px]">
              {activeSlide.description}
            </p>
          </div>

          <div className="mt-6 flex max-w-[28rem] flex-wrap gap-2">
            {heroBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.22em] text-white/68"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={activeSlide.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ae7f4f] px-5 py-3 text-sm font-medium text-[#130f0a] transition hover:bg-[#be9161]"
            >
              {activeSlide.cta}
              <ArrowIcon />
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-[#111111] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#171717]"
            >
              Explore services
              <ArrowIcon />
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-3 py-2 text-left text-[0.72rem] uppercase tracking-[0.22em] transition ${
                    isActive
                      ? "border-[rgba(239,201,139,0.38)] bg-[rgba(209,161,93,0.1)] text-[var(--brand-strong)]"
                      : "border-white/10 bg-white/4 text-white/46 hover:bg-white/8 hover:text-white/74"
                  }`}
                >
                  {slide.id}
                </button>
              );
            })}
          </div>
        </div>

        <div className="hero-float pointer-events-none relative z-10 mx-auto mt-10 w-[118%] max-w-[1020px] -translate-x-[10%] sm:mt-6 sm:w-[112%] sm:max-w-[1120px] sm:-translate-x-[3%] lg:absolute lg:bottom-2 lg:left-[18%] lg:mt-0 lg:w-[79%] lg:max-w-none lg:translate-x-0">
          <div key={activeSlide.id} className={`transition duration-500 ease-out ${activeSlide.image.frameClassName}`}>
          <Image
            src={activeSlide.image.src}
            alt={activeSlide.image.alt}
            width={activeSlide.image.width}
            height={activeSlide.image.height}
            priority
            sizes="(min-width: 1024px) 79vw, (min-width: 640px) 112vw, 118vw"
            className="h-auto w-full object-contain drop-shadow-[0_26px_50px_rgba(0,0,0,0.55)]"
          />
          </div>
        </div>

        <div className="absolute bottom-6 right-4 z-30 rounded-full bg-white p-2 text-black shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:right-6">
          <div className="flex items-center gap-3 rounded-full pr-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] text-white">
              <ChatIcon />
            </span>
            <div className="text-sm leading-4">
              <div className="font-medium">{activeSlide.title}</div>
              <div className="text-black/70">active command focus</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
