import { z } from "zod";

export const updateSettingsByCurrentUserSchema = z.object({
  openRouterApiKey: z.string(),
});
