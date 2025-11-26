# Wallet — Full repo (Frontend + Backend)

Este repositório contém o frontend estático em `frontend/` e um backend mínimo de exemplo em `backend/`.

## Backend — execução com Docker Compose

O arquivo `docker-compose.yml` na raiz do projeto inicia dois serviços:

- `db`: Postgres 15 (container `wallet_postgres`) com volume persistente `postgres_data`.
- `app`: aplicação Python (FastAPI) construída a partir de `backend/Dockerfile` e exposta na porta 8000.

Conteúdo (implementado exatamente como solicitado):

- `docker-compose.yml` (na raiz) — define `db` e `app` com variáveis de ambiente, volumes e network.
- `backend/Dockerfile` — imagem Python 3.11-slim que instala `requirements.txt` e executa `uvicorn main:app`.
- `backend/requirements.txt` — dependências: fastapi, uvicorn[standard], sqlalchemy, psycopg2-binary, python-dotenv.
- `backend/main.py` — app FastAPI mínimo com endpoints de health e `/env`.

### Como rodar

1) Certifique-se de ter Docker e Docker Compose instalados.

2) Na raiz do projeto, execute:

```powershell
docker compose up --build -d
```

3) Verifique os serviços:

```powershell
docker compose ps
docker compose logs -f
```

4) Teste endpoints:

 - Frontend (se estiver rodando): http://localhost:8080 (veja `frontend/` para instruções)
 - Backend health: http://localhost:8000/
 - Backend env: http://localhost:8000/env

### Rodar tudo (db, backend e frontend) — 1 compose

O `docker-compose.yml` na raiz agora traz os três serviços: `db` (Postgres), `app` (backend) e `frontend` (nginx). Use este arquivo para iniciar todo o stack com um comando único.

Comandos:

```powershell
# build e iniciar todos os serviços (db, app, frontend)
docker compose up --build -d

# ver logs do stack
docker compose logs -f

# parar e remover
docker compose down
```

Se você quiser subir apenas o frontend (por exemplo para testes rápidos), é possível subir só esse serviço com o mesmo arquivo:

```powershell
docker compose up --build -d frontend
```

Abra: http://localhost:8080

5) Parar e remover containers:

```powershell
docker compose down
```

---

Se quiser, posso conectar o frontend ao backend automaticamente (proxy nginx) ou preparar instruções para executar tudo em um único compose com frontend + backend + db. Quer que eu faça isso agora?
