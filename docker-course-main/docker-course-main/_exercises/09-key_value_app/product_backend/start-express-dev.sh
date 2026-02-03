#!/bin/bash
set -e

APP_NAME="product-backend-dev"
IMAGE_NAME="product-backend-dev"
NETWORK_NAME="mongo-net-dev"

EXPRESS_DIR="./expressApp"

echo "🚀 Starting Express dev app..."

# -------------------------------
# Build Express dev image
# -------------------------------
echo "🏗️  Building Express dev image..."
docker build \
  -f "$EXPRESS_DIR/Dockerfile.dev" \
  -t "$IMAGE_NAME" \
  "$EXPRESS_DIR"

# -------------------------------
# Stop existing container if running
# -------------------------------
if docker ps -a --format '{{.Names}}' | grep -q "^${APP_NAME}$"; then
  echo "🛑 Removing existing Express container: $APP_NAME"
  docker rm -f "$APP_NAME"
fi

# -------------------------------
# Start Express dev container
# -------------------------------
echo "🔥 Running Express dev container with hot reload..."

docker run -it --rm \
  --name "$APP_NAME" \
  --network "$NETWORK_NAME" \
  -p 3000:3000 \
  -v "$(pwd)/expressApp/src:/app/src" \
  -e NODE_ENV=development \
  -e PORT=3000 \
  -e MONGO_USER=product_app \
  -e MONGO_PASSWORD=product_secret \
  -e MONGO_HOST=mongodb-dev \
  -e MONGO_PORT=27017 \
  -e MONGO_DB=product-key-value \
  "$IMAGE_NAME"
