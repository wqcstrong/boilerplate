# 操作手册

##  环境变量

环境变量主要分成两种：

- `./src/config/*.yml`: 这里定义的环境变量被两个地方依赖着。第一个是程序代码中 `ConfigModule` 依赖它；第二个是 `./ormconfig.ts` 依赖它。同时区分环境：开发环境命名为 `dev.yml`，生产环境命名为 `prod.yml`;
- `./secrets/*.txt`: 定义了 docker-compose 所有用到的 `secrets`；

这里会有部分冗余，比如对 mysql 登录信息的定义；目前影响不大。

## 初始化流程

### 程序依赖的环境变量（执行周期：单次）

```yaml
# ./src/config/dev.yml (生产环境是 prod.yml)
db:
  type: 'mysql'
  charset: 'utf8mb4'
  host: <xxx>
  port: 3306
  username: <xxx>
  password: <xxx>
  database: <xxx>
  retryAttempts: 3
  logging: true
  timezone: '+08:00'
  autoLoadEntities: true
jwt:
  secret: <xxx>
  expires: '7d'
cors:
  origin:
    - 'http://localhost:5173'
    - 'http://127.0.0.1:5173'
  credentials: true
```

### `docker-compose` 依赖的 secrets（执行周期：单次）

创建以下两个文件并填充内容：

- `./secrets/mysql-user.txt`
- `./secrets/mysql-password.txt`

### 初始化主机和 `mysql` 绑定的卷目录（执行周期：单次）

```bash
$ bash ./init.sh
```

### 启动 Docker

```bash
$ docker compose up -d

# 如果是本地开发的话，需要在上面的命令执行完成后，继续执行：
docker stop nest_api # 因为本地开发时没有生产环境的配置
yarn start:debug # 同时本地开发命令可以更好的调试
```

### 执行数据库迁移

首次上生产肯定是要进行迁移的，由于是首次，所以可以直接使用同步：

```bash
$ NODE_ENV=production npx typeorm-ts-node-esm schema:sync -d ./ormconfig.ts
```


后续迭代中如果有数据库迁移，在真正执行迁移之前一定要将数据库备份，避免悔之莫及：

```bash
# 备份数据库，注意替换变量
$ docker exec <some-mysql> sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > /some/path/on/your/host/all-databases.sql

# 如果出现意外，可以从备份中恢复数据库，注意替换变量
$ docker exec -i <some-mysql> sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /some/path/on/your/host/all-databases.sql
```

最后执行迁移

```bash
# 根据当前源代码中对 Entity 的定义，生成自动迁移的逻辑代码
$ NODE_ENV=production npx typeorm-ts-node-esm migration:generate ./migrations/xxx -d ./ormconfig.ts

# 执行迁移
$ NODE_ENV=production npx typeorm-ts-node-esm migration:run -d ./ormconfig.ts
```

