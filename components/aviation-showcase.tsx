import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/site-primitives";

export function ChatIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M7 16.5c-2.1-1.4-3.5-3.7-3.5-6.3C3.5 5.95 7.3 3 12 3s8.5 2.95 8.5 7.2-3.8 7.2-8.5 7.2c-.74 0-1.46-.08-2.14-.23L5 20l2-3.5Z" />
      <path d="M8.5 10.4h7" />
      <path d="M8.5 13.6H13" />
    </svg>
  );
}

export function HeroRotorcraft() {
  return (
    <Image
      src="/Images/helicopter.png"
      alt="Shield Force helicopter"
      width={1920}
      height={1080}
      priority
      sizes="(min-width: 1024px) 79vw, (min-width: 640px) 112vw, 118vw"
      className="h-auto w-full object-contain drop-shadow-[0_26px_50px_rgba(0,0,0,0.55)]"
    />
  );
}

export function ServiceVisual({ variant }: { variant: string }) {
  const backgrounds: Record<string, string> = {
    sunset:
      "bg-[radial-gradient(circle_at_20%_25%,rgba(255,200,140,0.32),transparent_28%),linear-gradient(135deg,#4b2412,#130f0d_55%,#1b1714)]",
    copper:
      "bg-[radial-gradient(circle_at_78%_24%,rgba(220,138,78,0.26),transparent_30%),linear-gradient(135deg,#2a1b15,#5e3420_48%,#171210)]",
    night:
      "bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.1),transparent_22%),linear-gradient(135deg,#181818,#101010_50%,#24211e)]",
  };

  return (
    <div
      className={`relative h-40 overflow-hidden rounded-[1.35rem] border border-white/8 ${backgrounds[variant] ?? backgrounds.night}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.08))]" />
      <div className="absolute inset-x-6 top-5 h-px bg-white/12" />
      <div className="absolute inset-x-9 top-12 h-px bg-white/8" />
      <div className="absolute left-5 top-5 h-10 w-10 rounded-full border border-white/12 bg-white/6" />
      <div className="relative h-full w-full">
        <Image
          src="/Images/helicopter.png"
          alt="Shield Force helicopter"
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 44vw, 100vw"
          className="object-contain px-4 py-6 drop-shadow-[0_20px_32px_rgba(0,0,0,0.45)]"
        />
      </div>
    </div>
  );
}

export function FleetCard({
  name,
  price,
  details,
  tone,
  href = "/helicopter-booking",
  compact = false,
}: {
  name: string;
  price: string;
  details?: string;
  tone: "dark" | "light";
  href?: string;
  compact?: boolean;
}) {
  const dark = tone === "dark";

  return (
    <article
      className={`rounded-[1.7rem] border p-4 ${compact ? "min-h-[228px]" : "min-h-[300px]"} ${
        dark
          ? "border-white/8 bg-[#1b1b1b] text-[#f6f1e8]"
          : "border-[#d6cfbf] bg-[#f5f1e8] text-[#121212]"
      }`}
    >
      <div className={`relative overflow-hidden rounded-[1.3rem] ${dark ? "bg-[#2a2a2a]" : "bg-white"} p-4`}>
        <div className={compact ? "mx-auto w-[92%]" : "mx-auto w-full"}>
          <Image
            src="/Images/helicopter.png"
            alt={name}
            width={1920}
            height={1080}
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-[1.65rem] leading-none tracking-[-0.05em]">{name}</h3>
          <p className={`mt-3 text-sm ${dark ? "text-white/65" : "text-black/58"}`}>{price}</p>
          {details ? (
            <p className={`mt-2 text-sm leading-6 ${dark ? "text-white/48" : "text-black/52"}`}>
              {details}
            </p>
          ) : null}
        </div>
        <Link
          href={href}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium ${
            dark ? "bg-[#ae7f4f] text-[#120e0a]" : "bg-[#101010] text-[#f8f2e8]"
          }`}
        >
          Request charter
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}
