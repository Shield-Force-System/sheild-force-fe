import { NextRequest } from "next/server";
import { shieldForceApiRoutes } from "@/lib/shield-force-api";
import { proxyShieldForceRequest } from "@/lib/shield-force-proxy";

export async function GET(request: NextRequest) {
  return proxyShieldForceRequest(request, shieldForceApiRoutes.helicopters);
}
