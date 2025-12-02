# 💰 Wallet - Sistema de Carteira Digital

Sistema completo de carteira digital com frontend, backend (API) e banco de dados PostgreSQL, totalmente containerizado com Docker.

## 📦 Arquitetura

O projeto utiliza **3 imagens Docker**:

- **`postgres:15-alpine`** - Banco de dados PostgreSQL
- **`gilguerra/wallet_api:latest`** - Backend (API FastAPI)
- **`jpco0/wallet-frontend:1.0.0`** - Frontend (Nginx)

## 🚀 Como executar

### Pré-requisitos

- Docker instalado
- Docker Compose instalado

### Passo 1: Configurar variáveis de ambiente

1. Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

2. Edite o arquivo `.env` e configure as variáveis conforme necessário:

```bash
# Database Configuration
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_NAME=wallet_api_homolog
DB_DRIVER=postgresql+psycopg2

# Postgres Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha_aqui
POSTGRES_DB=wallet_api_homolog

# Application Configuration
TAXA_SAQUE_PERCENTUAL=0.01
TAXA_CONVERSAO_PERCENTUAL=0.02
TAXA_TRANSFERENCIA_PERCENTUAL=0.01
COINBASE_API_BASE_URL=https://api.coinbase.com/v2/prices

# Security
SECRET_KEY=sua-secret-key-aqui
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
PRIVATE_KEY_SIZE=32
PUBLIC_KEY_SIZE=32
```

### Passo 2: Subir os containers

```bash
docker-compose up -d
```

### Passo 3: Verificar status

```bash
# Ver containers rodando
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f app
```

## 🌐 Acessando a aplicação

Após subir os containers:

- **Frontend**: http://localhost:8080
- **Backend (API)**: http://localhost:8000
- **Banco de dados**: localhost:5432

## 🛠️ Comandos úteis

```bash
# Parar os containers (mantém os dados)
docker-compose stop

# Parar e remover os containers (mantém os dados no volume)
docker-compose down

# Parar, remover containers E volumes (APAGA os dados)
docker-compose down -v

# Reiniciar os containers
docker-compose restart

# Ver logs de erro
docker-compose logs --tail=50 app
```

## 💾 Persistência de dados

Os dados do PostgreSQL são armazenados em um volume Docker chamado `postgres_data`, garantindo que:

✅ Os dados **não são perdidos** ao parar os containers  
✅ Os dados **persistem** entre reinicializações  
✅ Você pode fazer `docker-compose down` e `up` sem perder dados

**Para limpar os dados e recomeçar do zero:**

```bash
docker-compose down -v
docker-compose up -d
```

## 📁 Estrutura do projeto

```
Wallet_frontend/
├── docker-compose.yml    # Orquestração dos containers
├── .env                  # Variáveis de ambiente (NÃO versionar)
├── .env.example          # Exemplo de configuração
├── README.md             # Este arquivo
└── frontend/
    ├── Dockerfile
    ├── index.html
    ├── app.js
    └── styles.css
```

## 🔒 Segurança

⚠️ **IMPORTANTE**: 

- O arquivo `.env` contém informações sensíveis e **NÃO deve ser versionado** no Git
- Use senhas fortes em produção
- Altere o `SECRET_KEY` para um valor único e seguro

## 🐛 Troubleshooting

### Porta já em uso

Se a porta 5432 já estiver em uso:

```bash
# Verificar o que está usando a porta
netstat -ano | grep :5432

# Parar PostgreSQL local ou alterar a porta no docker-compose.yml
ports:
  - "5433:5432"  # Use outra porta no host
```

### Container não inicia

```bash
# Ver logs detalhados
docker-compose logs app

# Recriar containers
docker-compose down
docker-compose up -d --force-recreate
```

### Dados não persistem

Verifique se você está usando `-v` ao derrubar os containers. Use apenas `docker-compose down` sem flags para manter os dados.

## 👥 Contribuindo

Este projeto foi desenvolvido como trabalho acadêmico em conjunto com a disciplina de Banco de Dados.
