# ---------- Build & Test Stage ----------
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Run tests here
RUN npm test


# ---------- Runtime Stage ----------
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app ./

CMD ["node", "server.js"]
