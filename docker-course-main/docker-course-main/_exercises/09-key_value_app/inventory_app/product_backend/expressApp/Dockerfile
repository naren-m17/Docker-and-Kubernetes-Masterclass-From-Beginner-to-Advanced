# ---------- Build stage ----------
FROM node:22-alpine AS build

WORKDIR /app

# Copy only dependency files first (better cache)
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev

# Copy application source
COPY src ./src

# ---------- Runtime stage ----------
FROM gcr.io/distroless/nodejs22

WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules and app from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src

# Expose app port
EXPOSE 3000

# Distroless requires absolute path
CMD ["src/index.js"]
