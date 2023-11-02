import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

/**
 * 中间件的定义方式有两种：
 * - 可注入的类
 * - 方法
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { url, method, query, body, headers } = req;

    this.logger.info(`${method} ${url}`, {
      authorization: headers['authorization'],
      query,
      body,
    });
    next();
  }
}
