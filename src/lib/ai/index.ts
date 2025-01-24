import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { cache } from "react";

import { auth } from "@/app/(auth)/auth";
import { getSettingsByUserId } from "@/lib/db/queries";

const getOpenRouter = cache(async () => {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const settings = await getSettingsByUserId({ userId: session.user.id });
  if (!settings.openRouterApiKey) {
    return undefined;
  }

  return createOpenRouter({
    apiKey: settings.openRouterApiKey,
  });
});

export const customModel = cache(async (id: string) => {
  const openRouter = await getOpenRouter();
  if (!openRouter) {
    return undefined;
  }
  return openRouter(id);
});

export const imageGenerationModel = openai.image("dall-e-3");
