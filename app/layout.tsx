import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Shield Force",
    template: "%s | Shield Force",
  },
  description:
    "Shield Force frontend for bodyguard booking, helicopter rental, armed security, event deployment, and protected vehicles across UP and NCR.",
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
          <div className="flex-1 pt-[6.75rem] sm:pt-[7.75rem] lg:pt-[8.5rem]">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
