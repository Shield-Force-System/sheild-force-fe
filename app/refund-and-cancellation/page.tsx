import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal-page-shell";

const highlights = [
  {
    label: "Effective Date",
    value: "15-01-2025",
  },
  {
    label: "Refund Timeline",
    value: "5–10 business days",
  },
  {
    label: "Support Contact",
    value: "info@shield-force.com / 9717793719",
  }
] as const;

const sections = [
  {
    title: "1. Booking Nature",
    content: (
      <>
        <p>
          Security, travel-support, and related service requests often involve advance preparation,
          blocking personnel or partner resources, and coordinating operations before the service is
          actually delivered.
        </p>
        <p>All bookings are on-demand and resource-based, involving:</p>
        <ul>
          <li>personnel allocation</li>
          <li>logistics planning</li>
        </ul>
        <p>
          This section is included so customers understand why cancellation and refund rules are
          based not only on payment, but also on the work already initiated behind the scenes.
        </p>
      </>
    ),
  },
  {
    title: "2. Cancellation by Customer",
    content: (
      <>
        <p>
          Earlier notice gives the team a better chance to adjust schedules, reassign resources, and
          reduce avoidable losses. Late cancellations are harder to manage because planning may
          already be in progress.
        </p>
        <ul>
          <li>Cancellation more than 24 hours before service may be eligible for a partial refund</li>
          <li>Cancellation less than 24 hours before service is not eligible for a refund</li>
          <li>Same-day cancellation is not eligible for a refund</li>
        </ul>
        <p>
          These rules are intended to balance fairness to the customer with the operational effort
          already committed for the booking.
        </p>
      </>
    ),
  },
  {
    title: "3. Cancellation by Shield Force",
    content: (
      <>
        <p>
          In some situations, Shield Force may need to cancel a request to maintain safety, legal
          compliance, or service reliability. Such cancellations are not intended to inconvenience
          customers unnecessarily, but to avoid proceeding under unsuitable conditions.
        </p>
        <p>Shield Force may cancel due to:</p>
        <ul>
          <li>safety concerns</li>
          <li>legal restrictions</li>
          <li>unavailability</li>
        </ul>
        <p>In such cases, a full refund or rescheduling will be offered.</p>
        <p>
          This gives customers assurance that where the cancellation is from our side for valid
          reasons, the matter will be handled responsibly.
        </p>
      </>
    ),
  },
  {
    title: "4. Refund Timeline",
    content: (
      <>
        <p>
          Refunds are processed within 5–10 business days after approval. In some cases, the exact
          time may also depend on the payment channel, banking network, or partner-side processing.
        </p>
        <p>
          This timeline is shared so customers know what to expect and when to follow up if a refund
          has already been approved.
        </p>
      </>
    ),
  },
  {
    title: "5. Non-Refundable Cases",
    content: (
      <>
        <p>
          Some situations do not qualify for a refund because the issue arises from incorrect
          customer-side information, misconduct, or legal restrictions that prevent the service from
          being delivered.
        </p>
        <p>No refund applies if:</p>
        <ul>
          <li>incorrect information is provided</li>
          <li>service is denied due to legal issues</li>
          <li>client misconduct occurs</li>
        </ul>
        <p>
          This helps protect service personnel, prevents misuse of the platform, and supports fair
          treatment across all customer requests.
        </p>
      </>
    ),
  },
  {
    title: "6. Premium Services",
    content: (
      <>
        <p>
          Certain services may involve third-party partners, specialist equipment, or external
          operators. These types of requests may carry additional terms beyond the standard website
          cancellation rules.
        </p>
        <ul>
          <li>Helicopter and vehicle services are subject to partner policies</li>
          <li>Separate cancellation terms may apply</li>
        </ul>
        <p>
          Where relevant, such terms should be clarified before the service is finalised so the
          customer understands the commercial conditions in advance.
        </p>
      </>
    ),
  },
  {
    title: "7. Contact",
    content: (
      <>
        <p>
          If you need to request a cancellation, check refund status, or clarify the position of an
          existing request, you can contact the support team directly.
        </p>
        <p>
          For cancellation or refund, contact: <strong>info@shield-force.com / 9717793719</strong>
        </p>
        <p>
          Clear communication helps us verify the matter faster and guide you on the next steps.
        </p>
      </>
    ),
  },
];

export const metadata: Metadata = {
  title: "Refund and Cancellation",
  description:
    "Refund and cancellation policy for website enquiries, onboarding fees, and request-related charges on the Shield Force website.",
};

export default function RefundAndCancellationPage() {
  return (
    <LegalPageShell
      title="Refund & Cancellation Policy"
      description="This page explains how cancellations, refund requests, and booking-related charges are handled through the Shield Force website. The aim is to give customers clear expectations and confidence about how review, approval, and communication are managed."
      highlights={highlights}
      sections={sections}
    />
  );
}
