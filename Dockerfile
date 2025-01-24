FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM deps AS build
COPY . .
ENV SKIP_VALIDATION=true
RUN bun run build

FROM deps AS build-migrate
COPY . .
RUN bun build --target=bun --outfile=migrate.js src/lib/db/migrate.ts

FROM base AS migrate
COPY --from=build-migrate /usr/src/app/migrate.js ./migrate.js
COPY --from=build-migrate /usr/src/app/src/lib/db/migrations ./src/lib/db/migrations
CMD ["bun", "migrate.js"]

FROM base AS prod

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system chatbot && adduser --system --ingroup chatbot chatbot

COPY --from=build /usr/src/app/public ./public
COPY --from=build --chown=chatbot:chatbot /usr/src/app/.next/standalone ./
COPY --from=build --chown=chatbot:chatbot /usr/src/app/.next/static ./.next/static

USER chatbot
EXPOSE 3000
CMD ["bun", "run", "server.js"]
