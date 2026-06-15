"use client";

import { useEffect, useState, useTransition } from "react";
import { EmailOtpVerifier } from "@/components/email-otp-verifier";
import { FormFeedback } from "@/components/form-feedback";
import {
  getTextField,
  readApiResponseMessage,
  type SubmissionFeedback,
} from "@/lib/form-utils";

const bodyguardServiceOptions = [
  { value: "personal", label: "Personal bodyguard" },
  { value: "rifle", label: "Armed security - rifle" },
  { value: "pistol", label: "Armed security - pistol" },
  { value: "event", label: "Event & VIP Security" },
] as const;

function getServiceLabel(value: string): string {
  return (
    bodyguardServiceOptions.find((option) => option.value === value)?.label ??
    "Bodyguard requirement"
  );
}

export function BodyguardLeadForm({
  initialPreferredGuard = "",
}: {
  initialPreferredGuard?: string;
}) {
  const [preferredGuard, setPreferredGuard] = useState(initialPreferredGuard);
  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<SubmissionFeedback | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setPreferredGuard(initialPreferredGuard);
  }, [initialPreferredGuard]);

  function handleSubmit(form: HTMLFormElement) {
    if (!otpToken) {
      setFeedback({
        tone: "error",
        message: "Verify your email address before submitting.",
      });
      return;
    }

    const formData = new FormData(form);
    const serviceType = getTextField(formData, "service_type");
    const movementBrief = getTextField(formData, "movement_brief");
    const summary = [
      preferredGuard ? `Preferred guard: ${preferredGuard}` : null,
      `Service type: ${getServiceLabel(serviceType)}`,
      getTextField(formData, "start_date")
        ? `Start date: ${getTextField(formData, "start_date")}`
        : null,
      getTextField(formData, "duration")
        ? `Duration: ${getTextField(formData, "duration")}`
        : null,
      movementBrief ? `Movement brief: ${movementBrief}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const payload = {
      full_name: getTextField(formData, "full_name"),
      company_name: getTextField(formData, "company_name") || undefined,
      email,
      phone: getTextField(formData, "phone"),
      city: getTextField(formData, "city"),
      service_interest: "Bodyguard Requirement",
      bodyguard_count: Math.max(1, Number(getTextField(formData, "bodyguard_count")) || 1),
      requirement_summary: summary || "Bodyguard deployment enquiry submitted from the website.",
      otp_token: otpToken,
    };

    setFeedback(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/leads/bodyguard", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(await readApiResponseMessage(response));
        }

        form.reset();
        setEmail("");
        setOtpToken(null);
        setPreferredGuard(initialPreferredGuard);
        setFeedback({
          tone: "success",
          message:
            "Your protection request has been sent. The Shield Force team will review it and follow up directly.",
        });
      } catch (error) {
        setFeedback({
          tone: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to send the protection request right now.",
        });
      }
    });
  }

  return (
    <form
      className="mt-6 grid gap-4"
      onSubmit={(e) => { e.preventDefault(); handleSubmit(e.currentTarget); }}
    >
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
          <span>Email address</span>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>

      <EmailOtpVerifier
        email={email}
        onVerified={setOtpToken}
        onReset={() => setOtpToken(null)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
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
        <label className="space-y-2 text-sm text-white/78">
          <span>Company name</span>
          <input
            className="form-input"
            type="text"
            name="company_name"
            placeholder="Optional"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-white/78">
        <span>Preferred guard</span>
        <input
          className="form-input"
          type="text"
          name="preferred_guard"
          placeholder="Enter profile name or no preference"
          value={preferredGuard}
          onChange={(event) => setPreferredGuard(event.target.value)}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-white/78">
          <span>Service type</span>
          <select className="form-select" name="service_type" defaultValue="personal">
            {bodyguardServiceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-white/78">
          <span>City</span>
          <input className="form-input" type="text" name="city" placeholder="Mumbai" required />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-white/78">
          <span>Start date</span>
          <input className="form-input" type="date" name="start_date" />
        </label>
        <label className="space-y-2 text-sm text-white/78">
          <span>Duration</span>
          <input
            className="form-input"
            type="text"
            name="duration"
            placeholder="Single day, monthly, custom"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-white/78">
          <span>Bodyguard count</span>
          <input
            className="form-input"
            type="number"
            name="bodyguard_count"
            min="1"
            defaultValue="1"
            required
          />
        </label>
        <label className="space-y-2 text-sm text-white/78">
          <span>Requirement focus</span>
          <div className="rounded-[1rem] border border-white/8 bg-white/4 px-4 py-3 text-sm leading-6 text-[var(--ink-muted)]">
            This enquiry is sent to the bodyguard lead pipeline on the backend.
          </div>
        </label>
      </div>

      <label className="space-y-2 text-sm text-white/78">
        <span>Movement brief</span>
        <textarea
          className="form-textarea"
          name="movement_brief"
          placeholder="Mention airport transfer, rally coverage, family movement, or executive route."
          required
        />
      </label>

      <FormFeedback feedback={feedback} />

      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-full bg-[var(--brand)] px-4 py-3 text-sm font-medium text-[#11130f] transition hover:bg-[var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Submitting request..." : "Request Protection"}
      </button>
    </form>
  );
}
