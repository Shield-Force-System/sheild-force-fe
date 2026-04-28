const PROD_BACKEND_ORIGIN = "https://api.gods-eye.in";

export const shieldForceApiRoutes = {
  adminAuthSignIn: "/admin/auth/sign-in",
  bodyguards: "/bodyguards",
  bodyguardOnboard: "/bodyguards/onboard",
  bodyguardById: (id: string) => `/bodyguards/${id}`,
  leads: "/leads",
  generalLead: "/leads/general",
  bodyguardLead: "/leads/bodyguard",
  helicopters: "/helicopters",
  helicopterEnquiry: "/helicopter-enquiry",
} as const;

export type ShieldForceQueryValue = string | number | boolean | null | undefined;
export type ShieldForceQueryParams = Record<string, ShieldForceQueryValue>;

export type BodyguardRecord = Record<string, unknown>;
export type HelicopterRecord = Record<string, unknown>;
export type LeadRecord = Record<string, unknown>;

export type BodyguardCard = {
  id: string;
  name: string;
  role: string;
  base: string;
  training: string;
  licence: string;
  equipment: string;
  availability: string;
};

export type HelicopterFleetCard = {
  id: string;
  name: string;
  price: string;
  details?: string;
  tone: "dark" | "light";
  href: string;
};

export type HelicopterOption = {
  id: string;
  label: string;
};

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

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
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
    // Ignore invalid JSON and fall back to comma-separated parsing.
  }

  return stringValue
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function humanizeValue(value: string | null): string {
  if (!value) {
    return "Not available";
  }

  return value
    .toLowerCase()
    .split(/[\s_-]+/)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
}

function joinParts(parts: Array<string | null | undefined>, fallback: string): string {
  const joined = parts.filter(Boolean).join(", ");
  return joined || fallback;
}

