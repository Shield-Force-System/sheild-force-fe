import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Shield Force admin lead dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <>
      <style>{`
        [data-public-chrome="header"],
        [data-public-chrome="faq"],
        [data-public-chrome="footer"] {
          display: none !important;
        }
      `}</style>
      <AdminDashboard />
    </>
  );
}
