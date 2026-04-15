#!/usr/bin/env sh
# Gera eden-spa-hostinger.zip com o build estático para upload manual na Hostinger.
# Uso:
#   npm run build
#   ./scripts/package-spa-for-hostinger.sh

set -e
ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -d dist ]; then
  echo "Erro: dist não existe."
  echo "Rode antes: npm run build"
  exit 1
fi

OUT="$ROOT/eden-spa-hostinger.zip"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cp -r "$ROOT/dist/"* "$TMP/"

cat >"$TMP/LEIA-ME-DEPLOY.txt" <<'EOF'
Deploy manual (Hostinger — public_html)
=======================================

1. Faça backup de public_html (recomendado).

2. Envie eden-spa-hostinger.zip no File Manager.

3. Extraia o conteúdo na pasta public_html do domínio.

4. Se usar CDN/proxy (Cloudflare), limpe cache após upload.

5. Confirmação rápida:
   - Abra o site em aba anônima
   - Verifique no DevTools > Network se index-*.js e index-*.css carregam com 200.
EOF

rm -f "$OUT"
(cd "$TMP" && zip -r -q "$OUT" .)

echo "OK: $OUT"
echo "Upload: Hostinger File Manager > public_html > enviar ZIP > Extrair."
