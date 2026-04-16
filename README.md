# Eden System Frontend

Frontend em React + Vite (deploy estático), consumindo API externa via `VITE_API_URL`.

## Requisitos

- Node.js 22+
- npm 10+

## Instalação

```bash
npm ci
```

## Desenvolvimento local

```bash
npm run dev
```

Por padrão abre em `http://localhost:5173`.

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

```bash
cp .env.example .env
```

- `VITE_API_URL`: base da API (ex.: `https://api.seudominio.com.br`)
- `VITE_GA_MEASUREMENT_ID`: GA4
- `VITE_RECAPTCHA_SITE_KEY`: chave pública do reCAPTCHA

## Build de produção

```bash
npm run build
```

Saída em `dist/`.

## Deploy manual (Hostinger)

### Opção rápida (recomendada)

```bash
npm run build
./scripts/package-spa-for-hostinger.sh
```

Isso gera `eden-spa-hostinger.zip` na raiz.  
No File Manager da Hostinger:

1. Acesse `public_html` do domínio
2. Envie `eden-spa-hostinger.zip`
3. Extraia no diretório atual
4. Limpe cache do navegador/CDN

### Opção sem ZIP

Enviar diretamente o conteúdo de `dist/` para `public_html`.

## CI (GitHub Actions)

Workflow em `.github/workflows/ci.yml`:

- `npm ci`
- `npm run lint`
- `npm run build`
- upload do artefato `dist`

Executa em `push` e `pull_request` para `main` e `dev`.
