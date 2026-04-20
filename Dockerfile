FROM node:lts-alpine AS build

WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
COPY . ./
RUN pnpm run build

FROM node:lts-alpine

WORKDIR /app
COPY --from=build /app/.output ./.output
COPY --from=build /app/package*.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]