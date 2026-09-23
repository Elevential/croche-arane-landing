# Preview / revisão

Visitantes veem a produção em:

- https://arane.com.br/

A revisão fica em:

- https://arane.com.br/preview/

## Como usar

1. Crie/atualize a branch `develop` com as mudanças em andamento.
2. Faça push em `develop`.
3. O GitHub Action **Deploy Preview** publica automaticamente em `/preview/`.
4. Revise em `https://arane.com.br/preview/`.
5. Quando aprovado, faça merge de `develop` → `main` (produção).

## Comandos rápidos

```bash
git checkout -b develop
git push -u origin develop
```

Depois de cada alteração para revisar:

```bash
git checkout develop
git add .
git commit -m "sua mensagem"
git push
```

Para publicar de verdade:

```bash
git checkout main
git merge develop
git push
```

## Local (Live Server)

Use um destes:

- `http://127.0.0.1:5501/?mode=preview`
- `http://127.0.0.1:5501/preview/` (atalho que redireciona)

Só `http://127.0.0.1:5501/preview` sem a pasta local dava 404 — o `/preview` de produção é gerado pelo Action na `main`, não é a pasta do projeto na `develop`.

