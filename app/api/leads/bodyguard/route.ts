import { NextRequest } from "next/server";
import { shieldForceApiRoutes } from "@/lib/shield-force-api";
import { proxyShieldForceRequest } from "@/lib/shield-force-proxy";

export async function POST(request: NextRequest) {
  return proxyShieldForceRequest(request, shieldForceApiRoutes.bodyguardLead);
}
