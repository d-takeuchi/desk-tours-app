# マイグレーション

※ 前提条件：backend コンテナが起動している必要があります。

1. backend コンテナ内のターミナルを開く

```
docker-compose exec backend /bin/bash
```

2. マイグレーションファイルをもとに、マイグレーションの実行

```
node --require ts-node/register ./node_modules/typeorm/cli.js migration:run
```

3. seed の実行

```
node --require ts-node ./node_modules/typeorm-seeding/dist/cli.js seed
```
