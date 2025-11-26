# Wallet — Frontend only (single compose)

Este repositório contém o frontend estático em `frontend/`. Há código de backend nas pastas (se presente), mas o `docker-compose.yml` foi simplificado para subir apenas o frontend — tudo que você precisa para testar a interface roda com um único compose.

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

 - Frontend (UI): http://localhost:8080 (veja `frontend/` para instruções)

> Observação: este `docker-compose.yml` foi simplificado para executar somente o frontend.

5) Parar e remover containers:

```powershell
docker compose down
```

---

Se quiser, posso conectar o frontend ao backend automaticamente (proxy nginx) ou preparar instruções para executar tudo em um único compose com frontend + backend + db. Quer que eu faça isso agora?
