import { NextRequest } from "next/server";
import { shieldForceApiRoutes } from "@/lib/shield-force-api";
import { proxyShieldForceRequest } from "@/lib/shield-force-proxy";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return proxyShieldForceRequest(request, shieldForceApiRoutes.bodyguardById(id));
}
