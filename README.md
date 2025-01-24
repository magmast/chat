# chatbot

Fork of [Next.js AI Chatbot](https://github.com/vercel/ai-chatbot) with customizations tailored for my personal setup.
The current customizations list is:

- Switched from OpenAI API to OpenRouter for expanded model selection
- Assigned OpenRouter API key to users instead of an app, so each user can pay for themselves
- Updated db names to match common postgres style (eg. table Chat -> chats, field userId -> user_id)
- Replaced Biome with ESLint and Prettier for better import sorting and Tailwind class sorting
- Added docker images and compose files for deployment
- (WIP) Switched to tRPC for data access layer

## Prerequisites

- Docker and Docker Compose
- Bun runtime (for local development)
- PostgreSQL (handled by Docker)

## Quick Start

1. Clone the repository:

   ```sh
   git clone https://github.com/magmast/chatbot.git
   cd chatbot
   ```

1. Build the Docker image:

   ```sh
   docker build -t ghcr.io/magmast/chatbot .
   ```

1. Set up environment variables:

   ```sh
   cp .env.example .env.local
   # Edit .env.local with your configuration:
   # - AUTH_SECRET: Random string for authentication
   # - POSTGRES_PASSWORD: Your database password
   # Other variables can keep their default values
   ```

1. Start services:

   ```sh
   docker compose up -d
   ```

1. Initialize the database:

   ```sh
   docker exec -it chatbot-app-1 bun run migrate.js
   ```

## Development

1. Set up environment variables as described in Quick Start

1. Start the database:

   ```sh
   docker compose -f docker-compose.dev.yml up -d db
   ```

1. Install dependencies and start the development server:

   ```sh
   bun install
   bun dev
   ```

Alternatively, you can run the entire development setup in Docker:

```sh
docker compose -f docker-compose.dev.yml up -d
```
