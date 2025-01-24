import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";

import { env } from "@/lib/env";
import { createTRPCContext } from "@/lib/trpc/init";
import { appRouter } from "@/lib/trpc/routers/app";

function createContext(req: NextRequest) {
  return createTRPCContext({ headers: req.headers });
}

function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ error, path }) =>
            console.error(
              `tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            )
        : undefined,
  });
}

export const GET = handler;

export const POST = handler;
