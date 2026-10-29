FROM node:20-bookworm-slim AS build
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
COPY . .
RUN npm run build

FROM node:20-bookworm-slim
RUN apt-get update && apt-get install -y openssl wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
RUN mkdir -p uploads && chown -R node:node /app
USER node
EXPOSE 3000
CMD ["sh", "-c", "npx prisma db push --skip-generate && node prisma/seed.mjs && npm start"]
