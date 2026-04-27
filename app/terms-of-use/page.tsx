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
    title: "1. Services",
    content: (
      <>
        <p>
          This section explains the purpose of the website and the types of requests that may be
          handled through it. The website is designed to help customers understand the available
          service categories and connect with the team for further coordination.
        </p>
        <p>Shield Force provides:</p>
        <ul>
          <li>Personal bodyguard services</li>
          <li>Armed security personnel</li>
          <li>Event security</li>
          <li>Helicopter rental via partners</li>
          <li>Bulletproof vehicle arrangements</li>
        </ul>
        <p>
          All services are subject to availability, verification, and compliance with applicable
          laws.
        </p>
        <p>
          Displaying a service on the website does not mean that every request can be approved
          immediately. Some services may require additional review based on location, legal
          requirements, timing, or operational feasibility.
        </p>
      </>
    ),
  },
  {
    title: "2. User Responsibilities",
    content: (
      <>
        <p>
          Security-related requests require trust, clear communication, and responsible behaviour
          from all sides. These responsibilities are included to help ensure a safe and professional
          process from the moment a user submits a request.
        </p>
        <p>You agree:</p>
        <ul>
          <li>To provide accurate information during booking</li>
          <li>Not to misuse security personnel or services</li>
          <li>Not to engage services for illegal or harmful activities</li>
        </ul>
        <p>Shield Force reserves the right to refuse service if misuse is suspected.</p>
        <p>
          Providing correct information helps the team assess the request properly, respond with the
          right service guidance, and connect with customers in a more reliable way.
        </p>
      </>
    ),
  },
  {
    title: "3. Booking & Confirmation",
    content: (
      <>
        <p>
          Requests submitted through the website are treated as enquiries first. This is important
          because security and movement-based services often need internal review before they can be
          properly committed.
        </p>
        <ul>
          <li>All bookings are treated as requests until confirmed</li>
        </ul>
        <p>Final confirmation depends on:</p>
        <ul>
          <li>availability</li>
          <li>location</li>
          <li>security assessment</li>
        </ul>
        <p>
          This process helps avoid false commitments and ensures the customer receives realistic
          confirmation only after the operational situation has been checked.
        </p>
      </>
    ),
  },
  {
    title: "4. Pricing",
    content: (
      <>
        <p>
          Prices shown on the website are intended to give customers an initial understanding of the
          service range. Final pricing may change because requirements can vary significantly from
          one case to another.
        </p>
        <p>Prices are indicative and may vary based on:</p>
        <ul>
          <li>location</li>
          <li>duration</li>
          <li>risk level</li>
        </ul>
        <p>Final pricing is confirmed before service execution.</p>
        <p>
          This allows both sides to proceed with clearer expectations and gives the customer a chance
          to review the final commercial terms before the service begins.
        </p>
      </>
    ),
  },
  {
    title: "5. Liability",
    content: (
      <>
        <p>
          Shield Force aims to provide responsible coordination and due diligence, but certain
          real-world risks cannot be fully removed in every situation. This section is included so
          customers understand both the service intent and its practical limits.
        </p>
        <ul>
          <li>Shield Force acts as a service provider and coordinator</li>
          <li>While due diligence is performed, absolute risk elimination cannot be guaranteed</li>
          <li>Shield Force is not liable for unforeseen incidents</li>
          <li>Shield Force is not liable for third-party actions</li>
          <li>Shield Force is not liable for force majeure events</li>
        </ul>
        <p>
          This does not reduce the seriousness with which requests are handled. It simply clarifies
          that no provider can guarantee complete elimination of all external or emergency risks.
        </p>
      </>
    ),
  },
  {
    title: "6. Compliance",
    content: (
      <>
        <p>
          Some services involve legal, licensing, or location-based restrictions. Customers must
          therefore understand that certain assignments can proceed only if the necessary compliance
          conditions are satisfied.
        </p>
        <ul>
          <li>Armed personnel deployment is subject to local laws</li>
          <li>Clients must comply with all applicable legal requirements</li>
        </ul>
        <p>
          This is included to protect both customers and service personnel and to ensure that no
          arrangement proceeds in a legally improper manner.
        </p>
      </>
    ),
  },
  {
    title: "7. Termination",
    content: (
      <>
        <p>
          In some cases, Shield Force may need to deny or cancel a request even after initial
          communication has started. This is done only where necessary to protect legal compliance,
          safety, or service integrity.
        </p>
        <p>Shield Force may cancel bookings or deny service if:</p>
        <ul>
          <li>legal issues arise</li>
          <li>safety risks are identified</li>
          <li>false information is provided</li>
        </ul>
        <p>
          Wherever possible, the reason will be communicated clearly so the customer understands why
          the request could not continue.
        </p>
      </>
    ),
  },
  {
    title: "8. Changes",
    content: (
      <>
        <p>
          Terms may be updated without prior notice as the website, legal obligations, or service
          process evolves.
        </p>
        <p>
          Customers are encouraged to review this page from time to time so they remain aware of the
          latest terms before submitting a new request.
        </p>
      </>
    ),
  },
];

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for the Shield Force website, including listings, forms, onboarding submissions, and enquiry features.",
};

export default function TermsOfUsePage() {
  return (
    <LegalPageShell
      title="Terms of Use"
      description="By accessing or using this website and services, you agree to the following terms. These terms are meant to set clear expectations, explain how requests are reviewed, and reassure customers that service coordination is handled in a structured and professional manner."
      highlights={highlights}
      sections={sections}
    />
  );
}
