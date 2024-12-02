FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json pnpm-lock.yaml ./

RUN corepack enable && \
    pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:20-alpine

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules

EXPOSE 3000
CMD ["node", "dist/main"]