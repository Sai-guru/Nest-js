
# dev stage - for reload , 

FROM node:20-alpine AS dev

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
#----------------------------------------------------------

# build stage - for build and run,

FROM node:20-alpine AS build

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build
#------------------------------------------------------------

# production stage - for production(giving to docker hub)

FROM node:20-alpine AS production

WORKDIR /app

RUN npm install -g pnpm

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]

# The end-----------------------------------