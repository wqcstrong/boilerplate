import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export default class FormatInterceptor implements NestInterceptor {
  intercept(ec: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        message: '请求成功',
      })),
    );
  }
}
