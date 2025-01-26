import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

import { POSTGRES_URL } from "./src/lib/env";

config({
  path: ".env.local",
});

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: POSTGRES_URL,
  },
});
