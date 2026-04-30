"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GeneralLeadForm } from "@/components/general-lead-form";

const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Bodyguards", href: "/bodyguards" },
  { label: "Charter Helicopter", href: "/charter-booking" },
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

function CloseIcon() {
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
      <path d="M5 5 15 15" />
      <path d="M15 5 5 15" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    if (!isEnquiryOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isEnquiryOpen]);

  useEffect(() => {
    if (!isEnquiryOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsEnquiryOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEnquiryOpen]);

  return (
    <>
      <header data-public-chrome="header" className="fixed inset-x-0 top-0 z-50">
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
                aria-label="Shield Force"
                className="inline-flex flex-col items-center text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2"
              >
                <span className="brand-mark text-[13px] uppercase text-white">
                  Shield Force
                </span>
                <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.28em] text-[#d9d4ca] sm:text-[9px]">
                  Trusted by the Elite
                </span>
              </Link>

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEnquiryOpen(true)}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-[#d9d4ca] bg-[#f5f1e8] px-4 py-2 text-xs font-semibold tracking-[0.02em] text-[#050505] shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                >
                  Send Enquiry
                  <ArrowIcon />
                </button>

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

      {isEnquiryOpen ? (
        <div
          className="fixed inset-0 z-[80] overflow-y-auto bg-[rgba(4,5,5,0.82)] px-4 py-24 backdrop-blur-sm sm:px-6"
          onClick={() => setIsEnquiryOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="general-enquiry-title"
            className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#11181a_0%,#151d1f_100%)] shadow-[0_30px_90px_rgba(0,0,0,0.5)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-white/8 px-6 py-5 sm:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    id="general-enquiry-title"
                    className="display-title max-w-[14ch] text-[2rem] leading-[0.92] text-white sm:text-[2.4rem]"
                  >
                    Raise a Request
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
                    Share your requirement and the Shield Force team will follow up on
                    protection scope, movement planning, and next steps.
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close enquiry modal"
                  onClick={() => setIsEnquiryOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/72 transition hover:bg-white/8 hover:text-white"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-7">
              <GeneralLeadForm className="grid gap-4" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
