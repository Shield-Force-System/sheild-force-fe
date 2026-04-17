import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal-page-shell";

const highlights = [
  {
    label: "Effective Date",
    value: "15-01-2025",
  },
  {
    label: "Company",
    value: "Shield Force",
  },
] as const;

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p>
          We collect information only to the extent reasonably needed to understand enquiries,
          respond to users, review personnel details, and manage the website properly. The goal is
          to keep the process practical and relevant rather than excessive.
        </p>
        <p>We may collect:</p>
        <ul>
          <li>Name</li>
          <li>Phone number</li>
          <li>Email</li>
          <li>Location</li>
          <li>Service requirements</li>
          <li>Identification documents for guards</li>
        </ul>
        <p>
          This helps us connect with users accurately, reduce follow-up confusion, and ensure that
          requests and onboarding submissions are reviewed with the right context.
        </p>
      </>
    ),
  },
  {
    title: "2. Usage of Information",
    content: (
      <>
        <p>
          Information collected through the website is used for service-related and administrative
          purposes. It is not collected simply for storage without purpose.
        </p>
        <p>We use data to:</p>
        <ul>
          <li>Process bookings</li>
          <li>Verify personnel</li>
          <li>Improve service quality</li>
          <li>Contact users</li>
        </ul>
        <p>
          In practical terms, this means the information helps us respond faster, review
          requirements correctly, and maintain a more reliable customer experience.
        </p>
      </>
    ),
  },
  {
    title: "3. Data Sharing",
    content: (
      <>
        <p>
          We do not sell user data. We recognise that visitors may share personal or operationally
          relevant details because they expect discretion and professionalism from the platform.
        </p>
        <p>We may share data with:</p>
        <ul>
          <li>internal teams</li>
          <li>verified partners for service fulfillment</li>
          <li>law enforcement if legally required</li>
        </ul>
        <p>
          Any such sharing is intended only for legitimate review, fulfillment, verification, or
          legal purposes and not for unrelated resale or misuse.
        </p>
      </>
    ),
  },
  {
    title: "4. Data Security",
    content: (
      <>
        <p>
          Protecting user information is important because some enquiries may involve sensitive
          personal, operational, or identity-related details.
        </p>
        <ul>
          <li>Secure storage systems are used</li>
          <li>Access is restricted</li>
          <li>Sensitive data is protected</li>
        </ul>
        <p>However, no system is 100% secure.</p>
        <p>
          We include this clarification so users know that reasonable protection measures are used,
          while also understanding that no online environment can promise absolute technical
          security.
        </p>
      </>
    ),
  },
  {
    title: "5. Cookies",
    content: (
      <>
        <p>
          The website may use cookies or similar tools to improve browsing performance and understand
          how visitors use the site.
        </p>
        <p>We may use cookies to:</p>
        <ul>
          <li>improve user experience</li>
          <li>analyze traffic</li>
        </ul>
        <p>
          These tools help improve usability and page performance and are not intended to create an
          unreasonable intrusion into user privacy.
        </p>
      </>
    ),
  },
  {
    title: "6. User Rights",
    content: (
      <>
        <p>
          Users should have a way to request changes if submitted information is incorrect or no
          longer needed in the same form. We want communication to remain open and practical.
        </p>
        <p>Users can:</p>
        <ul>
          <li>request data deletion</li>
          <li>request data correction</li>
        </ul>
        <p>
          <strong>Contact:</strong> info@shield-force.com
        </p>
        <p>
          This gives customers and applicants a clear path to reach out regarding the data they
          submitted through the website.
        </p>
      </>
    ),
  },
  {
    title: "7. Retention",
    content: (
      <>
        <p>
          Data is retained only as long as necessary for service handling, verification, follow-up,
          operational record-keeping, and legal compliance.
        </p>
        <p>
          We do not intend to retain information longer than reasonably required for the purpose for
          which it was collected.
        </p>
      </>
    ),
  },
  {
    title: "8. Updates",
    content: (
      <>
        <p>
          This policy may be updated periodically as the website, operations, or legal obligations
          change over time.
        </p>
        <p>
          Users are encouraged to review this page from time to time so they remain informed about
          how their information is handled.
        </p>
      </>
    ),
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the Shield Force website and the information submitted through its enquiries, forms, and onboarding flows.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="This page explains how information submitted through the Shield Force website is collected, used, and protected. It is written to give users confidence that their details are handled for genuine operational purposes and with reasonable care."
      highlights={highlights}
      sections={sections}
      footerNote={
        <>
          <strong>Final Note:</strong> Keep placeholders updated before going live: effective date,
          contact email, and company legal name.
        </>
      }
    />
  );
}
