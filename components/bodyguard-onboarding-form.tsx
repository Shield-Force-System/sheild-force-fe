"use client";

import { useState, useTransition } from "react";
import { FormFeedback } from "@/components/form-feedback";
import {
  isPopulatedFile,
  readApiResponseMessage,
  type SubmissionFeedback,
} from "@/lib/form-utils";

function appendFiles(payload: FormData, fieldName: string, values: FormDataEntryValue[]) {
  values.forEach((value) => {
    if (isPopulatedFile(value)) {
      payload.append(fieldName, value);
    }
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return null;
}

async function readResponsePayload(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function extractPayloadMessage(payload: unknown): string | null {
  if (typeof payload === "string") {
    const trimmed = payload.trim();
    return trimmed || null;
  }

  if (!isRecord(payload)) {
    return null;
  }

  const directMessage =
    asString(payload.message) ?? asString(payload.error) ?? asString(payload.detail);

  if (directMessage) {
    return directMessage;
  }

  if (isRecord(payload.data)) {
    return (
      asString(payload.data.message) ??
      asString(payload.data.error) ??
      asString(payload.data.detail)
    );
  }

  return null;
}

function extractBodyguardId(payload: unknown): string | null {
  if (!isRecord(payload)) {
    return null;
  }

  const directId = asString(payload.bodyguard_id ?? payload.bodyguardId ?? payload.id);

  if (directId) {
    return directId;
  }

  const nestedRecord =
    (isRecord(payload.data) ? payload.data : null) ??
    (isRecord(payload.bodyguard) ? payload.bodyguard : null) ??
    null;

  if (!nestedRecord) {
    return null;
  }

  return asString(nestedRecord.bodyguard_id ?? nestedRecord.bodyguardId ?? nestedRecord.id);
}

const steps = [
  {
    id: "01",
    title: "Personal Details",
    description: "Basic profile, contact information, and operating location.",
  },
  {
    id: "02",
    title: "Professional Details",
    description: "Experience, languages, specializations, and deployment notes.",
  },
  {
    id: "03",
    title: "Document Uploads",
    description: "Upload mandatory documents and any supporting proof.",
  },
] as const;

type OnboardingFields = {
  full_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  experience_years: string;
  languages: string;
  specializations: string;
  notes: string;
};

export function BodyguardOnboardingForm() {
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState<OnboardingFields>({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    experience_years: "",
    languages: "",
    specializations: "",
    notes: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [governmentId, setGovernmentId] = useState<File | null>(null);
  const [certificates, setCertificates] = useState<File[]>([]);
  const [supportingDocuments, setSupportingDocuments] = useState<File[]>([]);
  const [feedback, setFeedback] = useState<SubmissionFeedback | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateField(name: keyof OnboardingFields, value: string) {
    setFields((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setStep(0);
    setFields({
      full_name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      country: "",
      experience_years: "",
      languages: "",
      specializations: "",
      notes: "",
    });
    setPhoto(null);
    setResume(null);
    setGovernmentId(null);
    setCertificates([]);
    setSupportingDocuments([]);
  }

  function getStepError(stepIndex: number): string | null {
    if (stepIndex === 0) {
      if (!fields.full_name || !fields.email || !fields.phone) {
        return "Complete full name, email address, and phone before continuing.";
      }

      if (!fields.city || !fields.state || !fields.country || !fields.experience_years) {
        return "Add city, state, country, and years of experience before continuing.";
      }
    }

    if (stepIndex === 1) {
      if (!fields.languages || !fields.specializations) {
        return "Add languages and specializations before continuing.";
      }
    }

    if (stepIndex === 2) {
      if (!photo || !resume || !governmentId) {
        return "Photo, resume, and government ID are required to submit onboarding.";
      }
    }

    return null;
  }

  function goToNextStep() {
    const error = getStepError(step);

    if (error) {
      setFeedback({
        tone: "error",
        message: error,
      });
      return;
    }

    setFeedback(null);
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function goToPreviousStep() {
    setFeedback(null);
    setStep((current) => Math.max(current - 1, 0));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const validationError = getStepError(step);

    if (validationError) {
      setFeedback({
        tone: "error",
        message: validationError,
      });
      return;
    }

    const payload = new FormData();

    [
      "full_name",
      "email",
      "phone",
      "city",
      "state",
      "country",
      "experience_years",
      "notes",
    ].forEach((fieldName) => {
      const value = fields[fieldName as keyof OnboardingFields];

      if (value) {
        payload.append(fieldName, value);
      }
    });

    payload.append("languages", fields.languages);
    payload.append("specializations", fields.specializations);
    payload.append("status", "ACTIVE");

    if (photo) {
      payload.append("photo", photo);
    }

    if (resume) {
      payload.append("resume", resume);
    }

    if (governmentId) {
      payload.append("government_id", governmentId);
    }

    appendFiles(payload, "certificates", certificates);
    appendFiles(payload, "supporting_documents", supportingDocuments);

    setFeedback(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/bodyguards/onboard", {
          method: "POST",
          body: payload,
        });

        if (!response.ok) {
          throw new Error(await readApiResponseMessage(response));
        }

        const responsePayload = await readResponsePayload(response);
        const bodyguardId = extractBodyguardId(responsePayload);
        const responseMessage = extractPayloadMessage(responsePayload);

        form.reset();
        resetForm();
        setFeedback({
          tone: "success",
          message:
            bodyguardId
              ? `${
                  responseMessage ??
                  "Your onboarding request has been submitted for review. Shield Force will verify the documents and contact you."
                } Bodyguard ID: ${bodyguardId}.`
              : responseMessage ??
                "Your onboarding request has been submitted for review. Shield Force will verify the documents and contact you.",
        });
      } catch (error) {
        setFeedback({
          tone: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to submit the onboarding form right now.",
        });
      }
    });
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-3">
        {steps.map((item, index) => {
          const isActive = index === step;
          const isCompleted = index < step;

          return (
            <div
              key={item.id}
              className={`rounded-[1.2rem] border px-4 py-4 text-left ${
                isActive
                  ? "border-white/18 bg-black/16"
                  : isCompleted
                    ? "border-white/12 bg-black/10"
                    : "border-white/8 bg-black/8"
              }`}
            >
              <div className="text-[0.72rem] uppercase tracking-[0.22em] text-[#fff1d8]/58">
                {item.id}
              </div>
              <div className="mt-2 text-base font-semibold text-white">{item.title}</div>
              <div className="mt-2 text-sm leading-6 text-[#fff1d8]/74">{item.description}</div>
            </div>
          );
        })}
      </div>

      {step === 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>Full name</span>
              <input
                className="form-input"
                type="text"
                name="full_name"
                placeholder="Rahul Singh"
                value={fields.full_name}
                onChange={(event) => updateField("full_name", event.target.value)}
                required
              />
            </label>
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>Email address</span>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="rahul@example.com"
                value={fields.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>Phone</span>
              <input
                className="form-input"
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={fields.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                required
              />
            </label>
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>Experience in years</span>
              <input
                className="form-input"
                type="number"
                name="experience_years"
                min="0"
                placeholder="5"
                value={fields.experience_years}
                onChange={(event) => updateField("experience_years", event.target.value)}
                required
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>City</span>
              <input
                className="form-input"
                type="text"
                name="city"
                placeholder="Delhi"
                value={fields.city}
                onChange={(event) => updateField("city", event.target.value)}
                required
              />
            </label>
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>State</span>
              <input
                className="form-input"
                type="text"
                name="state"
                placeholder="Delhi"
                value={fields.state}
                onChange={(event) => updateField("state", event.target.value)}
                required
              />
            </label>
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>Country</span>
              <input
                className="form-input"
                type="text"
                name="country"
                placeholder="India"
                value={fields.country}
                onChange={(event) => updateField("country", event.target.value)}
                required
              />
            </label>
          </div>
        </>
      ) : null}

      {step === 1 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>Languages</span>
              <input
                className="form-input"
                type="text"
                name="languages"
                placeholder="Hindi,English"
                value={fields.languages}
                onChange={(event) => updateField("languages", event.target.value)}
                required
              />
            </label>
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>Specializations</span>
              <input
                className="form-input"
                type="text"
                name="specializations"
                placeholder="VIP Security,Armed Protection"
                value={fields.specializations}
                onChange={(event) => updateField("specializations", event.target.value)}
                required
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-[#fff1d8]/82">
            <span>Notes</span>
            <textarea
              className="form-textarea"
              name="notes"
              placeholder="Available immediately"
              value={fields.notes}
              onChange={(event) => updateField("notes", event.target.value)}
            />
          </label>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>Photo</span>
              <input
                className="form-input file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white"
                type="file"
                name="photo"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
                required
              />
            </label>
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>Resume</span>
              <input
                className="form-input file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white"
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={(event) => setResume(event.target.files?.[0] ?? null)}
                required
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>Government ID</span>
              <input
                className="form-input file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white"
                type="file"
                name="government_id"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(event) => setGovernmentId(event.target.files?.[0] ?? null)}
                required
              />
            </label>
            <label className="space-y-2 text-sm text-[#fff1d8]/82">
              <span>Certificates</span>
              <input
                className="form-input file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white"
                type="file"
                name="certificates"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={(event) => setCertificates(Array.from(event.target.files ?? []))}
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-[#fff1d8]/82">
            <span>Supporting documents</span>
            <input
              className="form-input file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white"
              type="file"
              name="supporting_documents"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              multiple
              onChange={(event) => setSupportingDocuments(Array.from(event.target.files ?? []))}
            />
          </label>
        </>
      ) : null}

      <div className="rounded-[1rem] border border-white/10 bg-black/12 px-4 py-3 text-sm leading-6 text-[#fff1d8]/74">
        Registration charge: <span className="text-white">₹1,500</span>
      </div>

      <FormFeedback feedback={feedback} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-[#fff1d8]/70">
          Step {step + 1} of {steps.length}
        </div>

        <div className="flex flex-wrap gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={goToPreviousStep}
              className="rounded-full border border-white/12 bg-black/16 px-4 py-3 text-sm font-medium text-white transition hover:bg-black/24"
            >
              Back
            </button>
          ) : null}

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="rounded-full border border-white/12 bg-black/16 px-4 py-3 text-sm font-medium text-white transition hover:bg-black/24"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full border border-white/12 bg-black/16 px-4 py-3 text-sm font-medium text-white transition hover:bg-black/24 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Submitting..." : "Submit onboarding"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
