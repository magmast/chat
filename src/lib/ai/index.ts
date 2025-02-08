import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createOllama } from "ollama-ai-provider";
import { cache } from "react";
import invariant from "tiny-invariant";

import { auth } from "@/app/(auth)/auth";
import { getSettingsByUserId } from "@/lib/db/queries";

import { env } from "../env";
import { models } from "./models";

const ollama = createOllama({
  baseURL: env.OLLAMA_BASE_URL,
});

export const customModel = cache(async (id: string) => {
  const model = models.find((model) => model.id === id);
  invariant(model, `Model ${id} not found`);

  switch (model.provider) {
    case "openrouter":
      return openRouter(model.id);

    case "local":
      return ollama(model.id);
  }
});

async function openRouter(id: string) {
  const provider = await getOpenRouter();
  return provider ? provider(id) : undefined;
}

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

export const imageGenerationModel = openai.image("dall-e-3");
