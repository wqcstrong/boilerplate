import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import {
  getCustomExceptionMessage,
  getResponseExceptionMessage,
} from './exception-message';

/**
 * - 异常过滤器使用 @Catch 装饰器生命、并且要 implements ExceptionFilter
 * - @Catch 装饰器传入的参数代表遇到 HttpException 时就执行 catch 方法里的逻辑
 * - 异常过滤器可以作用于某个控制器的方法、控制器级别、全局级别：
 *   - 控制器、控制器的某个方法: @UseFilters(CustomException)
 *   - 全局级别: app.useGlobalFilters(CustomException)
 */
@Catch()
export class CustomException implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  catch(exception: HttpException, ah: ArgumentsHost) {
    const ctx = ah.switchToHttp();

    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      getCustomExceptionMessage(exception) ||
      getResponseExceptionMessage(exception) ||
      exception?.message ||
      (status >= 500 ? 'Server error' : 'Client error');

    const { headers, ip, url, method, query, body } = req;

    this.logger.error(message, {
      status,
      exception,
      request: {
        host: headers['host'],
        ip,
        url,
        method,
        query,
        body,
      },
    });

    // 这里可以自定义返回的结构
    res.status(status).json({
      success: false,
      message,
      data: null,
    });
  }
}
