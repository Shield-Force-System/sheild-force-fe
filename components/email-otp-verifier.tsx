"use client";

import { useEffect, useRef, useState } from "react";

type Stage = "idle" | "sending" | "awaiting_otp" | "verifying" | "verified";

const OTP_MESSAGES: Record<string, string> = {
  INVALID_OTP: "The OTP you entered is incorrect.",
  OTP_EXPIRED: "The OTP has expired. Request a new one.",
  OTP_ALREADY_USED: "This OTP has already been used. Request a new one.",
  OTP_NOT_FOUND: "No OTP found for this email. Request a new one.",
};

export function EmailOtpVerifier({
  email,
  onVerified,
  onReset,
}: {
  email: string;
  onVerified: (token: string) => void;
  onReset?: () => void;
}) {
  const [stage, setStage] = useState<Stage>("idle");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const sentToEmailRef = useRef("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startCooldown(seconds: number) {
    setCooldown(seconds);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (sentToEmailRef.current && email !== sentToEmailRef.current && stage !== "idle") {
      setStage("idle");
      setOtp("");
      setError(null);
      sentToEmailRef.current = "";
      onReset?.();
    }
  }, [email, stage, onReset]);

  async function handleSend(isResend = false) {
    if (!email) {
      setError("Enter an email address first.");
      return;
    }
    setError(null);
    if (!isResend) setStage("sending");

    const base = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
    const endpoint = isResend
      ? `${base}/api/website/lead/email/resend-otp`
      : `${base}/api/website/lead/email/send-otp`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        retry_after_seconds?: number;
        message?: string;
      };

      if (response.status === 429) {
        const wait = data.retry_after_seconds ?? 60;
        startCooldown(wait);
        setError(`Wait ${wait} seconds before requesting another OTP.`);
        if (!isResend) setStage("idle");
        return;
      }

      if (!response.ok || !data.success) {
        setError(data.message ?? "Failed to send OTP. Try again.");
        if (!isResend) setStage("idle");
        return;
      }

      sentToEmailRef.current = email;
      setOtp("");
      setStage("awaiting_otp");
      startCooldown(60);
    } catch {
      setError("Unable to send OTP. Check your connection.");
      if (!isResend) setStage("idle");
    }
  }

  async function handleVerify() {
    if (otp.length !== 6) {
      setError("Enter the 6-digit OTP.");
      return;
    }
    setError(null);
    setStage("verifying");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}/api/website/lead/email/verify-otp`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        otp_token?: string;
        message?: string;
      };

      if (!response.ok || !data.success) {
        const code = data.message ?? "";
        setError((OTP_MESSAGES[code] ?? code) || "OTP verification failed.");
        setStage("awaiting_otp");
        return;
      }

      setStage("verified");
      onVerified(data.otp_token!);
    } catch {
      setError("Unable to verify OTP right now.");
      setStage("awaiting_otp");
    }
  }

  if (stage === "verified") {
    return (
      <div className="flex items-center gap-2 rounded-[1rem] border border-[#7da96e]/30 bg-[#7da96e]/10 px-4 py-2.5 text-sm text-[#dff0d7]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        Email verified
      </div>
    );
  }

  if (stage === "idle" || stage === "sending") {
    return (
      <div className="grid gap-1.5">
        <button
          type="button"
          disabled={!email || stage === "sending"}
          onClick={() => handleSend(false)}
          className="w-fit rounded-full border border-white/14 bg-white/6 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {stage === "sending" ? "Sending OTP…" : "Verify email"}
        </button>
        {error ? <p className="text-xs text-[#ffd8cc]">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="grid gap-3 rounded-[1.2rem] border border-white/10 bg-white/3 px-4 py-4">
      <p className="text-sm text-white/70">
        Enter the 6-digit code sent to <span className="text-white">{email}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="000000"
          autoComplete="one-time-code"
          className="form-input w-36 font-mono tracking-widest"
          disabled={stage === "verifying"}
        />
        <button
          type="button"
          disabled={stage === "verifying" || otp.length !== 6}
          onClick={handleVerify}
          className="rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-medium text-[#11130f] transition hover:bg-[var(--brand-strong)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {stage === "verifying" ? "Verifying…" : "Confirm OTP"}
        </button>
      </div>
      {error ? <p className="text-xs text-[#ffd8cc]">{error}</p> : null}
      <button
        type="button"
        disabled={cooldown > 0}
        onClick={() => handleSend(true)}
        className="w-fit text-xs text-white/50 transition hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
      </button>
    </div>
  );
}
