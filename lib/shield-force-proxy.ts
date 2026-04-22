import { NextRequest, NextResponse } from "next/server";
import { extractApiErrorMessage, getShieldForceApiCandidateUrls } from "@/lib/shield-force-api";

function filterForwardHeaders(request: NextRequest, isMultipart: boolean): Headers {
  const headers = new Headers();
  const accept = request.headers.get("accept");
  const contentType = request.headers.get("content-type");

  if (accept) {
    headers.set("accept", accept);
  }

  if (contentType && !isMultipart) {
    headers.set("content-type", contentType);
  }

  return headers;
}

export async function proxyShieldForceRequest(
  request: NextRequest,
  pathname: string
): Promise<NextResponse> {
  const query = Object.fromEntries(request.nextUrl.searchParams.entries());
  const upstreamUrls = getShieldForceApiCandidateUrls(pathname, query);
  const contentType = request.headers.get("content-type") ?? "";
  const isMultipart = contentType.includes("multipart/form-data");
  const headers = filterForwardHeaders(request, isMultipart);
  let body: BodyInit | null | undefined;

  if (request.method !== "GET" && request.method !== "HEAD") {
    if (isMultipart) {
      body = await request.formData();
    } else {
      const rawBody = await request.text();
      body = rawBody || undefined;
    }
  }

  try {
    let lastResponseText = "";
    let lastStatus = 502;
    let lastContentType = "application/json";
    let attemptedUpstreamUrl = upstreamUrls[0] ?? "";

    for (const upstreamUrl of upstreamUrls) {
      attemptedUpstreamUrl = upstreamUrl;

      const upstreamResponse = await fetch(upstreamUrl, {
        method: request.method,
        headers,
        body,
        cache: "no-store",
      });

      const responseText = await upstreamResponse.text();

      if (upstreamResponse.ok || upstreamResponse.status !== 404) {
        const proxyHeaders = new Headers();
        const upstreamContentType = upstreamResponse.headers.get("content-type");

        if (upstreamContentType) {
          proxyHeaders.set("content-type", upstreamContentType);
        }

        proxyHeaders.set("cache-control", "no-store");
        proxyHeaders.set("x-shield-force-upstream-url", upstreamUrl);

        return new NextResponse(responseText, {
          status: upstreamResponse.status,
          headers: proxyHeaders,
        });
      }

      lastResponseText = responseText;
      lastStatus = upstreamResponse.status;
      lastContentType = upstreamResponse.headers.get("content-type") ?? lastContentType;
    }

    console.warn("[ShieldForceProxy404]", request.method, pathname, upstreamUrls);

    return new NextResponse(lastResponseText, {
      status: lastStatus,
      headers: {
        "cache-control": "no-store",
        "content-type": lastContentType,
        "x-shield-force-upstream-url": attemptedUpstreamUrl,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to connect to the Shield Force backend.";
    const attemptedUpstreamUrl = upstreamUrls[0] ?? "";

    console.error(
      "[ShieldForceProxy]",
      request.method,
      pathname,
      attemptedUpstreamUrl,
      message
    );

    return NextResponse.json(
      {
        message: extractApiErrorMessage(message) ?? "Unable to connect to the Shield Force backend.",
        upstream_url: attemptedUpstreamUrl,
        upstream_candidates: upstreamUrls,
      },
      {
        status: 502,
        headers: {
          "cache-control": "no-store",
        },
      }
    );
  }
}
