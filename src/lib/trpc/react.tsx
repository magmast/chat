"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { ReactNode, useState } from "react";
import { SuperJSON } from "superjson";

import { createQueryClient } from "./query-client";
import { AppRouter } from "./routers/app";

export function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }

  return `http://localhost:${process.env.PORT ?? "3000"}`;
}

let queryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return createQueryClient();
  }

  return (queryClient ??= createQueryClient());
}

export const api = createTRPCReact<AppRouter>();

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </api.Provider>
    </QueryClientProvider>
  );
}
