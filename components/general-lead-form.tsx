"use client";

import { useState, useTransition } from "react";
import { FormFeedback } from "@/components/form-feedback";
import {
  getTextField,
  readApiResponseMessage,
  type SubmissionFeedback,
} from "@/lib/form-utils";

const serviceInterestOptions = [
  "VIP security",
  "Personal bodyguard services",
  "Armed and unarmed security deployment",
  "Event and political movement security",
  "Helicopter rental and assisted mobility",
  "Protected Vehicle Requirement",
  "General security consultation",
] as const;

export function GeneralLeadForm({
  className = "mt-6 grid gap-4",
}: {
  className?: string;
}) {
  const [feedback, setFeedback] = useState<SubmissionFeedback | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      full_name: getTextField(formData, "full_name"),
      company_name: getTextField(formData, "company_name") || undefined,
      email: getTextField(formData, "email"),
      phone: getTextField(formData, "phone"),
      city: getTextField(formData, "city"),
      service_interest: getTextField(formData, "service_interest"),
      requirement_summary: getTextField(formData, "requirement_summary"),
    };

    setFeedback(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/leads/general", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(await readApiResponseMessage(response));
        }

        form.reset();
        setFeedback({
          tone: "success",
          message:
            "Your consultation request has been sent. The Shield Force team will follow up with service fit and next steps.",
        });
      } catch (error) {
        setFeedback({
          tone: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to send the consultation request right now.",
        });
      }
    });
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-white/78">
          <span>Full name</span>
          <input className="form-input" type="text" name="full_name" placeholder="Enter your full name" required />
        </label>
        <label className="space-y-2 text-sm text-white/78">
          <span>Email address</span>
          <input className="form-input" type="email" name="email" placeholder="name@example.com" required />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-white/78">
          <span>Phone number</span>
          <input className="form-input" type="tel" name="phone" placeholder="+91 98765 43210" required />
        </label>
        <label className="space-y-2 text-sm text-white/78">
          <span>Company name</span>
          <input className="form-input" type="text" name="company_name" placeholder="Optional" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-white/78">
          <span>City</span>
          <input className="form-input" type="text" name="city" placeholder="Delhi" required />
        </label>
        <label className="space-y-2 text-sm text-white/78">
          <span>Service interest</span>
          <select className="form-select" name="service_interest" defaultValue={serviceInterestOptions[0]}>
            {serviceInterestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-2 text-sm text-white/78">
        <span>Requirement summary</span>
        <textarea
          className="form-textarea"
          name="requirement_summary"
          placeholder="Share the deployment type, timing, location, and any operational constraints."
          required
        />
      </label>

      <FormFeedback feedback={feedback} />

      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-full bg-[var(--brand)] px-4 py-3 text-sm font-medium text-[#11130f] transition hover:bg-[var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending request..." : "Request consultation"}
      </button>
    </form>
  );
}
