import type { Metadata } from "next";
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
    icon: "/Images/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
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