function formatCurrency(amount: number | null): string | null {
  if (amount === null || amount <= 0) {
    return null;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getShieldForceBackendOrigin(): string {
  const explicitOrigin =
    asString(process.env.NEXT_PUBLIC_BACKEND_URL) ??
    asString(process.env.BACKEND_URL) ??
    asString(process.env.SHIELD_FORCE_BACKEND_URL);

  if (explicitOrigin) {
    return explicitOrigin.replace(/\/+$/, "");
  }

  return PROD_BACKEND_ORIGIN;
}

export function getShieldForceApiBaseUrl(): string {
  return getShieldForceBackendOrigin();
}

export function buildShieldForceApiUrl(
  pathname: string,
  query: ShieldForceQueryParams = {}
): string {
  const normalizedPath = pathname.replace(/^\/+/, "");
  const url = new URL(normalizedPath, `${getShieldForceApiBaseUrl()}/`);

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

export function getShieldForceApiCandidateUrls(
  pathname: string,
  query: ShieldForceQueryParams = {}
): string[] {
  const normalizedPath = pathname.replace(/^\/+/, "");
  const candidates = [
    buildShieldForceApiUrl(normalizedPath, query),
    buildShieldForceApiUrl(`api/${normalizedPath}`, query),
  ];

  return [...new Set(candidates.map((candidate) => candidate.replace(/([^:]\/)\/+/g, "$1")))];
}

async function readResponsePayload(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

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

export function extractApiErrorMessage(payload: unknown): string | null {
  const directMessage = asString(payload);

  if (directMessage) {
    return directMessage;
  }

  if (!isRecord(payload)) {
    return null;
  }

  const message = asString(payload.message) ?? asString(payload.error) ?? asString(payload.detail);

  if (message) {
    return message;
  }

  if (Array.isArray(payload.errors)) {
    const errors = payload.errors
      .map((item) => {
        if (typeof item === "string") {
          return item.trim();
        }

        if (isRecord(item)) {
          return asString(item.message) ?? asString(item.msg) ?? asString(item.detail);
        }

        return null;
      })
      .filter((item): item is string => Boolean(item));

    if (errors.length > 0) {
      return errors.join(", ");
    }
  }

  return null;
}

export async function fetchShieldForceJson<T>(
  pathname: string,
  query: ShieldForceQueryParams = {}
): Promise<T> {
  const candidateUrls = getShieldForceApiCandidateUrls(pathname, query);
  let lastPayload: unknown = null;
  let lastStatus = 0;

  for (const candidateUrl of candidateUrls) {
    const response = await fetch(candidateUrl, {
      cache: "no-store",
    });

    const payload = await readResponsePayload(response);

    if (response.ok) {
      return payload as T;
    }

    lastPayload = payload;
    lastStatus = response.status;

    if (response.status !== 404) {
      break;
    }
  }

  throw new Error(
    extractApiErrorMessage(lastPayload) ??
      (lastStatus === 404
        ? "Shield Force API route was not found on the configured backend."
        : "Shield Force API request failed.")
  );
}

function extractCollection<T>(payload: unknown, nestedKeys: readonly string[] = []): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (!isRecord(payload)) {
    return [];
  }

  for (const key of nestedKeys) {
    const candidate = payload[key];

    if (Array.isArray(candidate)) {
      return candidate as T[];
    }

    if (isRecord(candidate)) {
      const nested = extractCollection<T>(candidate);

      if (nested.length > 0) {
        return nested;
      }
    }
  }

  for (const value of Object.values(payload)) {
    if (Array.isArray(value)) {
      return value as T[];
    }
  }

  return [];
}

export async function listBodyguards(
  query: ShieldForceQueryParams = {}
): Promise<BodyguardRecord[]> {
  const payload = await fetchShieldForceJson<unknown>(shieldForceApiRoutes.bodyguards, query);
  return extractCollection<BodyguardRecord>(payload, ["bodyguards", "data", "items", "results", "records"]);
}

export async function listHelicopters(
  query: ShieldForceQueryParams = {}
): Promise<HelicopterRecord[]> {
  const payload = await fetchShieldForceJson<unknown>(shieldForceApiRoutes.helicopters, query);
  return extractCollection<HelicopterRecord>(payload, ["helicopters", "data", "items", "results", "records"]);
}

export async function listLeads(query: ShieldForceQueryParams = {}): Promise<LeadRecord[]> {
  const payload = await fetchShieldForceJson<unknown>(shieldForceApiRoutes.leads, query);
  return extractCollection<LeadRecord>(payload, ["leads", "data", "items", "results", "records"]);
}

export function mapBodyguardCard(
  record: BodyguardRecord,
  index: number
): BodyguardCard {
  const specializations = parseStringArray(record.specializations ?? record.skills ?? record.categories);
  const languages = parseStringArray(record.languages);
  const experienceYears = asNumber(record.experience_years ?? record.experienceYears);
  const experienceSummary =
    asString(record.experience_summary ?? record.experienceSummary) ??
    asString(record.bio) ??
    asString(record.summary);
  const status = asString(record.status ?? record.verification_status ?? record.verificationStatus);
  const notes = asString(record.notes ?? record.note);

  const name =
    asString(record.full_name) ??
    asString(record.name) ??
    asString(record.display_name) ??
    `Shield Force Guard ${index + 1}`;

  const role =
    specializations.join(" / ") ||
    asString(record.role) ||
    asString(record.role_category) ||
    "Bodyguard";

  const base = joinParts(
    [asString(record.city), asString(record.state), asString(record.country), asString(record.base)],
    "Location shared after review"
  );

  const training = [
    experienceSummary,
    experienceYears !== null ? `${experienceYears} years experience` : null,
  ]
    .filter(Boolean)
    .join(" • ") || "Experience details shared after verification";

  const licence =
    status !== null
      ? `Profile status: ${humanizeValue(status)}`
      : "Verification details shared during follow-up";

  const equipment =
    languages.length > 0
      ? `Languages: ${languages.join(", ")}`
      : notes ?? "Supporting documents available during review";

  return {
    id:
      asString(record.bodyguard_id ?? record.bodyguardId ?? record.id) ??
      `${name.toLowerCase().replace(/\s+/g, "-")}-${index}`,
    name,
    role,
    base,
    training,
    licence,
    equipment,
    availability: humanizeValue(status ?? "pending review"),
  };
}

export function mapHelicopterFleetCard(
  record: HelicopterRecord,
  index: number
): HelicopterFleetCard {
  const manufacturer = asString(record.manufacturer);
  const model =
    asString(record.model_name) ??
    asString(record.model) ??
    asString(record.variant) ??
    asString(record.name);

  const helicopterId =
    asString(record.helicopter_id ?? record.helicopterId ?? record.id) ?? `helicopter-${index + 1}`;

  const name = [manufacturer, model].filter(Boolean).join(" ") || model || helicopterId;
  const hourlyRate = formatCurrency(
    asNumber(
      record.hourly_rate ??
        record.hourlyRate ??
        record.price_per_hour ??
        record.pricePerHour ??
        record.hourly_price
    )
  );
  const passengerCapacity =
    asNumber(
      record.passenger_capacity ??
        record.passengerCount ??
        record.seat_capacity ??
        record.seating_capacity ??
        record.capacity
    ) ?? null;
  const baseCity = asString(record.base_city ?? record.baseCity ?? record.city);
  const status = asString(record.status);

  const details = [
    passengerCapacity !== null ? `${passengerCapacity} passengers` : null,
    baseCity ? `Base: ${baseCity}` : null,
    status && status.toUpperCase() !== "ACTIVE" ? humanizeValue(status) : null,
  ]
    .filter(Boolean)
    .join(" • ");

  return {
    id: helicopterId,
    name,
    price: hourlyRate ? `${hourlyRate}/hour` : "Quote on request",
    details: details || undefined,
    tone: index % 2 === 0 ? "dark" : "light",
    href: `/helicopter-booking?helicopter=${encodeURIComponent(helicopterId)}#flight-enquiry`,
  };
}

export function mapHelicopterOption(record: HelicopterRecord, index: number): HelicopterOption {
  const helicopterId =
    asString(record.helicopter_id ?? record.helicopterId ?? record.id) ?? `helicopter-${index + 1}`;
  const manufacturer = asString(record.manufacturer);
  const model =
    asString(record.model_name) ??
    asString(record.model) ??
    asString(record.variant) ??
    asString(record.name);
  const label = [manufacturer, model].filter(Boolean).join(" ") || helicopterId;

  return {
    id: helicopterId,
    label,
  };
}

export function parseCommaSeparatedList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
