FROM node:lts-alpine AS build

WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@9.1.0 --activate
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:lts-alpine AS runner

WORKDIR /app
COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]