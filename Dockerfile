FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM deps AS build
COPY . .
ENV SKIP_VALIDATION=true
RUN bun run build

FROM deps AS migrate
COPY . .
CMD ["bun", "db:migrate"]

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
