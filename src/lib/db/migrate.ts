import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "../env";

async function runMigrate() {
  const connection = postgres(env.POSTGRES_URL, { max: 1 });
  const db = drizzle(connection);

  console.log("⏳ Running migrations...");

  const start = Date.now();
  await migrate(db, { migrationsFolder: "./src/lib/db/migrations" });
  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");
  process.exit(0);
}

let isRetry = false;

function handleError(err: unknown) {
  if (!isRetry) {
    isRetry = true;
    // When running `docker compose run migrate` there may be a need to wait for the db to be ready
    setTimeout(() => runMigrate().catch(handleError), 10_000);
    return;
  }

  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
}

runMigrate().catch(handleError);
