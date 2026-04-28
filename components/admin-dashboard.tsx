"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

const TOKEN_STORAGE_KEY = "shield-force-admin-token";
const EMAIL_STORAGE_KEY = "shield-force-admin-email";

const LEAD_FILTERS = ["ALL", "GENERAL", "BODYGUARD"] as const;

type LeadFilter = (typeof LEAD_FILTERS)[number];
type ApiRecord = Record<string, unknown>;

type NormalizedLead = {
  id: string;
  type: "GENERAL" | "BODYGUARD" | "UNKNOWN";
  name: string;
  email: string | null;
  phone: string | null;
  service: string | null;
  location: string | null;
  bodyguardCount: string | null;
  message: string | null;
  createdAtLabel: string | null;
  raw: ApiRecord;
};

function isRecord(value: unknown): value is ApiRecord {
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

function joinParts(parts: Array<string | null | undefined>): string | null {
  const joined = parts.filter(Boolean).join(", ");
  return joined || null;
}

function readNestedCollection(payload: unknown): ApiRecord[] {
  if (Array.isArray(payload)) {
    return payload.filter(isRecord);
  }

  if (!isRecord(payload)) {
    return [];
  }

  const nestedKeys = ["data", "leads", "items", "results", "records"];

  for (const key of nestedKeys) {
    const candidate = payload[key];
    const extracted = readNestedCollection(candidate);

    if (extracted.length > 0) {
      return extracted;
    }
  }

  for (const value of Object.values(payload)) {
    if (Array.isArray(value)) {
      return value.filter(isRecord);
    }
  }

  return [];
}

function extractAccessToken(payload: unknown): string | null {
  if (!isRecord(payload)) {
    return null;
  }

  const tokenInfo =
    (isRecord(payload.token_info) ? payload.token_info : null) ??
    (isRecord(payload.data) && isRecord(payload.data.token_info) ? payload.data.token_info : null);

  if (tokenInfo) {
    return (
      asString(tokenInfo.access_token) ??
      asString(tokenInfo.token) ??
      asString(tokenInfo.accessToken)
    );
  }

  return (
    asString(payload.access_token) ??
    (isRecord(payload.data) ? asString(payload.data.access_token) : null)
  );
}

function extractApiErrorMessage(payload: unknown): string | null {
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

  if (Array.isArray(payload.errors)) {
    const messages = payload.errors
      .map((entry) => {
        if (typeof entry === "string") {
          return entry.trim();
        }

        if (isRecord(entry)) {
          return asString(entry.message) ?? asString(entry.msg) ?? asString(entry.detail);
        }

        return null;
      })
      .filter((entry): entry is string => Boolean(entry));

    if (messages.length > 0) {
      return messages.join(", ");
    }
  }

  return null;
}

function inferLeadType(record: ApiRecord): "GENERAL" | "BODYGUARD" | "UNKNOWN" {
  const explicitType = asString(record.type ?? record.lead_type ?? record.leadType)?.toUpperCase();

  if (explicitType === "GENERAL" || explicitType === "BODYGUARD") {
    return explicitType;
  }

  if (
    asString(record.bodyguard_count ?? record.bodyguardCount ?? record.guard_count ?? record.guardCount)
  ) {
    return "BODYGUARD";
  }

  if (
    asString(record.message ?? record.requirement ?? record.requirements ?? record.description) ||
    asString(record.full_name ?? record.fullName ?? record.name)
  ) {
    return "GENERAL";
  }

  return "UNKNOWN";
}

function formatTimestamp(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function normalizeLead(record: ApiRecord, index: number): NormalizedLead {
  const type = inferLeadType(record);
  const name =
    asString(record.full_name ?? record.fullName ?? record.name) ?? `Lead ${index + 1}`;
  const email = asString(record.email ?? record.email_address ?? record.emailAddress);
  const phone =
    asString(
      record.phone ??
        record.phone_number ??
        record.phoneNumber ??
        record.mobile ??
        record.contact_number ??
        record.contactNumber
    );
  const service =
    asString(
      record.service ??
        record.service_type ??
        record.serviceType ??
        record.requirement_type ??
        record.requirementType
    );
  const location = joinParts([
    asString(record.city),
    asString(record.state),
    asString(record.location),
    asString(record.address),
  ]);
  const bodyguardCount =
    asString(record.bodyguard_count ?? record.bodyguardCount ?? record.guard_count ?? record.guardCount);
  const message =
    asString(
      record.message ??
        record.requirement ??
        record.requirements ??
        record.notes ??
        record.note ??
        record.description
    );
  const createdAtLabel = formatTimestamp(
    asString(
      record.created_at ??
        record.createdAt ??
        record.submitted_at ??
        record.submittedAt ??
        record.updated_at ??
        record.updatedAt
    )
  );

  return {
    id: asString(record.lead_id ?? record.leadId ?? record.id) ?? `${type.toLowerCase()}-${index}`,
    type,
    name,
    email,
    phone,
    service,
    location,
    bodyguardCount,
    message,
    createdAtLabel,
    raw: record,
  };
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

function LeadMetaPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
      {children}
    </span>
  );
}

export function AdminDashboard() {
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionEmail, setSessionEmail] = useState("");
  const [leadFilter, setLeadFilter] = useState<LeadFilter>("ALL");
  const [searchDraft, setSearchDraft] = useState("");
  const [search, setSearch] = useState("");
  const [leads, setLeads] = useState<NormalizedLead[]>([]);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  useEffect(() => {
    const storedToken = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    const storedEmail = window.localStorage.getItem(EMAIL_STORAGE_KEY) ?? "";

    setToken(storedToken);
    setEmail(storedEmail);
    setSessionEmail(storedEmail);
    setIsReady(true);
  }, []);

  const clearSession = useCallback((nextError?: string) => {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(EMAIL_STORAGE_KEY);
    setToken(null);
    setSessionEmail("");
    setPassword("");
    setLeads([]);
    setLastSyncedAt(null);
    setLeadError(null);
    setAuthError(nextError ?? null);
  }, []);

  const loadLeads = useCallback(async (authToken: string) => {
    setIsLoadingLeads(true);
    setLeadError(null);

    const params = new URLSearchParams();

    if (leadFilter !== "ALL") {
      params.set("type", leadFilter);
    }

    if (search) {
      params.set("search", search);
    }

    const queryString = params.toString();
    const requestUrl = queryString ? `/api/leads?${queryString}` : "/api/leads";

    try {
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${authToken}`,
        },
        cache: "no-store",
      });

      const payload = await readResponsePayload(response);

      if (!response.ok) {
        const message =
          extractApiErrorMessage(payload) ?? "Unable to load leads from the Shield Force backend.";

        if (response.status === 401 || response.status === 403) {
          clearSession("Your admin session expired. Sign in again.");
          return;
        }

        setLeadError(message);
        setLeads([]);
        return;
      }

      const records = readNestedCollection(payload).map(normalizeLead);
      setLeads(records);
      setLastSyncedAt(
        new Intl.DateTimeFormat("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date())
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to load leads from the Shield Force backend.";

      setLeadError(message);
      setLeads([]);
    } finally {
      setIsLoadingLeads(false);
    }
  }, [clearSession, leadFilter, search]);

  useEffect(() => {
    if (!isReady || !token) {
      return;
    }

    void loadLeads(token);
  }, [isReady, token, loadLeads]);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSigningIn(true);
    setAuthError(null);

    try {
      const response = await fetch("/api/admin/auth/sign-in", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const payload = await readResponsePayload(response);
      const accessToken = extractAccessToken(payload);

      if (!response.ok || !accessToken) {
        setAuthError(
          extractApiErrorMessage(payload) ?? "Admin sign-in failed. Check your credentials."
        );
        return;
      }

      window.localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
      window.localStorage.setItem(EMAIL_STORAGE_KEY, email.trim());
      setToken(accessToken);
      setSessionEmail(email.trim());
      setPassword("");
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Unable to reach the Shield Force backend."
      );
    } finally {
      setIsSigningIn(false);
    }
  }

  function handleLogout() {
    clearSession();
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch(searchDraft.trim());
  }

  function handleResetFilters() {
    setLeadFilter("ALL");
    setSearchDraft("");
    setSearch("");
  }

  const visibleGeneralCount = leads.filter((lead) => lead.type === "GENERAL").length;
  const visibleBodyguardCount = leads.filter((lead) => lead.type === "BODYGUARD").length;

  return (
    <section className="admin-page-root relative -mt-[6.75rem] min-h-screen overflow-hidden bg-[#050607] sm:-mt-[7.75rem] lg:-mt-[8.5rem]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,161,93,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(111,135,144,0.16),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {!isReady ? (
          <div className="section-card my-auto rounded-[2rem] px-6 py-8 text-sm text-white/72 sm:px-8">
            Loading admin workspace...
          </div>
        ) : !token ? (
          <div className="mx-auto my-auto w-full max-w-xl">
            <div className="section-card rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
              <div className="relative z-10">
                <div className="inline-flex items-center rounded-full border border-[#d2a56b]/22 bg-[#d2a56b]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#efc98b]">
                  Admin Access
                </div>
                <h1 className="display-title mt-5 text-[2.4rem] leading-[0.9] text-white sm:text-[3rem]">
                  Shield Force lead dashboard
                </h1>
                <p className="mt-4 max-w-[42ch] text-sm leading-7 text-white/64 sm:text-base">
                  Sign in with an admin account to review website enquiries, filter lead types,
                  and inspect submitted payloads.
                </p>

                <form className="mt-8 grid gap-4" onSubmit={handleSignIn}>
                  <label className="grid gap-2 text-sm text-white/78">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/48">
                      Email
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="username"
                      required
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#d2a56b]/55 focus:bg-white/7"
                      placeholder="admin@example.com"
                    />
                  </label>

                  <label className="grid gap-2 text-sm text-white/78">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/48">
                      Password
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      required
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#d2a56b]/55 focus:bg-white/7"
                      placeholder="Enter admin password"
                    />
                  </label>

                  {authError ? (
                    <div className="rounded-2xl border border-[#d67a57]/25 bg-[#d67a57]/10 px-4 py-3 text-sm text-[#ffd8c6]">
                      {authError}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSigningIn}
                    className="inline-flex items-center justify-center rounded-2xl border border-[#d9d4ca] bg-[#f5f1e8] px-5 py-3 text-sm font-semibold tracking-[0.02em] text-[#050505] transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSigningIn ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="section-card rounded-[2rem] px-6 py-7 sm:px-8">
              <div className="relative z-10">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                  <div>
                    <div className="inline-flex items-center rounded-full border border-[#d2a56b]/22 bg-[#d2a56b]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#efc98b]">
                      Admin Dashboard
                    </div>
                    <h1 className="display-title mt-5 max-w-[13ch] text-[2.3rem] leading-[0.9] text-white sm:text-[3.2rem]">
                      Shield Force leads
                    </h1>
                    <p className="mt-4 max-w-[52ch] text-sm leading-7 text-white/64 sm:text-base">
                      Review inbound enquiries, narrow the list by lead type, and search by name,
                      city, phone, or email through the backend lead index.
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3 text-sm text-white/62 xl:items-end">
                    <div>Signed in as {sessionEmail || "Admin user"}</div>
                    <div>{lastSyncedAt ? `Last synced ${lastSyncedAt}` : "Leads not synced yet"}</div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void loadLeads(token)}
                        disabled={isLoadingLeads}
                        className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isLoadingLeads ? "Refreshing..." : "Refresh"}
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center rounded-full border border-[#d67a57]/22 bg-[#d67a57]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffd8c6] transition hover:bg-[#d67a57]/16"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/4 px-5 py-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/44">
                      Visible Leads
                    </div>
                    <div className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-white">
                      {leads.length}
                    </div>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/4 px-5 py-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/44">
                      General
                    </div>
                    <div className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-white">
                      {visibleGeneralCount}
                    </div>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/4 px-5 py-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/44">
                      Bodyguard
                    </div>
                    <div className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-white">
                      {visibleBodyguardCount}
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-black/16 p-4 sm:p-5">
                  <div className="flex flex-wrap gap-2">
                    {LEAD_FILTERS.map((filter) => {
                      const isActive = leadFilter === filter;

                      return (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setLeadFilter(filter)}
                          className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                            isActive
                              ? "border border-[#d2a56b]/35 bg-[#d2a56b]/15 text-[#efc98b]"
                              : "border border-white/10 bg-white/4 text-white/58 hover:bg-white/8 hover:text-white"
                          }`}
                        >
                          {filter}
                        </button>
                      );
                    })}
                  </div>

                  <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleSearchSubmit}>
                    <input
                      type="search"
                      value={searchDraft}
                      onChange={(event) => setSearchDraft(event.target.value)}
                      placeholder="Search by name, email, phone, city..."
                      className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#d2a56b]/55 focus:bg-white/7"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-2xl border border-[#d9d4ca] bg-[#f5f1e8] px-5 py-3 text-sm font-semibold tracking-[0.02em] text-[#050505] transition hover:translate-y-[-1px]"
                    >
                      Apply Search
                    </button>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Reset
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {leadError ? (
              <div className="mt-6 rounded-[1.6rem] border border-[#d67a57]/25 bg-[#d67a57]/10 px-5 py-4 text-sm text-[#ffd8c6]">
                {leadError}
              </div>
            ) : null}

            <div className="mt-6 grid gap-4">
              {isLoadingLeads && leads.length === 0 ? (
                <div className="section-card rounded-[2rem] px-6 py-7 text-sm text-white/68 sm:px-8">
                  Loading leads...
                </div>
              ) : leads.length === 0 ? (
                <div className="section-card rounded-[2rem] px-6 py-7 text-sm text-white/68 sm:px-8">
                  No leads matched the current filters.
                </div>
              ) : (
                leads.map((lead) => (
                  <article
                    key={lead.id}
                    className="section-card rounded-[2rem] px-6 py-6 sm:px-8 sm:py-7"
                  >
                    <div className="relative z-10">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <LeadMetaPill>{lead.type}</LeadMetaPill>
                            {lead.createdAtLabel ? (
                              <LeadMetaPill>{lead.createdAtLabel}</LeadMetaPill>
                            ) : null}
                          </div>
                          <h2 className="mt-4 text-[1.4rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.7rem]">
                            {lead.name}
                          </h2>
                        </div>

                        <div className="grid gap-2 text-sm text-white/66">
                          {lead.email ? (
                            <a href={`mailto:${lead.email}`} className="transition hover:text-white">
                              {lead.email}
                            </a>
                          ) : null}
                          {lead.phone ? (
                            <a href={`tel:${lead.phone}`} className="transition hover:text-white">
                              {lead.phone}
                            </a>
                          ) : null}
                          {!lead.email && !lead.phone ? <span>Contact details not available</span> : null}
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {lead.service ? <LeadMetaPill>{lead.service}</LeadMetaPill> : null}
                        {lead.location ? <LeadMetaPill>{lead.location}</LeadMetaPill> : null}
                        {lead.bodyguardCount ? (
                          <LeadMetaPill>{`Count ${lead.bodyguardCount}`}</LeadMetaPill>
                        ) : null}
                      </div>

                      <div className="mt-5 rounded-[1.35rem] border border-white/8 bg-black/16 p-5">
                        <div className="text-[11px] uppercase tracking-[0.18em] text-white/42">
                          Requirement
                        </div>
                        <p className="mt-3 text-sm leading-7 text-white/74">
                          {lead.message ?? "No additional requirement details were provided."}
                        </p>
                      </div>

                      <details className="mt-5 rounded-[1.35rem] border border-white/8 bg-white/4 p-5 transition hover:bg-white/[0.06]">
                        <summary className="cursor-pointer list-none text-sm font-semibold text-white/82">
                          View raw payload
                        </summary>
                        <pre className="mt-4 max-h-80 overflow-auto rounded-[1rem] border border-white/8 bg-[#040506] p-4 text-xs leading-6 text-[#d4d9d1]">
                          {JSON.stringify(lead.raw, null, 2)}
                        </pre>
                      </details>
                    </div>
                  </article>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
