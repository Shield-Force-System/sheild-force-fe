"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Bodyguards", href: "/bodyguards" },
  { label: "Helicopter Booking", href: "/helicopter-booking" },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M5 15 15 5" />
      <path d="M7 5h8v8" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
    >
      <path d="M6 8.5h12" />
      <path d="M9 15.5h9" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-[1720px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 2xl:px-10">
        <div className="relative flex items-center justify-between gap-4 overflow-hidden rounded-[2rem] border border-white/10 bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),transparent_18%),radial-gradient(circle_at_61%_40%,rgba(255,255,255,0.06),transparent_16%),radial-gradient(circle_at_44%_82%,rgba(255,255,255,0.12),transparent_24%)]" />

          <div className="relative flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <nav className="hidden items-center gap-8 text-[13px] md:flex">
              {primaryNav.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative pb-4 transition hover:text-white ${
                      isActive
                        ? "text-white after:absolute after:bottom-[-17px] after:left-0 after:h-px after:w-full after:bg-white"
                        : "text-white/62"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/"
              className="brand-mark text-[13px] uppercase text-white sm:absolute sm:left-1/2 sm:-translate-x-1/2"
            >
              Sheild Force
            </Link>

            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/helicopter-booking"
                className="inline-flex items-center gap-2 rounded-full border border-[#d9d4ca] bg-[#f5f1e8] px-4 py-2 text-xs font-semibold tracking-[0.02em] text-[#050505] shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                style={{ color: "#050505" }}
              >
                Send Enquiry
                <ArrowIcon />
              </Link>

              {/* <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ae7f4f] text-black"
              >
                <MenuIcon />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
