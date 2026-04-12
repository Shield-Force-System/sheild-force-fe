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
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 620"
      className="w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hero-rotor-metal" x1="155" y1="96" x2="1120" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#696969" />
          <stop offset="0.35" stopColor="#d0d0d0" />
          <stop offset="0.7" stopColor="#8f8f8f" />
          <stop offset="1" stopColor="#5f5f5f" />
        </linearGradient>
        <linearGradient id="hero-shell" x1="184" y1="198" x2="848" y2="432" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.24" stopColor="#d8d8d8" />
          <stop offset="0.55" stopColor="#787878" />
          <stop offset="1" stopColor="#ededed" />
        </linearGradient>
        <linearGradient id="hero-shell-dark" x1="278" y1="256" x2="766" y2="430" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0b0b0b" />
          <stop offset="0.4" stopColor="#1b1b1b" />
          <stop offset="1" stopColor="#060606" />
        </linearGradient>
        <linearGradient id="hero-tail" x1="762" y1="238" x2="980" y2="305" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f2f2f2" />
          <stop offset="0.45" stopColor="#9b9b9b" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="hero-skid" x1="314" y1="430" x2="696" y2="530" gradientUnits="userSpaceOnUse">
          <stop stopColor="#181818" />
          <stop offset="0.4" stopColor="#090909" />
          <stop offset="1" stopColor="#343434" />
        </linearGradient>
        <linearGradient id="hero-glass" x1="246" y1="220" x2="668" y2="394" gradientUnits="userSpaceOnUse">
          <stop stopColor="#050505" />
          <stop offset="0.5" stopColor="#151515" />
          <stop offset="1" stopColor="#020202" />
        </linearGradient>
        <radialGradient
          id="hero-cabin-glow"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(432 320) rotate(30) scale(164 134)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffd7a0" />
          <stop offset="0.34" stopColor="#d98a4d" />
          <stop offset="0.76" stopColor="#472116" />
          <stop offset="1" stopColor="#120907" />
        </radialGradient>
        <radialGradient
          id="hero-floor"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(498 500) scale(360 62)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.16" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter
          id="hero-shadow"
          x="44"
          y="42"
          width="1120"
          height="548"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow dx="0" dy="26" stdDeviation="18" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      <ellipse cx="505" cy="500" rx="392" ry="74" fill="url(#hero-floor)" />

      <g filter="url(#hero-shadow)">
        <path d="M154 122C293 98 448 89 603 102" stroke="url(#hero-rotor-metal)" strokeLinecap="round" strokeWidth="12" />
        <path d="M602 102C772 71 948 74 1136 107" stroke="url(#hero-rotor-metal)" strokeLinecap="round" strokeWidth="12" />
        <path d="M1036 103h56" stroke="#b95443" strokeLinecap="round" strokeWidth="6" />
        <path d="M342 122h42" stroke="#b95443" strokeLinecap="round" strokeWidth="6" />
        <path d="M603 103v60" stroke="#8f8f8f" strokeLinecap="round" strokeWidth="10" />

        <path
          d="M200 346c16-108 120-184 251-184h118c62 0 121 20 168 58l84 69c43 35 70 88 76 144H154l46-87Z"
          fill="url(#hero-shell)"
        />
        <path
          d="M315 188c59-26 142-34 229-18 47 8 90 24 132 49l35 22-41 6c-53-31-112-47-180-47H415c-47 0-80 7-100 14Z"
          fill="#ffffff"
          fillOpacity="0.42"
        />
        <path
          d="M236 330c18-86 92-146 185-146h118c49 0 96 16 133 46l67 56c34 28 58 68 69 112H327c-60 0-103-58-91-114Z"
          fill="url(#hero-glass)"
        />
        <path
          d="M362 227h150c44 0 80 35 80 79v66H298v-64c0-45 22-81 64-81Z"
          fill="url(#hero-cabin-glow)"
          opacity="0.82"
        />
        <path d="M418 240h18v131h-18z" fill="#25120c" opacity="0.9" />
        <path d="M470 232h18v140h-18z" fill="#1f0f0b" opacity="0.9" />
        <path d="M524 238h16v134h-16z" fill="#1e0f0a" opacity="0.88" />
        <path d="M342 244h40v116h-40z" fill="#0c0c0c" opacity="0.85" />
        <path d="M332 294h228" stroke="#f2bf84" strokeOpacity="0.33" strokeWidth="3" />
        <path d="M338 344h210" stroke="#f2bf84" strokeOpacity="0.18" strokeWidth="3" />
        <path d="M289 390h515" stroke="#ffffff" strokeLinecap="round" strokeOpacity="0.08" strokeWidth="4" />

        <path
          d="M311 205c33-31 73-45 128-45h113c57 0 111 17 157 48"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeOpacity="0.55"
          strokeWidth="7"
        />
        <path d="M620 171c42 10 85 32 119 63" stroke="#ffffff" strokeLinecap="round" strokeOpacity="0.35" strokeWidth="5" />
        <path d="M276 361h524" stroke="url(#hero-shell-dark)" strokeLinecap="round" strokeWidth="8" />

        <path
          d="M770 245h86c29 0 55 11 76 31 21 20 34 48 34 77"
          stroke="url(#hero-tail)"
          strokeLinecap="round"
          strokeWidth="11"
        />
        <path d="M934 255 1018 220" stroke="url(#hero-tail)" strokeLinecap="round" strokeWidth="11" />
        <circle cx="1021" cy="220" r="28" stroke="#d9d9d9" strokeWidth="10" />
        <path d="M994 220h55" stroke="#d9d9d9" strokeLinecap="round" strokeWidth="7" />
        <path d="M1021 193v55" stroke="#d9d9d9" strokeLinecap="round" strokeWidth="7" />

        <circle cx="618" cy="277" r="57" fill="#d7d7d7" />
        <circle cx="618" cy="277" r="30" fill="#f6f6f6" fillOpacity="0.3" />
        <circle cx="618" cy="277" r="12" fill="#848484" />

        <path d="M338 431h350" stroke="url(#hero-skid)" strokeLinecap="round" strokeWidth="12" />
        <path d="M377 431 341 520" stroke="url(#hero-skid)" strokeLinecap="round" strokeWidth="12" />
        <path d="M590 431 626 520" stroke="url(#hero-skid)" strokeLinecap="round" strokeWidth="12" />
        <path d="M271 520h470" stroke="url(#hero-skid)" strokeLinecap="round" strokeWidth="12" />
        <path d="M320 431 284 520" stroke="#050505" strokeLinecap="round" strokeWidth="4" />
        <path d="M642 431 678 520" stroke="#050505" strokeLinecap="round" strokeWidth="4" />

        <path d="M247 325c19 56 52 90 97 103" stroke="#ffffff" strokeLinecap="round" strokeOpacity="0.14" strokeWidth="4" />
        <path d="M793 294c30 25 54 62 67 105" stroke="#ffffff" strokeLinecap="round" strokeOpacity="0.18" strokeWidth="4" />
      </g>
    </svg>
  );
}

