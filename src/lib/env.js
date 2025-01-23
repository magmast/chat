import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { z } from "zod";

config({
  path: ".env.local",
});

export const env = createEnv({
  server: {
    OPENROUTER_API_KEY: z.string(),
    POSTGRES_URL: z.string(),
  },
});
