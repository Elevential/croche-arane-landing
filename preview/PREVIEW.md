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

## Produção vs revisão

| URL | Visitante vê |
|-----|----------------|
| `https://arane.com.br/` | botão de pré-lançamento; **sem** Studio Arane |
| `https://arane.com.br/preview/` | botões Google/Apple; **com** Studio Arane |

O mesmo código detecta `/preview` automaticamente (`site-config.js`).

