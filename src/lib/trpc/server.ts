import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createTRPCContext } from "./init";
import { createQueryClient } from "./query-client";
import { AppRouter, createCaller } from "./routers/app";

const getQueryClient = cache(createQueryClient);

const createContext = cache(async () => {
  const heads = new Headers(await headers());
  return createTRPCContext({ headers: heads });
});

const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
