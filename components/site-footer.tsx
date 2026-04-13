import Link from "next/link";

const legalLinks = [
  "Terms of Use",
  "Privacy Policy",
  "Equal Opportunity Policy",
  "Refund & Cancellation Policy",
  "Vulnerability Disclosure Policy",
  "Annual Return",
];

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0 14.7 9.3 24 12l-9.3 2.7L12 24l-2.7-9.3L0 12l9.3-2.7L12 0Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-10">
      <div className="mx-auto w-full max-w-[1920px] px-0 sm:px-4 lg:px-6">
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden rounded-t-[3.4rem] bg-[linear-gradient(180deg,#b88a59_0%,#ae7f4f_42%,#9d6f42_100%)] px-5 pb-12 pt-12 text-[#1a110a] sm:px-8 sm:pb-14 sm:pt-14 lg:px-10 lg:pb-16 lg:pt-18">
          <SparkIcon className="absolute left-[2.5%] top-[40%] h-6 w-6 text-[#f8ebd7]/80" />
          <SparkIcon className="absolute left-[20%] top-[12%] h-10 w-10 text-[#f8ebd7]/80" />
          <SparkIcon className="absolute right-[4.5%] top-[36%] h-8 w-8 text-[#f8ebd7]/80" />

          <div className="relative z-10 flex flex-1 flex-col justify-center">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="font-display text-[2.3rem] uppercase leading-none tracking-[-0.04em] text-[#1a110a] sm:text-[2.8rem] lg:text-[3.1rem]">
                Website-Led
              </p>
              <h2 className="mt-3 flex flex-wrap items-end justify-center gap-x-3 gap-y-2 font-display text-[3rem] uppercase leading-none tracking-[-0.07em] text-[#1a110a] sm:text-[4rem] lg:text-[4.9rem]">
                <span className="relative inline-block skew-x-[-10deg] text-[#fff2df]">
                  Security
                  <span className="absolute inset-x-0 bottom-1 h-3 rounded-full bg-[linear-gradient(90deg,rgba(26,17,10,0.8),rgba(26,17,10,0))] opacity-55" />
                </span>
                <span>& Charter Leads</span>
              </h2>
              <p className="mt-8 max-w-xl text-base leading-8 text-[#2f1f12]/88 sm:text-lg">
                Browse the listed bodyguards and services, submit your website enquiry, and the
                Shield Force team follows up directly for helicopter requests, personal security,
                events, and protected vehicle support.
              </p>

              <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex min-w-[11.5rem] items-center justify-center rounded-2xl border border-[#1a110a]/16 bg-[#1a110a] px-5 py-3 text-sm font-semibold tracking-[0.02em] text-[#fff2df] shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition hover:translate-y-[-1px]"
                  style={{ color: "#fff2df" }}
                >
                  View Services
                </Link>
                <Link
                  href="/helicopter-booking"
                  className="inline-flex min-w-[11.5rem] items-center justify-center rounded-2xl border border-black/14 bg-[#f8ebd7] px-5 py-3 text-sm font-medium text-[#1a110a] transition hover:translate-y-[-1px]"
                  style={{ color: "#1a110a" }}
                >
                  Send Helicopter Enquiry
                </Link>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-[#1a110a]/12 pt-6">
            <div className="flex flex-col gap-5 text-sm text-[#1a110a]/92 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1a110a] text-sm font-bold text-[#f5e1c6]">
                  C
                </span>
                <span>2025 Sheild Force Aviation Pvt. Ltd. All rights reserved.</span>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-3 lg:justify-end">
                {legalLinks.map((link) => (
                  <a key={link} href="#" className="transition hover:text-[#f8ebd7]">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-[-4.5rem] overflow-hidden">
            <div className="translate-x-[-1%] select-none text-[7rem] font-black uppercase leading-none tracking-[-0.08em] text-[#875b33]/45 sm:text-[11rem] lg:text-[18rem]">
              Sheild
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
