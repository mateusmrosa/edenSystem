# Deploy Frontend (Eden System)

Guia curto para build estático + deploy na Hostinger.

## 1) Pré-requisitos

- Node 22+ (recomendado usar Docker)
- Projeto na raiz: `edenSystem`

## 2) Gerar build estático

Na raiz do projeto:

```bash
docker run --rm -v "/mnt/novo_volume/Documents/dev/tecnologia/reactjs/edenSystem:/app" -w /app node:22-alpine sh -lc "npm ci && npm run build"
```

Saída do build: `dist/`

## 3) Gerar pacote para Hostinger

```bash
./scripts/package-spa-for-hostinger.sh
```

Arquivo gerado: `eden-spa-hostinger.zip`

## 4) Deploy manual na Hostinger

1. Abrir File Manager
2. Entrar em `public_html`
3. Enviar `eden-spa-hostinger.zip`
4. Extrair no diretório atual (`public_html`)
5. (Opcional) apagar o ZIP depois

## 5) Validação rápida

- Abrir site em aba anônima
- Hard refresh (`Ctrl+Shift+R`)
- DevTools > Network:
  - `index-*.js` = 200
  - `index-*.css` = 200

## 6) GitHub Actions (CI)

Workflow: `.github/workflows/ci.yml`

Executa em `push`/`pull_request` nas branches `main` e `dev`:

- `npm ci`
- `npm run lint`
- `npm run build`
- upload do artefato `frontend-dist`

Para disparar: commit + push para `main` ou `dev`.

## 7) Fluxo recomendado de release

1. Fazer alterações no front
2. `git add/commit/push` (CI valida)
3. Gerar ZIP (`package-spa-for-hostinger.sh`)
4. Upload/extrair em `public_html`
