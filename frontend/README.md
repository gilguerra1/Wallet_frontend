# Wallet — Frontend

Pequena interface estática (HTML + CSS + JS) para testar e interagir com a API do backend (FastAPI). O frontend foi criado para uso local em desenvolvimento.

## Arquivos
- `index.html` — SPA com UI para criar carteira, ver saldos, depositar, sacar, transferir e converter.
- `styles.css` — estilos simples e responsivos.
- `app.js` — lógica JavaScript para chamar os endpoints do backend (fetch).

## Pré-requisitos
- Certifique-se de que o backend (FastAPI) está rodando em `http://localhost:8000`. Por padrão o backend usa a rota base `/api/v1`.

## Como rodar localmente (recomendado)
1. Abra um terminal e navegue até a pasta `backend/frontend`:

   ```powershell
   cd backend/frontend
   ```

2. Inicie um servidor estático (ex. Python, Node ou extensão Live Server). Exemplos:

   - Python 3 (a partir de `backend/frontend`):

     ```powershell
     python -m http.server 5500
     ```

     Em seguida abra no navegador: `http://localhost:5500`

   - Usando `npx serve`:

     ```powershell
     npx serve . -l 5500
     ```

   - Ou use o Live Server do VSCode e abra `index.html`.

3. Abra a página no navegador e interaja com a API.

## Observações sobre CORS
O backend pode bloquear requisições de origens diferentes se não tiver CORS habilitado.

- Se você receber erros de CORS, ative CORS no backend adicionando algo assim em `main.py` (apenas para desenvolvimento):

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Map de moedas (IDs)
As moedas são criadas nas migrations com os seguinte ids:

- 1 — BTC
- 2 — ETH
- 3 — SOL
- 4 — USD
- 5 — BRL

Use esses IDs ao criar depósitos/saques, transferências e conversões.

---

Se quiser, posso adicionar um pequeno servidor estático integrado ao backend (uma rota que sirva os arquivos estáticos) ou configurar CORS automaticamente. Quer que eu faça isso?

## Executando com Docker / Docker Compose ✅

Você pode construir uma imagem Docker que serve esta SPA usando nginx e iniciar com Docker ou Docker Compose.

1) Usando Docker (build + run):

```powershell
# navegue até a pasta do frontend (ex.: frontend)
cd frontend

# buildar a imagem
docker build -t wallet-frontend:latest .

# rodar a imagem (mapear porta 8080 -> 80 do container)
docker run --rm -p 8080:80 wallet-frontend:latest
```

Depois abra no navegador: http://localhost:8080



2) Usando Docker Compose (recomendado para desenvolvimento local):

Na raiz do repositório há um `docker-compose.yml` preparado para subir o frontend. Use os comandos abaixo para testar rapidamente.

Subir apenas o frontend:

```powershell
docker compose up --build -d
```

Ou subir explicitamente o serviço frontend (caso queira):

```powershell
docker compose up --build -d frontend
```

Ver logs:

```powershell
docker compose logs -f
```

Parar e remover:

```powershell
docker compose down
```

Observações:
- O container serve os arquivos estáticos em `/` por meio do nginx (porta 80 interna do container).
- Se o backend estiver em `http://localhost:8000`, verifique CORS se as requisições falharem — o backend deve aceitar requests do host/porta onde o frontend estará sendo servido (`http://localhost:8080`).

