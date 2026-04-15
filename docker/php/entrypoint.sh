#!/bin/sh
set -e

BACKEND=/var/www/html

if [ "$(id -u)" = 0 ]; then
  mkdir -p \
    "$BACKEND/storage/logs" \
    "$BACKEND/storage/framework/cache/data" \
    "$BACKEND/storage/framework/sessions" \
    "$BACKEND/storage/framework/views" \
    "$BACKEND/storage/framework/testing" \
    "$BACKEND/bootstrap/cache"
  chown -R www-data:www-data "$BACKEND/storage" "$BACKEND/bootstrap/cache"
  chmod -R ug+rwX "$BACKEND/storage" "$BACKEND/bootstrap/cache"
fi

exec docker-php-entrypoint "$@"
