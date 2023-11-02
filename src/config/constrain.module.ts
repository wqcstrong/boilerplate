import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  APP_PIPE,
} from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as yaml from 'js-yaml';
import { CustomException } from 'src/helper/exception.filter';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule, utilities } from 'nest-winston';
import { config, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import CommonGuard from 'src/helper/common.guard';
import FormatInterceptor from 'src/helper/format.interceptor';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { OssModule } from 'src/oss/oss.module';

const isDev = process.env.NODE_ENV === 'development';

const loadConfig = () => {
  const file = resolve(__dirname, isDev ? './dev.yml' : './prod.yml');
  try {
    const config = readFileSync(file, 'utf-8');
    return yaml.load(config);
  } catch (e) {
    throw e;
  }
};

@Module({
  imports: [
    // 限速
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
    // 任务调度
    ScheduleModule.forRoot(),
    // 日志
    WinstonModule.forRoot({
      levels: config.npm.levels,
      format: format.combine(
        format.splat(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.ms(),
      ),
      transports: [
        isDev
          ? new transports.Console({
              level: 'info',
              format: utilities.format.nestLike('App', {
                colors: true,
                prettyPrint: true,
              }),
            })
          : new transports.DailyRotateFile({
              level: 'error',
              format: format.json(),
              dirname: './logs',
              filename: 'errors-%DATE%.log',
              datePattern: 'YYYY-MM-DD-HH',
              zippedArchive: true,
              maxSize: '20m',
              maxFiles: '7d',
            }),
      ],
    }),
    // 配置
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfig],
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('db') as TypeOrmModuleOptions;
      },
    }),
    OssModule,
  ],
  providers: [
    // 因为构造函数可能依赖 DI，所以通过这种方式注册
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CommonGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: FormatInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      // 通过 Exclude 装饰器过滤掉响应中的指定字段
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        stopAtFirstError: true,
        whitelist: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: CustomException,
    },
  ],
})
export default class ConstrainModule {}
