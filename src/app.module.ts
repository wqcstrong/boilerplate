import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import ConstrainModule from './config/constrain.module';
import { LoggerMiddleware } from './helper/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DocModule } from './doc/doc.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    ConstrainModule,
    AuthModule,
    UserModule,
    DocModule,
    PhotoModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
