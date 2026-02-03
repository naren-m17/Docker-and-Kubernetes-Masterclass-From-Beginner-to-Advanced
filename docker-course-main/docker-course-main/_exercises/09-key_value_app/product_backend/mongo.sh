#!/bin/bash

# --------------------
# ENV SELECTION
# --------------------
ENVIRONMENT=${2:-prod}   # default = prod
CONF_FILE="mongo.${ENVIRONMENT}.conf"

if [ ! -f "$CONF_FILE" ]; then
  echo "❌ Config file not found: $CONF_FILE"
  exit 1
fi

echo "⚙️ Using environment: $ENVIRONMENT"
source "$CONF_FILE"

# --------------------
# HELPERS
# --------------------
network_exists() {
  docker network inspect "$NETWORK_NAME" >/dev/null 2>&1
}

volume_exists() {
  docker volume inspect "$VOLUME_NAME" >/dev/null 2>&1
}

container_exists() {
  docker ps -a --format '{{.Names}}' | grep -w "$CONTAINER_NAME" >/dev/null
}

# --------------------
# CREATE RESOURCES
# --------------------
create_network() {
  if ! network_exists; then
    echo "🌐 Creating network: $NETWORK_NAME"
    docker network create "$NETWORK_NAME"
  fi
}

create_volume() {
  if ! volume_exists; then
    echo "📦 Creating volume: $VOLUME_NAME"
    docker volume create "$VOLUME_NAME"
  fi
}

# --------------------
# CONTAINER OPS
# --------------------
run_container() {
  if container_exists; then
    echo "⚠️ Container already exists: $CONTAINER_NAME"
    exit 1
  fi

  create_network
  create_volume

  echo "🚀 Running MongoDB ($ENVIRONMENT)..."

  docker run -d \
    --name "$CONTAINER_NAME" \
    --network "$NETWORK_NAME" \
    -p "$PORT:27017" \
    -v "$VOLUME_NAME:/data/db" \
    -v "$(pwd)/init-user.js:/docker-entrypoint-initdb.d/init-user.js:ro" \
    -e MONGO_INITDB_ROOT_USERNAME="$USERNAME" \
    -e MONGO_INITDB_ROOT_PASSWORD="$PASSWORD" \
    "$IMAGE"
}

start_container() {
  docker start "$CONTAINER_NAME"
}

stop_container() {
  docker stop "$CONTAINER_NAME"
}

status() {
  docker ps -a | grep "$CONTAINER_NAME" || echo "❌ Container not found"
}

delete_all() {
  docker rm -f "$CONTAINER_NAME" 2>/dev/null
  docker volume rm "$VOLUME_NAME" 2>/dev/null
  docker network rm "$NETWORK_NAME" 2>/dev/null
}

# --------------------
# COMMAND SWITCH
# --------------------
case "$1" in
  run)     run_container ;;
  start)   start_container ;;
  stop)    stop_container ;;
  status)  status ;;
  delete)  delete_all ;;
  *)
    echo "Usage:"
    echo "  $0 run|start|stop|status|delete [dev|prod]"
    ;;
esac
