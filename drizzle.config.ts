import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

import { env } from "./src/lib/env";

config({
  path: ".env.local",
});

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
});
