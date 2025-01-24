import invariant from "tiny-invariant";

import { getSettingsByUserId, updateSettingsByUserId } from "@/lib/db/queries";
import { updateSettingsByCurrentUserSchema } from "@/lib/schemas";

import { protectedProcedure, router } from "../init";

export const settingsRouter = router({
  byCurrentUser: protectedProcedure.query(({ ctx }) => {
    invariant(ctx.session.user.id, "User must have an id");
    return getSettingsByUserId({ userId: ctx.session.user.id });
  }),

  updateByCurrentUser: protectedProcedure
    .input(updateSettingsByCurrentUserSchema)
    .mutation(async ({ input, ctx }) => {
      invariant(ctx.session.user.id, "User must have an id");
      return updateSettingsByUserId({
        ...input,
        userId: ctx.session.user.id,
      });
    }),
});
