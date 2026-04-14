#!/usr/bin/env sh
set -e
ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if [ ! -d frontend/dist ]; then
  echo "Erro: frontend/dist não existe. Rode: cd frontend && npm ci && npm run build"
  exit 1
fi

cp -r frontend/dist/* backend/public/

echo "OK: build do React copiado para backend/public/ (incluindo assets e stack-logos)."
