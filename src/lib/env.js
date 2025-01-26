import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import * as v from "validator";
import { z } from "zod";

config({
  path: ".env.local",
});

const skipValidation = process.env.SKIP_VALIDATION === "true";

export const env = createEnv({
  skipValidation,

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

  client: {
    NEXT_PUBLIC_SIGNUP_ALLOWED: z
      .string()
      .default("true")
      .refine(v.isBoolean)
      .transform(v.toBoolean),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    NEXT_PUBLIC_SIGNUP_ALLOWED: process.env.NEXT_PUBLIC_SIGNUP_ALLOWED,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
  },
});

// When building, even if the app is not connecting to the database, a valid URL is still required or the build will fail.
export const POSTGRES_URL =
  skipValidation || typeof window !== "undefined"
    ? `postgresql://dummy:dummy@dummy:5432/dummy`
    : `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`;
