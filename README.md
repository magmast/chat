# chat

## Deployment

Build the docker image:

```sh
docker build -t ghcr.io/magmast/chatbot .
```

Copy the `.env.example` file and update it's contents:

```sh
cp .env.example .env.local
vim .env.local
```

Start services:

```sh
docker compose up -d
```

Migrate database:

```sh
docker exec -it chatbot-app-1 bun run migrate.js
```

Start chatting!
