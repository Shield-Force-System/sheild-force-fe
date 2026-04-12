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

function PlayBadge() {
  return (
    <a
      href="#"
      className="inline-flex min-w-[10.75rem] items-center gap-3 rounded-2xl bg-black px-4 py-3 text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition hover:translate-y-[-1px]"
    >
      <svg aria-hidden="true" viewBox="0 0 28 28" className="h-8 w-8 fill-current">
        <path d="M3.63 2.31a1.4 1.4 0 0 0-.42 1v21.38c0 .38.15.74.42 1.01l.06.05L15.7 13.8v-.18L3.69 2.25l-.06.06Z" />
        <path d="m19.7 17.8-4-4 4-4 .1.06 4.73 2.69c1.35.77 1.35 1.96 0 2.73l-4.73 2.69-.1.03Z" />
        <path d="M19.8 17.76 15.7 13.67 3.63 25.74c.43.35 1.05.39 1.56.1l14.61-8.08Z" />
        <path d="M19.8 9.84 5.19 1.76a1.38 1.38 0 0 0-1.56.1L15.7 13.94l4.1-4.1Z" />
      </svg>
      <span className="text-left">
        <span className="block text-[0.55rem] uppercase tracking-[0.22em] text-white/70">
          Get it on
        </span>
        <span className="block text-lg font-semibold leading-none">Google Play</span>
      </span>
    </a>
  );
}

function AppStoreBadge() {
  return (
    <a
      href="#"
      className="inline-flex min-w-[10.75rem] items-center gap-3 rounded-2xl bg-black px-4 py-3 text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition hover:translate-y-[-1px]"
    >
      <svg aria-hidden="true" viewBox="0 0 28 28" className="h-8 w-8 fill-current">
        <path d="M18.88 14.77c.02 2.11 1.86 2.81 1.88 2.82-.02.05-.29 1.01-1.01 2-.62.86-1.27 1.71-2.3 1.73-1 .03-1.33-.59-2.47-.59-1.14 0-1.5.57-2.45.6-1 .03-1.76-.92-2.38-1.78-1.27-1.84-2.24-5.18-.94-7.43.64-1.12 1.79-1.84 3.03-1.86.95-.02 1.84.64 2.47.64.63 0 1.82-.79 3.07-.67.53.02 2.01.21 2.97 1.61-.08.05-1.77 1.03-1.75 3.93Z" />
        <path d="M16.92 5.45c.52-.63.87-1.5.78-2.37-.75.03-1.66.5-2.2 1.13-.48.56-.9 1.45-.79 2.3.84.06 1.69-.42 2.21-1.06Z" />
      </svg>
      <span className="text-left">
        <span className="block text-[0.55rem] uppercase tracking-[0.22em] text-white/70">
          Download on the
        </span>
        <span className="block text-lg font-semibold leading-none">App Store</span>
      </span>
    </a>
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
              <p className="font-display text-[2.5rem] uppercase leading-none tracking-[-0.04em] text-[#1a110a] sm:text-[3rem] lg:text-[3.35rem]">
                India&apos;s First
              </p>
              <h2 className="mt-3 flex flex-wrap items-end justify-center gap-x-3 gap-y-2 font-display text-[3rem] uppercase leading-none tracking-[-0.07em] text-[#1a110a] sm:text-[4rem] lg:text-[4.9rem]">
                <span className="relative inline-block skew-x-[-10deg] text-[#fff2df]">
                  Private
                  <span className="absolute inset-x-0 bottom-1 h-3 rounded-full bg-[linear-gradient(90deg,rgba(26,17,10,0.8),rgba(26,17,10,0))] opacity-55" />
                </span>
                <span>Charter App</span>
              </h2>
              <p className="mt-8 max-w-xl text-base leading-8 text-[#2f1f12]/88 sm:text-lg">
                On-demand helicopter services for business travel, premium transfers, and scenic
                escapes across modern Indian cities.
              </p>

              <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
                <PlayBadge />
                <AppStoreBadge />
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
