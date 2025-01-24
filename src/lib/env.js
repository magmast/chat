import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { z } from "zod";

config({
  path: ".env.local",
});

const skipValidation = process.env.SKIP_VALIDATION === "true";

const baseEnv = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("production"),

    PORT: z.string().default("3000"),

    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
    POSTGRES_HOST: z.string().default("localhost"),
    POSTGRES_PORT: z.string().default("5432"),
  },
  skipValidation,
});

// When building, even if the app is not connecting to the database, a valid URL is still required or the build will fail.
const POSTGRES_URL = skipValidation
  ? `postgresql://dummy:dummy@dummy:5432/dummy`
  : `postgresql://${baseEnv.POSTGRES_USER}:${baseEnv.POSTGRES_PASSWORD}@${baseEnv.POSTGRES_HOST}:${baseEnv.POSTGRES_PORT}/${baseEnv.POSTGRES_DB}`;

export const env = {
  ...baseEnv,
  POSTGRES_URL,
};
