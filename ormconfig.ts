/**
 * ====================================================================
 *
 * ===================== 此文件只做 Typeorm 迁移使用 ====================
 *
 * =====================      禁止使用 sync        =====================
 *
 * ====================================================================
 */

import { readFileSync } from 'node:fs';

import { resolve } from 'node:path';
import { DataSource } from 'typeorm';
import * as yaml from 'js-yaml';

const isDev = process.env.NODE_ENV === 'development';

const loadConfig = () => {
  const configFile = resolve(
    __dirname,
    isDev ? './src/config/dev.yml' : './src/config/prod.yml',
  );
  try {
    const config = yaml.load(
      readFileSync(configFile, 'utf-8'),
    ) as any;
    return config.db;
  } catch (e) {
    throw e;
  }
};

/**
 * - 如果是手动编写迁移逻辑
 *   npx typeorm migration:create ./migrations/xxx
 *
 * - 如果想结合「代码内定义的实体」和「数据库当前现状」两者 Diff 的结果，自动生成迁移逻辑
 *   WARNING：对于自动生成的逻辑 review 之后再执行，否则有可能丢数据
 *   - 开发环境: NODE_ENV=development npx typeorm-ts-node-esm migration:generate ./migrations/xxx -d ./ormconfig.ts
 *   - 生产环境: NODE_ENV=production npx typeorm-ts-node-esm migration:generate ./migrations/xxx -d ./ormconfig.ts
 *
 * - 运行迁移 (run)
 *   - 开发环境: NODE_ENV=development npx typeorm-ts-node-esm migration:run -d ./ormconfig.ts
 *   - 生产环境: NODE_ENV=production npx typeorm-ts-node-esm migration:run -d ./ormconfig.ts
 *
 * - 撤销最近一次的迁移，如果要撤销多次就执行多次 (revert)
 *   - 开发环境: NODE_ENV=development npx typeorm-ts-node-esm migration:revert -d ./ormconfig.ts
 *   - 生产环境: NODE_ENV=production npx typeorm-ts-node-esm migration:revert -d ./ormconfig.ts
 *
 * - 查看迁移结果 (show)
 *   - 开发环境: NODE_ENV=development npx typeorm-ts-node-esm migration:show -d ./ormconfig.ts
 *   - 生产环境: NODE_ENV=production npx typeorm-ts-node-esm migration:show -d ./ormconfig.ts
 */

export default new DataSource({
  ...loadConfig(),
  entities: ['./src/**/*.entity.ts'],
  migrations: ['./migrations/**/*.ts'],
});

/**
 * 1. 测试 import from src 路径 问题
 * 2. 测试 common-entity 问题
 */
