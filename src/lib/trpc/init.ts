import { initTRPC, TRPCError } from "@trpc/server";
import { SuperJSON } from "superjson";

import { auth } from "@/app/(auth)/auth";

export async function createTRPCContext(opts: { headers: Headers }) {
  const session = await auth();

  return {
    ...opts,
    session,
  };
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
});

export const createCallerFactory = t.createCallerFactory;

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