function Rotorcraft({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const body = tone === "light" ? "#f5f1e8" : "#2f2f2f";
  const bodyAlt = tone === "light" ? "#d8d0c1" : "#575757";
  const glass = tone === "light" ? "#1a1a1a" : "#111111";
  const highlight = tone === "light" ? "#ffffff" : "#898989";
  const skid = tone === "light" ? "#beb7ab" : "#7c7c7c";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 760 360"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.95">
        <path d="M120 70h520" stroke={skid} strokeLinecap="round" strokeWidth="8" />
        <path d="M315 70c55-18 111-18 166 0" stroke={skid} strokeLinecap="round" strokeWidth="6" />
        <path d="M398 70v52" stroke={skid} strokeLinecap="round" strokeWidth="8" />
        <path
          d="M178 182c7-59 56-101 117-101h93c34 0 67 13 91 37l52 49c23 22 36 53 36 85v5H151l27-75Z"
          fill={body}
        />
        <path
          d="M245 175c16-39 49-67 87-67h77c23 0 46 9 62 25l48 47c16 15 28 34 34 56H259c-19 0-29-23-14-40l0-21Z"
          fill={glass}
        />
        <path
          d="M498 146c17 4 35 14 49 27l48 46h28c35 0 64 27 67 61H563c-2-49-24-92-65-134Z"
          fill={bodyAlt}
        />
        <ellipse cx="410" cy="206" rx="48" ry="50" fill={bodyAlt} />
        <ellipse cx="410" cy="206" rx="27" ry="28" fill={highlight} opacity="0.35" />
        <path d="M547 153h69c18 0 31 14 31 31" stroke={highlight} strokeLinecap="round" strokeWidth="7" />
        <path d="M625 152 680 128" stroke={highlight} strokeLinecap="round" strokeWidth="7" />
        <path d="M679 128h45" stroke={highlight} strokeLinecap="round" strokeWidth="7" />
        <path d="M223 252h264" stroke={skid} strokeLinecap="round" strokeWidth="10" />
        <path d="M261 252 228 315" stroke={skid} strokeLinecap="round" strokeWidth="10" />
        <path d="M447 252 482 315" stroke={skid} strokeLinecap="round" strokeWidth="10" />
        <path d="M183 315h363" stroke={skid} strokeLinecap="round" strokeWidth="10" />
        <path d="M179 190H97" stroke={bodyAlt} strokeLinecap="round" strokeWidth="7" />
        <path d="M260 110c24-32 55-49 94-50" stroke={highlight} strokeLinecap="round" strokeOpacity="0.7" strokeWidth="6" />
      </g>
    </svg>
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
      className={`relative h-40 overflow-hidden rounded-[1.35rem] border border-white/8 ${backgrounds[variant]}`}
    >
      <div className="absolute inset-x-6 top-5 h-px bg-white/12" />
      <div className="absolute inset-x-9 top-12 h-px bg-white/8" />
      <div className="absolute bottom-4 right-5 w-48">
        <Rotorcraft tone="dark" className="w-full opacity-90" />
      </div>
      <div className="absolute left-5 top-5 h-10 w-10 rounded-full border border-white/12 bg-white/6" />
    </div>
  );
}

export function FleetCard({
  name,
  price,
  tone,
  href = "/helicopter-booking",
  compact = false,
}: {
  name: string;
  price: string;
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
      <div className={`rounded-[1.3rem] ${dark ? "bg-[#2a2a2a]" : "bg-white"} p-4`}>
        <div className={compact ? "mx-auto w-[92%]" : "mx-auto w-full"}>
          <Rotorcraft tone={tone} className="w-full" />
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-[1.65rem] leading-none tracking-[-0.05em]">{name}</h3>
          <p className={`mt-3 text-sm ${dark ? "text-white/65" : "text-black/58"}`}>{price}</p>
        </div>
        <Link
          href={href}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium ${
            dark ? "bg-[#ae7f4f] text-[#120e0a]" : "bg-[#101010] text-[#f8f2e8]"
          }`}
        >
          Book now
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}
