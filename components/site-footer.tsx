import Link from "next/link";

const legalLinks = [
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund & Cancellation", href: "/refund-and-cancellation" },
] as const;

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
    <footer id="contact" data-public-chrome="footer" className="mt-10">
      <div className="mx-auto w-full max-w-[1920px] px-0 sm:px-4 lg:px-6">
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden rounded-t-[3.4rem] bg-[linear-gradient(180deg,#b88a59_0%,#ae7f4f_42%,#9d6f42_100%)] px-5 pb-12 pt-12 text-[#1a110a] sm:px-8 sm:pb-14 sm:pt-14 lg:px-10 lg:pb-16 lg:pt-18">
          <SparkIcon className="absolute left-[2.5%] top-[40%] h-6 w-6 text-[#f8ebd7]/80" />
          <SparkIcon className="absolute left-[20%] top-[12%] h-10 w-10 text-[#f8ebd7]/80" />
          <SparkIcon className="absolute right-[4.5%] top-[36%] h-8 w-8 text-[#f8ebd7]/80" />

          <div className="relative z-10 flex flex-1 flex-col justify-center">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="font-display text-[2.3rem] uppercase leading-none tracking-[-0.04em] text-[#1a110a] sm:text-[2.8rem] lg:text-[3.1rem]">
                Shield Force
              </p>
              <h2 className="mt-3 flex flex-wrap items-end justify-center gap-x-3 gap-y-2 font-display text-[3rem] leading-none tracking-[-0.07em] text-[#1a110a] sm:text-[4rem] lg:text-[4.9rem]">
                <span className="relative inline-block skew-x-[-10deg] text-[#fff2df]">
                  One of the Leading
                  <span className="absolute inset-x-0 bottom-1 h-3 rounded-full bg-[linear-gradient(90deg,rgba(26,17,10,0.8),rgba(26,17,10,0))] opacity-55" />
                </span>
                <span>Elite Security Organizations</span>
              </h2>
              <p className="mt-8 max-w-xl text-base leading-8 text-[#2f1f12]/88 sm:text-lg">
                Shield Force delivers bodyguard deployment, event security, and private helicopter
                coordination with speed, discretion, and operational control for high-priority
                movement.
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

              <div className="mt-10 w-full max-w-4xl rounded-[1.8rem] border border-[#1a110a]/12 bg-[#f6e6d0]/45 p-5 text-left shadow-[0_12px_30px_rgba(0,0,0,0.08)] sm:p-6">
                <div className="grid gap-5 md:grid-cols-[1.7fr_0.9fr_0.7fr]">
                  <div>
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#1a110a]/60">
                      Address
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[#2f1f12]/92 sm:text-base">
                      5th Floor, Purvanchal Capital Tower, Plot No-TC-A, 1, Vibhuti Khand,
                      Gomti Nagar, Lucknow, Uttar Pradesh 226010
                    </p>
                  </div>

                  <div>
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#1a110a]/60">
                      Email
                    </div>
                    <Link
                      href="mailto:info@shield-force.com"
                      className="mt-2 inline-block text-sm leading-7 text-[#2f1f12]/92 transition hover:text-[#fff2df] sm:text-base"
                    >
                      info@shield-force.com
                    </Link>
                  </div>

                  <div>
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#1a110a]/60">
                      Phone
                    </div>
                    <Link
                      href="tel:9717793719"
                      className="mt-2 inline-block text-sm leading-7 text-[#2f1f12]/92 transition hover:text-[#fff2df] sm:text-base"
                    >
                      9717793719
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-[#1a110a]/12 pt-6">
            <div className="flex flex-col gap-5 text-sm text-[#1a110a]/92 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1a110a] text-sm font-bold text-[#f5e1c6]">
                    C
                  </span>
                  <span>2026 Shield Force. All rights reserved - Powered by Daftar Route Technology.</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-3 lg:justify-end">
                {legalLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="transition hover:text-[#f8ebd7]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-[-4.5rem] overflow-hidden">
            <div className="translate-x-[-1%] select-none text-[7rem] font-black uppercase leading-none tracking-[-0.08em] text-[#875b33]/45 sm:text-[11rem] lg:text-[18rem]">
              Shield
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
