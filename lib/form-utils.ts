export type SubmissionFeedback = {
  tone: "success" | "error";
  message: string;
};

export function getTextField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function isPopulatedFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}

export async function readApiResponseMessage(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const payload = (await response.json()) as Record<string, unknown> | null;

    if (payload) {
      const directMessage = [payload.message, payload.error, payload.detail]
        .map((value) => (typeof value === "string" ? value.trim() : ""))
        .find(Boolean);

      if (directMessage) {
        return directMessage;
      }
    }
  }

  const fallbackText = await response.text();
  return fallbackText.trim() || "The request could not be completed.";
}
