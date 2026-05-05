"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

const TOKEN_STORAGE_KEY = "shield-force-admin-token";
const EMAIL_STORAGE_KEY = "shield-force-admin-email";

const LEAD_FILTERS = ["ALL", "GENERAL", "BODYGUARD"] as const;
const BODYGUARD_STATUS_OPTIONS = [
  "ACTIVE",
  "PENDING_REVIEW",
  "INACTIVE",
  "SUSPENDED",
  "REJECTED",
] as const;

type LeadFilter = (typeof LEAD_FILTERS)[number];
type ApiRecord = Record<string, unknown>;
type InlineFeedback = {
  tone: "success" | "error";
  message: string;
};

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

type NormalizedBodyguard = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  experienceYears: string;
  languages: string[];
  specializations: string[];
  status: string;
  notes: string;
  createdAtLabel: string | null;
  updatedAtLabel: string | null;
  raw: ApiRecord;
};

type BodyguardDraft = {
  status: string;
  notes: string;
  experienceYears: string;
  languages: string;
  specializations: string;
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

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => asString(item))
      .filter((item): item is string => Boolean(item));
  }

  const stringValue = asString(value);

  if (!stringValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(stringValue);

    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => asString(item))
        .filter((item): item is string => Boolean(item));
    }
  } catch {
    // Fall back to comma-separated parsing when the backend returns plain text.
  }

  return stringValue
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseCommaSeparatedList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function readNestedCollection(payload: unknown): ApiRecord[] {
  if (Array.isArray(payload)) {
    return payload.filter(isRecord);
  }

  if (!isRecord(payload)) {
    return [];
  }

  const nestedKeys = ["data", "bodyguards", "leads", "items", "results", "records"];

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

function readNestedRecord(payload: unknown): ApiRecord | null {
  if (!isRecord(payload)) {
    return null;
  }

  const nestedKeys = ["data", "bodyguard", "item", "result", "record"];

  for (const key of nestedKeys) {
    const candidate = payload[key];

    if (isRecord(candidate)) {
      return candidate;
    }

    if (Array.isArray(candidate)) {
      const firstRecord = candidate.find(isRecord);

      if (firstRecord) {
        return firstRecord;
      }
    }
  }

  if (
    asString(payload.bodyguard_id ?? payload.bodyguardId ?? payload.id) ||
    asString(payload.full_name ?? payload.fullName ?? payload.name)
  ) {
    return payload;
  }

  for (const value of Object.values(payload)) {
    if (isRecord(value)) {
      const nestedRecord = readNestedRecord(value);

      if (nestedRecord) {
        return nestedRecord;
      }
    }
  }

  return null;
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

function formatNowLabel(): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

function normalizeStatus(value: string | null): string {
  if (!value) {
    return "PENDING_REVIEW";
  }

  return value.trim().replace(/\s+/g, "_").toUpperCase();
}

function humanizeToken(value: string): string {
  return value
    .toLowerCase()
    .split(/[\s_-]+/)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
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

function normalizeBodyguard(record: ApiRecord, index: number): NormalizedBodyguard {
  return {
    id: asString(record.bodyguard_id ?? record.bodyguardId ?? record.id) ?? `bodyguard-${index + 1}`,
    name:
      asString(
        record.full_name ?? record.fullName ?? record.name ?? record.display_name ?? record.displayName
      ) ?? `Bodyguard ${index + 1}`,
    email: asString(record.email ?? record.email_address ?? record.emailAddress),
    phone: asString(
      record.phone ??
        record.phone_number ??
        record.phoneNumber ??
        record.mobile ??
        record.contact_number ??
        record.contactNumber
    ),
    location: joinParts([
      asString(record.city),
      asString(record.state),
      asString(record.country),
      asString(record.base),
      asString(record.location),
    ]),
    experienceYears: asString(record.experience_years ?? record.experienceYears) ?? "",
    languages: parseStringArray(record.languages),
    specializations: parseStringArray(
      record.specializations ?? record.skills ?? record.categories
    ),
    status: normalizeStatus(
      asString(record.status ?? record.verification_status ?? record.verificationStatus)
    ),
    notes:
      asString(record.notes ?? record.note ?? record.admin_notes ?? record.adminNotes) ?? "",
    createdAtLabel: formatTimestamp(
      asString(
        record.created_at ??
          record.createdAt ??
          record.submitted_at ??
          record.submittedAt
      )
    ),
    updatedAtLabel: formatTimestamp(
      asString(
        record.updated_at ??
          record.updatedAt ??
          record.modified_at ??
          record.modifiedAt
      )
    ),
    raw: record,
  };
}

function createBodyguardDraft(bodyguard: NormalizedBodyguard): BodyguardDraft {
  return {
    status: bodyguard.status,
    notes: bodyguard.notes,
    experienceYears: bodyguard.experienceYears,
    languages: bodyguard.languages.join(", "),
    specializations: bodyguard.specializations.join(", "),
  };
}

function sameStringArrays(left: string[], right: string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((value, index) => value.toLowerCase() === right[index]?.toLowerCase());
}

function isBodyguardDirty(bodyguard: NormalizedBodyguard, draft: BodyguardDraft): boolean {
  return (
    normalizeStatus(draft.status) !== bodyguard.status ||
    draft.notes.trim() !== bodyguard.notes ||
    draft.experienceYears.trim() !== bodyguard.experienceYears ||
    !sameStringArrays(parseCommaSeparatedList(draft.languages), bodyguard.languages) ||
    !sameStringArrays(parseCommaSeparatedList(draft.specializations), bodyguard.specializations)
  );
}

function applyDraftToBodyguard(
  bodyguard: NormalizedBodyguard,
  draft: BodyguardDraft
): NormalizedBodyguard {
  const status = normalizeStatus(draft.status);
  const notes = draft.notes.trim();
  const experienceYears = draft.experienceYears.trim();
  const languages = parseCommaSeparatedList(draft.languages);
  const specializations = parseCommaSeparatedList(draft.specializations);

  return {
    ...bodyguard,
    status,
    notes,
    experienceYears,
    languages,
    specializations,
    updatedAtLabel: formatNowLabel(),
    raw: {
      ...bodyguard.raw,
      status,
      notes,
      experience_years: experienceYears || undefined,
      languages,
      specializations,
    },
  };
}

function bodyguardMatchesSearch(bodyguard: NormalizedBodyguard, search: string): boolean {
  const query = search.trim().toLowerCase();

  if (!query) {
    return true;
  }

  const haystack = [
    bodyguard.id,
    bodyguard.name,
    bodyguard.email,
    bodyguard.phone,
    bodyguard.location,
    bodyguard.status,
    bodyguard.experienceYears,
    bodyguard.notes,
    ...bodyguard.languages,
    ...bodyguard.specializations,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
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

function StatusPill({ status }: { status: string }) {
  const normalizedStatus = normalizeStatus(status);

  const toneClassName =
    normalizedStatus === "ACTIVE"
      ? "border-[#d2a56b]/28 bg-[#d2a56b]/12 text-[#efc98b]"
      : normalizedStatus === "PENDING_REVIEW"
        ? "border-white/10 bg-white/6 text-white/72"
        : normalizedStatus === "REJECTED"
          ? "border-[#d67a57]/28 bg-[#d67a57]/12 text-[#ffd8c6]"
          : "border-[#91a79a]/24 bg-[#91a79a]/10 text-[#d6e2da]";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${toneClassName}`}
    >
      {humanizeToken(normalizedStatus)}
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
  const [bodyguardSearchDraft, setBodyguardSearchDraft] = useState("");
  const [bodyguardSearch, setBodyguardSearch] = useState("");
  const [leads, setLeads] = useState<NormalizedLead[]>([]);
  const [bodyguards, setBodyguards] = useState<NormalizedBodyguard[]>([]);
  const [bodyguardDrafts, setBodyguardDrafts] = useState<Record<string, BodyguardDraft>>({});
  const [bodyguardFeedback, setBodyguardFeedback] = useState<
    Record<string, InlineFeedback | undefined>
  >({});
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [bodyguardError, setBodyguardError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [isLoadingBodyguards, setIsLoadingBodyguards] = useState(false);
  const [savingBodyguardId, setSavingBodyguardId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    const storedEmail = window.localStorage.getItem(EMAIL_STORAGE_KEY) ?? "";

    setToken(storedToken);
    setEmail(storedEmail);
    setSessionEmail(storedEmail);
    setIsReady(true);
  }, []);

  const clearSession = useCallback((nextError?: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      window.localStorage.removeItem(EMAIL_STORAGE_KEY);
    }

    setToken(null);
    setSessionEmail("");
    setPassword("");
    setLeads([]);
    setBodyguards([]);
    setBodyguardDrafts({});
    setBodyguardFeedback({});
    setLastSyncedAt(null);
    setLeadError(null);
    setBodyguardError(null);
    setAuthError(nextError ?? null);
    setSearchDraft("");
    setSearch("");
    setBodyguardSearchDraft("");
    setBodyguardSearch("");
  }, []);

  const loadLeads = useCallback(
    async (authToken: string) => {
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
            extractApiErrorMessage(payload) ??
            "Unable to load leads from the Shield Force backend.";

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
        setLastSyncedAt(formatNowLabel());
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
    },
    [clearSession, leadFilter, search]
  );

  const loadBodyguards = useCallback(
    async (authToken: string) => {
      setIsLoadingBodyguards(true);
      setBodyguardError(null);

      try {
        const response = await fetch("/api/bodyguards", {
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
            extractApiErrorMessage(payload) ??
            "Unable to load bodyguards from the Shield Force backend.";

          if (response.status === 401 || response.status === 403) {
            clearSession("Your admin session expired. Sign in again.");
            return;
          }

          setBodyguardError(message);
          setBodyguards([]);
          setBodyguardDrafts({});
          return;
        }

        const records = readNestedCollection(payload).map(normalizeBodyguard);
        setBodyguards(records);
        setBodyguardDrafts(
          Object.fromEntries(records.map((bodyguard) => [bodyguard.id, createBodyguardDraft(bodyguard)]))
        );
        setBodyguardFeedback({});
        setLastSyncedAt(formatNowLabel());
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to load bodyguards from the Shield Force backend.";

        setBodyguardError(message);
        setBodyguards([]);
        setBodyguardDrafts({});
      } finally {
        setIsLoadingBodyguards(false);
      }
    },
    [clearSession]
  );

  useEffect(() => {
    if (!isReady || !token) {
      return;
    }

    void loadLeads(token);
  }, [isReady, token, loadLeads]);

  useEffect(() => {
    if (!isReady || !token) {
      return;
    }

    void loadBodyguards(token);
  }, [isReady, token, loadBodyguards]);

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

  function handleResetLeadFilters() {
    setLeadFilter("ALL");
    setSearchDraft("");
    setSearch("");
  }

  function handleBodyguardSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBodyguardSearch(bodyguardSearchDraft.trim());
  }

  function handleResetBodyguardSearch() {
    setBodyguardSearchDraft("");
    setBodyguardSearch("");
  }

  function updateBodyguardDraft(
    bodyguardId: string,
    field: keyof BodyguardDraft,
    value: string
  ) {
    const fallbackBodyguard = bodyguards.find((bodyguard) => bodyguard.id === bodyguardId);

    setBodyguardDrafts((current) => ({
      ...current,
      [bodyguardId]: {
        ...(current[bodyguardId] ??
          (fallbackBodyguard
            ? createBodyguardDraft(fallbackBodyguard)
            : {
                status: "PENDING_REVIEW",
                notes: "",
                experienceYears: "",
                languages: "",
                specializations: "",
              })),
        [field]: value,
      },
    }));

    setBodyguardFeedback((current) => ({
      ...current,
      [bodyguardId]: undefined,
    }));
  }

  function resetBodyguardDraft(bodyguardId: string) {
    const currentBodyguard = bodyguards.find((bodyguard) => bodyguard.id === bodyguardId);

    if (!currentBodyguard) {
      return;
    }

    setBodyguardDrafts((current) => ({
      ...current,
      [bodyguardId]: createBodyguardDraft(currentBodyguard),
    }));

    setBodyguardFeedback((current) => ({
      ...current,
      [bodyguardId]: undefined,
    }));
  }

  async function handleRefreshDashboard() {
    if (!token) {
      return;
    }

    await Promise.all([loadLeads(token), loadBodyguards(token)]);
  }

  async function handleBodyguardUpdate(event: FormEvent<HTMLFormElement>, bodyguardId: string) {
    event.preventDefault();

    if (!token) {
      return;
    }

    const draft = bodyguardDrafts[bodyguardId];
    const currentIndex = bodyguards.findIndex((bodyguard) => bodyguard.id === bodyguardId);
    const currentBodyguard = currentIndex >= 0 ? bodyguards[currentIndex] : null;

    if (!draft || !currentBodyguard) {
      return;
    }

    const normalizedStatus = normalizeStatus(draft.status);
    const trimmedExperienceYears = draft.experienceYears.trim();

    if (!normalizedStatus) {
      setBodyguardFeedback((current) => ({
        ...current,
        [bodyguardId]: {
          tone: "error",
          message: "Status is required before saving a bodyguard profile.",
        },
      }));
      return;
    }

    if (trimmedExperienceYears) {
      const parsedExperience = Number(trimmedExperienceYears);

      if (!Number.isFinite(parsedExperience) || parsedExperience < 0) {
        setBodyguardFeedback((current) => ({
          ...current,
          [bodyguardId]: {
            tone: "error",
            message: "Experience years must be a valid non-negative number.",
          },
        }));
        return;
      }
    }

    setSavingBodyguardId(bodyguardId);
    setBodyguardFeedback((current) => ({
      ...current,
      [bodyguardId]: undefined,
    }));

    const payload = new FormData();
    payload.append("status", normalizedStatus);
    payload.append("notes", draft.notes.trim());
    payload.append("languages", JSON.stringify(parseCommaSeparatedList(draft.languages)));
    payload.append(
      "specializations",
      JSON.stringify(parseCommaSeparatedList(draft.specializations))
    );

    if (trimmedExperienceYears) {
      payload.append("experience_years", trimmedExperienceYears);
    }

    try {
      const response = await fetch(`/api/bodyguards/${encodeURIComponent(bodyguardId)}`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const responsePayload = await readResponsePayload(response);

      if (!response.ok) {
        const message =
          extractApiErrorMessage(responsePayload) ??
          "Unable to update the bodyguard profile right now.";

        if (response.status === 401 || response.status === 403) {
          clearSession("Your admin session expired. Sign in again.");
          return;
        }

        setBodyguardFeedback((current) => ({
          ...current,
          [bodyguardId]: {
            tone: "error",
            message,
          },
        }));
        return;
      }

      const updatedRecord = readNestedRecord(responsePayload);
      const updatedBodyguard = updatedRecord
        ? normalizeBodyguard(updatedRecord, currentIndex)
        : applyDraftToBodyguard(currentBodyguard, draft);

      setBodyguards((current) =>
        current.map((bodyguard) => (bodyguard.id === bodyguardId ? updatedBodyguard : bodyguard))
      );
      setBodyguardDrafts((current) => ({
        ...current,
        [bodyguardId]: createBodyguardDraft(updatedBodyguard),
      }));
      setBodyguardFeedback((current) => ({
        ...current,
        [bodyguardId]: {
          tone: "success",
          message:
            extractApiErrorMessage(responsePayload) ??
            `Bodyguard ${updatedBodyguard.id} was updated successfully.`,
        },
      }));
      setLastSyncedAt(formatNowLabel());
    } catch (error) {
      setBodyguardFeedback((current) => ({
        ...current,
        [bodyguardId]: {
          tone: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to update the bodyguard profile right now.",
        },
      }));
    } finally {
      setSavingBodyguardId(null);
    }
  }

  const visibleGeneralCount = leads.filter((lead) => lead.type === "GENERAL").length;
  const visibleBodyguardLeadCount = leads.filter((lead) => lead.type === "BODYGUARD").length;
  const listedBodyguardCount = bodyguards.filter((bodyguard) => bodyguard.status === "ACTIVE").length;
  const pendingBodyguardCount = bodyguards.filter(
    (bodyguard) => bodyguard.status === "PENDING_REVIEW"
  ).length;
  const visibleBodyguards = bodyguards.filter((bodyguard) =>
    bodyguardMatchesSearch(bodyguard, bodyguardSearch)
  );
  const isRefreshingDashboard = isLoadingLeads || isLoadingBodyguards;

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
                  Shield Force admin workspace
                </h1>
                <p className="mt-4 max-w-[42ch] text-sm leading-7 text-white/64 sm:text-base">
                  Sign in with an admin account to review website enquiries, verify onboarded
                  bodyguards, and manage which profiles stay live on the public roster.
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
                      Shield Force operations
                    </h1>
                    <p className="mt-4 max-w-[56ch] text-sm leading-7 text-white/64 sm:text-base">
                      Review inbound enquiries, verify onboarded bodyguards, and use status-driven
                      listing controls to decide which verified profiles remain live on the public
                      bodyguards page.
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3 text-sm text-white/62 xl:items-end">
                    <div>Signed in as {sessionEmail || "Admin user"}</div>
                    <div>{lastSyncedAt ? `Last synced ${lastSyncedAt}` : "Dashboard not synced yet"}</div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void handleRefreshDashboard()}
                        disabled={isRefreshingDashboard}
                        className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isRefreshingDashboard ? "Refreshing..." : "Refresh"}
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

                <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
                      General Leads
                    </div>
                    <div className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-white">
                      {visibleGeneralCount}
                    </div>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/4 px-5 py-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/44">
                      Bodyguard Leads
                    </div>
                    <div className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-white">
                      {visibleBodyguardLeadCount}
                    </div>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/4 px-5 py-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/44">
                      Listed Bodyguards
                    </div>
                    <div className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-white">
                      {listedBodyguardCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 section-card rounded-[2rem] px-6 py-7 sm:px-8">
              <div className="relative z-10">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                  <div>
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                      Bodyguard Roster
                    </div>
                    <h2 className="display-title mt-5 max-w-[15ch] text-[2rem] leading-[0.92] text-white sm:text-[2.7rem] lg:max-w-none">
                      Verify and manage bodyguard listings
                    </h2>
                    <p className="mt-4 max-w-[60ch] text-sm leading-7 text-white/64 sm:text-base">
                      Each profile is editable by bodyguard ID. Use status, experience, languages,
                      specializations, and notes to approve a profile and keep its public listing in
                      sync with backend verification.
                    </p>
                  </div>

                  <div className="text-sm text-white/58">
                    `ACTIVE` profiles are eligible for public listing on the bodyguards page.
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/4 px-5 py-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/44">
                      Loaded Roster
                    </div>
                    <div className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-white">
                      {bodyguards.length}
                    </div>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/4 px-5 py-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/44">
                      Listed
                    </div>
                    <div className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-white">
                      {listedBodyguardCount}
                    </div>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/4 px-5 py-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/44">
                      Pending Review
                    </div>
                    <div className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-white">
                      {pendingBodyguardCount}
                    </div>
                  </div>
                </div>

                <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={handleBodyguardSearchSubmit}>
                  <input
                    type="search"
                    value={bodyguardSearchDraft}
                    onChange={(event) => setBodyguardSearchDraft(event.target.value)}
                    placeholder="Search by bodyguard ID, name, phone, city, status..."
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
                    onClick={handleResetBodyguardSearch}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Reset
                  </button>
                </form>
              </div>
            </div>

            {bodyguardError ? (
              <div className="mt-6 rounded-[1.6rem] border border-[#d67a57]/25 bg-[#d67a57]/10 px-5 py-4 text-sm text-[#ffd8c6]">
                {bodyguardError}
              </div>
            ) : null}

            <div className="mt-6 grid gap-4">
              {isLoadingBodyguards && bodyguards.length === 0 ? (
                <div className="section-card rounded-[2rem] px-6 py-7 text-sm text-white/68 sm:px-8">
                  Loading bodyguard roster...
                </div>
              ) : visibleBodyguards.length === 0 ? (
                <div className="section-card rounded-[2rem] px-6 py-7 text-sm text-white/68 sm:px-8">
                  No bodyguards matched the current search.
                </div>
              ) : (
                visibleBodyguards.map((bodyguard) => {
                  const draft = bodyguardDrafts[bodyguard.id] ?? createBodyguardDraft(bodyguard);
                  const feedback = bodyguardFeedback[bodyguard.id];
                  const isDirty = isBodyguardDirty(bodyguard, draft);
                  const isSaving = savingBodyguardId === bodyguard.id;

                  return (
                    <article
                      key={bodyguard.id}
                      className="section-card rounded-[2rem] px-6 py-6 sm:px-8 sm:py-7"
                    >
                      <div className="relative z-10">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <LeadMetaPill>{bodyguard.id}</LeadMetaPill>
                              <StatusPill status={bodyguard.status} />
                              <LeadMetaPill>
                                {bodyguard.status === "ACTIVE"
                                  ? "Public listing enabled"
                                  : "Hidden from listing"}
                              </LeadMetaPill>
                              {bodyguard.createdAtLabel ? (
                                <LeadMetaPill>{`Created ${bodyguard.createdAtLabel}`}</LeadMetaPill>
                              ) : null}
                            </div>
                            <h3 className="mt-4 text-[1.4rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.7rem]">
                              {bodyguard.name}
                            </h3>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {bodyguard.location ? <LeadMetaPill>{bodyguard.location}</LeadMetaPill> : null}
                              {bodyguard.experienceYears ? (
                                <LeadMetaPill>{`${bodyguard.experienceYears} years experience`}</LeadMetaPill>
                              ) : null}
                              {bodyguard.updatedAtLabel ? (
                                <LeadMetaPill>{`Updated ${bodyguard.updatedAtLabel}`}</LeadMetaPill>
                              ) : null}
                            </div>
                          </div>

                          <div className="grid gap-2 text-sm text-white/66">
                            {bodyguard.email ? (
                              <a href={`mailto:${bodyguard.email}`} className="transition hover:text-white">
                                {bodyguard.email}
                              </a>
                            ) : null}
                            {bodyguard.phone ? (
                              <a href={`tel:${bodyguard.phone}`} className="transition hover:text-white">
                                {bodyguard.phone}
                              </a>
                            ) : null}
                            {!bodyguard.email && !bodyguard.phone ? (
                              <span>Contact details not available</span>
                            ) : null}
                          </div>
                        </div>

                        <div className="mt-5 grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
                          <div className="rounded-[1.35rem] border border-white/8 bg-black/16 p-5">
                            <div className="text-[11px] uppercase tracking-[0.18em] text-white/42">
                              Current profile
                            </div>
                            <p className="mt-3 text-sm leading-7 text-white/74">
                              {bodyguard.notes ||
                                "No admin notes have been added to this profile yet."}
                            </p>

                            <div className="mt-5">
                              <div className="text-[11px] uppercase tracking-[0.18em] text-white/42">
                                Languages
                              </div>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {bodyguard.languages.length > 0 ? (
                                  bodyguard.languages.map((language) => (
                                    <LeadMetaPill key={`${bodyguard.id}-${language}`}>
                                      {language}
                                    </LeadMetaPill>
                                  ))
                                ) : (
                                  <span className="text-sm text-white/56">No languages added</span>
                                )}
                              </div>
                            </div>

                            <div className="mt-5">
                              <div className="text-[11px] uppercase tracking-[0.18em] text-white/42">
                                Specializations
                              </div>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {bodyguard.specializations.length > 0 ? (
                                  bodyguard.specializations.map((specialization) => (
                                    <LeadMetaPill key={`${bodyguard.id}-${specialization}`}>
                                      {specialization}
                                    </LeadMetaPill>
                                  ))
                                ) : (
                                  <span className="text-sm text-white/56">
                                    No specializations added
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <form
                            className="rounded-[1.35rem] border border-white/8 bg-white/4 p-5"
                            onSubmit={(event) => {
                              void handleBodyguardUpdate(event, bodyguard.id);
                            }}
                          >
                            <div className="text-[11px] uppercase tracking-[0.18em] text-white/42">
                              Verify or update listing
                            </div>

                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                              <label className="grid gap-2 text-sm text-white/78">
                                <span>Status</span>
                                <select
                                  value={draft.status}
                                  onChange={(event) =>
                                    updateBodyguardDraft(bodyguard.id, "status", event.target.value)
                                  }
                                  className="rounded-2xl border border-white/10 bg-[#0d1011] px-4 py-3 text-sm text-white outline-none transition focus:border-[#d2a56b]/55"
                                >
                                  {BODYGUARD_STATUS_OPTIONS.map((statusOption) => (
                                    <option key={statusOption} value={statusOption}>
                                      {humanizeToken(statusOption)}
                                    </option>
                                  ))}
                                </select>
                              </label>

                              <label className="grid gap-2 text-sm text-white/78">
                                <span>Experience years</span>
                                <input
                                  type="number"
                                  min="0"
                                  value={draft.experienceYears}
                                  onChange={(event) =>
                                    updateBodyguardDraft(
                                      bodyguard.id,
                                      "experienceYears",
                                      event.target.value
                                    )
                                  }
                                  placeholder="7"
                                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#d2a56b]/55 focus:bg-white/7"
                                />
                              </label>
                            </div>

                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                              <label className="grid gap-2 text-sm text-white/78">
                                <span>Languages</span>
                                <input
                                  type="text"
                                  value={draft.languages}
                                  onChange={(event) =>
                                    updateBodyguardDraft(bodyguard.id, "languages", event.target.value)
                                  }
                                  placeholder="English, Hindi, Punjabi"
                                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#d2a56b]/55 focus:bg-white/7"
                                />
                              </label>

                              <label className="grid gap-2 text-sm text-white/78">
                                <span>Specializations</span>
                                <input
                                  type="text"
                                  value={draft.specializations}
                                  onChange={(event) =>
                                    updateBodyguardDraft(
                                      bodyguard.id,
                                      "specializations",
                                      event.target.value
                                    )
                                  }
                                  placeholder="Close Protection, Event Security"
                                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#d2a56b]/55 focus:bg-white/7"
                                />
                              </label>
                            </div>

                            <label className="mt-4 grid gap-2 text-sm text-white/78">
                              <span>Admin notes</span>
                              <textarea
                                value={draft.notes}
                                onChange={(event) =>
                                  updateBodyguardDraft(bodyguard.id, "notes", event.target.value)
                                }
                                placeholder="Verified by ops team and approved for listing"
                                className="min-h-[120px] rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#d2a56b]/55 focus:bg-white/7"
                              />
                            </label>

                            {feedback ? (
                              <div
                                className={`mt-4 rounded-[1.2rem] border px-4 py-3 text-sm ${
                                  feedback.tone === "success"
                                    ? "border-[#91a79a]/24 bg-[#91a79a]/10 text-[#d6e2da]"
                                    : "border-[#d67a57]/25 bg-[#d67a57]/10 text-[#ffd8c6]"
                                }`}
                              >
                                {feedback.message}
                              </div>
                            ) : null}

                            <div className="mt-4 flex flex-wrap gap-3">
                              <button
                                type="submit"
                                disabled={isSaving || !isDirty}
                                className="inline-flex items-center justify-center rounded-2xl border border-[#d9d4ca] bg-[#f5f1e8] px-5 py-3 text-sm font-semibold tracking-[0.02em] text-[#050505] transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
                              >
                                {isSaving ? "Saving..." : "Save bodyguard details"}
                              </button>
                              <button
                                type="button"
                                onClick={() => resetBodyguardDraft(bodyguard.id)}
                                disabled={isSaving || !isDirty}
                                className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                              >
                                Reset changes
                              </button>
                            </div>
                          </form>
                        </div>

                        <details className="mt-5 rounded-[1.35rem] border border-white/8 bg-white/4 p-5 transition hover:bg-white/[0.06]">
                          <summary className="cursor-pointer list-none text-sm font-semibold text-white/82">
                            View raw payload
                          </summary>
                          <pre className="mt-4 max-h-80 overflow-auto rounded-[1rem] border border-white/8 bg-[#040506] p-4 text-xs leading-6 text-[#d4d9d1]">
                            {JSON.stringify(bodyguard.raw, null, 2)}
                          </pre>
                        </details>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            <div className="mt-8 section-card rounded-[2rem] px-6 py-7 sm:px-8">
              <div className="relative z-10">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                  Lead Inbox
                </div>
                <h2 className="display-title mt-5 max-w-[14ch] text-[2rem] leading-[0.92] text-white sm:text-[2.7rem] lg:max-w-none">
                  Review inbound website enquiries
                </h2>
                <p className="mt-4 max-w-[56ch] text-sm leading-7 text-white/64 sm:text-base">
                  Filter the backend lead index by enquiry type and search by name, city, phone,
                  or email before opening the raw payload.
                </p>

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
                      onClick={handleResetLeadFilters}
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
                          <h3 className="mt-4 text-[1.4rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.7rem]">
                            {lead.name}
                          </h3>
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
