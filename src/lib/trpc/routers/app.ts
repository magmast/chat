import { createCallerFactory, router } from "../init";
import { settingsRouter } from "./settings";

export const appRouter = router({
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
