# Docker — Eden System (Laravel API + React estático)

Arquitetura **Opção 2**: `backend/` é a API Laravel; `frontend/` é um SPA React (Vite) gerado como arquivos estáticos copiados para `backend/public/` em produção.

## Serviços

| Serviço | Descrição |
|--------|-----------|
| **mysql** | MySQL 8 |
| **php** | PHP 8.3-FPM + extensões (Laravel) |
| **nginx** | `backend/public` — `/` e assets do React, `/api` e `/up` → Laravel |
| **node** (profile `dev`) | Vite em `frontend/` na porta **5173** |
| **composer** (profile `tools`) | Composer em `backend/` |
| **npm** (profile `tools`) | NPM em `frontend/` |

## Primeiro uso

1. Backend (se ainda não existir `backend/vendor/`):

   ```bash
   docker compose --profile tools run --rm composer install
   cp backend/.env.example backend/.env
   docker compose run --rm --no-deps php php artisan key:generate
   docker compose up -d mysql
   docker compose run --rm php php artisan migrate
   ```

2. Frontend:

   ```bash
   docker compose --profile tools run --rm npm install
   ```

3. Subir ambiente completo (API + site via Nginx + Vite):

   ```bash
   docker compose up -d mysql php nginx
   docker compose --profile dev up -d node
   ```

4. Variáveis úteis no `backend/.env`:

   - `APP_URL=http://localhost:8080`
   - Banco alinhado ao `docker-compose.yml` (`DB_HOST=mysql` dentro do Docker; `127.0.0.1` no host)
   - `CORS_ALLOWED_ORIGINS` incluindo `http://localhost:5173` para o Vite em dev

## URLs

| O quê | URL |
|------|-----|
| Site + API (Nginx) | http://localhost:8080 |
| React com HMR (só dev) | http://localhost:5173 |
| Health Laravel | http://localhost:8080/up |
| API | http://localhost:8080/api/health |

O Vite proxifica `/api` para o Nginx (`VITE_PROXY_API=http://nginx:80` no compose), então o formulário de contato funciona em dev sem CORS extra na mesma origem relativa.

## Build para produção (sem Node no servidor)

Na pasta do projeto:

```bash
docker compose --profile tools run --rm npm run build
./scripts/sync-frontend-to-public.sh
```

Isso copia `frontend/dist/` para `backend/public/` (mantendo `index.php` e demais arquivos da API). No servidor compartilhado (Apache): document root apontando para `public/`, com o `.htaccess` já preparado para SPA + `/api`.

No serviço **php**, o Compose define `LOG_CHANNEL=stderr` e `CACHE_STORE=array`: o app não depende de escrever em `storage/logs` nem em `storage/framework/cache` no volume montado (evita o conflito de dono `1000` no host vs `www-data` no container).

## Permissões em `storage` e `bootstrap/cache`

O volume do projeto no host costuma vir com dono `root` ou seu UID local; o PHP-FPM roda como **`www-data`**. Na **imagem PHP** deste repositório, o entrypoint já cria as pastas e roda `chown`/`chmod` ao subir o container (rebuild após atualizar o Dockerfile).

Se ainda aparecer *Permission denied* em `storage/logs` ou `storage/framework/cache`, rode **uma vez como root** dentro do container `php`:

```bash
docker compose exec -u root php sh -lc '
  cd /var/www/html/backend &&
  mkdir -p storage/logs storage/framework/cache/data storage/framework/sessions storage/framework/views storage/framework/testing bootstrap/cache &&
  chown -R www-data:www-data storage bootstrap/cache &&
  chmod -R ug+rwX storage bootstrap/cache
'
```

(Equivalente: `docker exec -u root eden-php` + os mesmos comandos, se usar o nome fixo do container.)

## Comandos úteis

```bash
docker compose exec php php artisan migrate
docker compose --profile tools run --rm composer update
docker compose --profile tools run --rm npm run build
```

## Estrutura

```
backend/     # Laravel (API)
frontend/    # React + Vite + Tailwind + Framer Motion
docker/      # Dockerfile PHP, Nginx, php.ini
scripts/     # sync-frontend-to-public.sh
```
