# chat

## Deployment

Build the docker image:

```sh
docker build -t chat .
docker build --target migrate -t chat-migrate .
```

Copy the `.env.example` file and update it's contents:

```sh
cp .env.example .env.local
vim .env.local
```

Migrate the database:

```sh
docker compose run migrate
```

Start services:

```sh
docker compose up -d
```
