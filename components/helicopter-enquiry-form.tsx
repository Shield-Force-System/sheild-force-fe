"use client";

import { useState, useTransition } from "react";
import { FormFeedback } from "@/components/form-feedback";
import {
  getTextField,
  readApiResponseMessage,
  type SubmissionFeedback,
} from "@/lib/form-utils";

const helicopterServiceOptions = [
  { value: "charter", label: "Private charter" },
  { value: "airport", label: "Airport pickup and drop" },
  { value: "rally", label: "Politician rally movement" },
  { value: "celebrity", label: "VIP & celebrity movement" },
  { value: "premium", label: "Premium intercity transfer" },
] as const;

function getServiceLabel(value: string): string {
  return (
    helicopterServiceOptions.find((option) => option.value === value)?.label ??
    "Helicopter enquiry"
  );
}

export function HelicopterEnquiryForm({
  initialHelicopterId = "",
}: {
  initialHelicopterId?: string;
}) {
  const [feedback, setFeedback] = useState<SubmissionFeedback | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const serviceType = getTextField(formData, "service_type");
    const operationalNotes = getTextField(formData, "operational_notes");

    const message = [
      `Service type: ${getServiceLabel(serviceType)}`,
      getTextField(formData, "flight_date")
        ? `Preferred date: ${getTextField(formData, "flight_date")}`
        : null,
      operationalNotes ? `Operational notes: ${operationalNotes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const payload: Record<string, string | number> = {
      full_name: getTextField(formData, "full_name"),
      phone: getTextField(formData, "phone"),
      departure: getTextField(formData, "departure"),
      destination: getTextField(formData, "destination"),
      passenger_count: Math.max(1, Number(getTextField(formData, "passenger_count")) || 1),
      message: message || "Helicopter charter enquiry submitted from the website.",
    };

    const selectedHelicopterId =
      getTextField(formData, "helicopter_id") || initialHelicopterId;

    if (selectedHelicopterId) {
      payload.helicopter_id = selectedHelicopterId;
    }

    setFeedback(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/helicopter-enquiry", {
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
            "Your charter request has been sent. The Shield Force team will follow up with feasibility and pricing.",
        });
      } catch (error) {
        setFeedback({
          tone: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to send the charter request right now.",
        });
      }
    });
  }

  return (
    <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-white/78">
          <span>Full name</span>
          <input
            className="form-input"
            type="text"
            name="full_name"
            placeholder="Enter your full name"
            required
          />
        </label>
        <label className="space-y-2 text-sm text-white/78">
          <span>Phone number</span>
          <input
            className="form-input"
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            required
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-white/78">
          <span>Departure</span>
          <input className="form-input" type="text" name="departure" placeholder="Lucknow, Noida, NCR" required />
        </label>
        <label className="space-y-2 text-sm text-white/78">
          <span>Arrival</span>
          <input
            className="form-input"
            type="text"
            name="destination"
            placeholder="Destination city or helipad"
            required
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-white/78">
          <span>Flight date</span>
          <input className="form-input" type="date" name="flight_date" />
        </label>
        <label className="space-y-2 text-sm text-white/78">
          <span>Passenger count</span>
          <input
            className="form-input"
            type="number"
            name="passenger_count"
            min="1"
            defaultValue="4"
            required
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-white/78">
        <span>Service type</span>
        <select className="form-select" name="service_type" defaultValue="charter">
          {helicopterServiceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm text-white/78">
        <span>Operational notes</span>
        <textarea
          className="form-textarea"
          name="operational_notes"
          placeholder="Add timing, ground escort requirement, event schedule, or protected vehicle need."
          required
        />
      </label>

      {initialHelicopterId ? (
        <input type="hidden" name="helicopter_id" value={initialHelicopterId} />
      ) : null}

      <FormFeedback feedback={feedback} />

      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-full bg-[var(--brand)] px-4 py-3 text-sm font-medium text-[#11130f] transition hover:bg-[var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Submitting request..." : "Send helicopter enquiry"}
      </button>
    </form>
  );
}
