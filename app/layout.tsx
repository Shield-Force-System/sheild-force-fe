import type { Metadata } from "next";
import Script from "next/script";
import { SiteFaqSection } from "@/components/site-faq-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Shield Force",
    template: "%s | Shield Force",
  },
  description:
    "Shield Force website for bodyguard enquiries, helicopter leads, armed security, event deployment, and protected vehicles across UP and NCR.",
  icons: {
    icon: [{ url: "/Images/favicon.jpg", type: "image/jpeg" }],
    shortcut: "/Images/favicon.jpg",
    apple: "/Images/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M3SBNJG4');`}
        </Script>
        <Script
          id="google-analytics-src"
          src="https://www.googletagmanager.com/gtag/js?id=G-M7083BBFPD"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-M7083BBFPD');`}
        </Script>
      </head>
      <body className="min-h-full">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3SBNJG4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1 pt-[6.75rem] sm:pt-[7.75rem] lg:pt-[8.5rem]">
            {children}
            <SiteFaqSection />
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
