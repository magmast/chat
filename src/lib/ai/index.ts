import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

import { env } from "../env";

const openRouter = createOpenRouter({
  apiKey: env.OPENROUTER_API_KEY,
});

export const customModel = (id: string) => {
  return openRouter(id);
};

export const imageGenerationModel = openai.image("dall-e-3");
