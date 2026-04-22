import type { SubmissionFeedback } from "@/lib/form-utils";

export function FormFeedback({
  feedback,
  className = "",
}: {
  feedback: SubmissionFeedback | null;
  className?: string;
}) {
  if (!feedback) {
    return null;
  }

  const toneClasses =
    feedback.tone === "success"
      ? "border-[#7da96e]/30 bg-[#7da96e]/10 text-[#dff0d7]"
      : "border-[#d67a57]/35 bg-[#d67a57]/10 text-[#ffd8cc]";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-[1rem] border px-4 py-3 text-sm leading-6 ${toneClasses} ${className}`}
    >
      {feedback.message}
    </div>
  );
}
