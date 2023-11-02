## 特征

### Controller

```ts
// 1. 使用 @Controller 装饰器
@Controller()
export default class CatController {}

// 2. 需要注册到 @Module 选项上
@Module({
  controllers: [CatController],
})
export default class CatModule {}
```

### Service

```ts
// 1. 使用 @Injectable 装饰器
@Injectable()
export default class CatService {}

// 2. 需要注册到 @Module
@Module({
  provides: [CatService],
  // 3. 如果需要给其他模块用还要注册到 exports 上
  exports: [CatService],
})
export default class CatModule {}
```

### Module

```ts
// 1. 使用 @Module 装饰器
@Module({
  // 2. 当前模块依赖了哪些其他模块
  imports: [],
  // 3. 依赖的模块重新导出，其他模块导入当前模块后也可以使用当前模块所依赖的模块
  exports: [],
  // 4. 控制器：角色为 [消费者, 路由处理程序]
  controllers: [],
  // 5. 提供者
  providers: [],
})
export default class CatModule {}
```

### Middleware

```ts
// 1. 使用 @Injectable 装饰器，需要实现 NestMiddleware
@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  use(req, res, next) {
    // 记得调用 next 或者直接返回响应
  }
}

// 2. 也可以直接使用函数形式定义
export default function logger(req, res, next) {}

// 3. 生效级别：模块级别。当前模块需要实现 NestModule
@Module({...})
export default class CatModule implements NestModule {
  configure(consume: MiddlewareConsumer) {
    consume
      .apply(logger) // 逗号隔开声明多个
      .exclude(CatController) // 逗号隔开声明多个
      .forRoutes('*') // 逗号隔开声明多个
  }
}

// 4. 生效级别：全局级别
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  await app.listen(4000)
}
bootstrap()
```

### 异常过滤器

```ts
// 1. 使用 @Catch 装饰器，传入的参数代表处理哪些错误类型；需要实现 ExceptionFilter
@Catch(HttpException)
export default class CustomException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {}
}

// 2. 生效级别：控制器、控制器的某个方法
@Controller('cat')
@UseFilters(CustomException)
export default class CatController {}

// 3. 生效级别：全局
app.useGlobalFilters(new CustomException());
```

### 管道

```ts
// 1. 使用 @Injectable() 装饰；需要实现 PipeTransform
@Injectable()
export default class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {}
}

// 2. 生效级别：控制器的参数级别
@Controller('cat')
export default class CatController {
  @Get(':id')
  findOne(@Param('id', ValidatePipe) id: number) {}
}

// 3. 生效级别：控制器级别
@Controller('cat')
@UsePipes(ValidatePipe)
export default class CatController {}

// 4. 生效级别：全局级别
const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidatePipe());
```

### 守卫

```ts
// 1. 使用 @Injectable() 装饰器；需要实现 CanActivate
@Injectable()
export default class RolesGuard implements CanActivate {
  // 返回 false 对应 403 Forbidden
  canActivate(ec: ExecutionContext): boolean {}
}

// 2. 生效级别：控制器
@Controller('cat')
@UseGuards(RolesGuard)
export default class CatController {
  @Get()
  // 3. 生效级别：某个路由方法
  @UseGuards(RolesGuard)
  findAll() {}
}

// 4. 生效级别：全局级别
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new RolesGuard());
```

### 拦截器 Interceptor

```ts
// 1. 使用 @Injectable() 装饰器；需要实现 NestInterceptor
@Injectable()
export default class CacheInterceptor implements NestInterceptor {
  intercept(ec: ExecutionContext, next: CallHandler) {}
}

// 2. 生效级别：控制器
@Controller('cat')
@UseInterceptors(CacheInterceptor)
export default class CatController {
  @Get()
  // 3. 生效级别：某个路由方法
  @UseInterceptors(CacheInterceptor)
  findAll() {}
}

// 4. 生效级别：全局级别
const app = await NestFactory.create(AppModule);
app.useGlobalInterceptors(new CacheInterceptor());
```

## 执行顺序

中间件、守卫、管道、拦截器、异常过滤器的执行顺序：

1. 中间件：因为它不关心 route handler，所以第一执行；
2. 守卫：可以感知到会调用哪个 route handler 了；
3. 拦截器：管道分为三部分 before / doing / after，其中 before 部分在管道之前执行；
4. 管道：正在执行 route handler 了；
5. 异常过滤器：任意层抛出错误，最后都会在过滤器里处理；

## 功能定位

1. 中间件：请求阶段可以用于在请求对象上挂载额外参数，方便后续流程读取；响应阶段可以直接响应，不走后续流程了；
2. 守卫：请求阶段根据请求对象上的信息决定是否继续后面流程；
3. 拦截器：在路由处理的之前、之后做一些事情，比如「before」阶段判断缓存里有没有数据，有的话直接返回加速响应；在「after」阶段可以通过全局拦截器用于规范响应的 schema；
4. 管道：验证、转换路由处理程序的参数；

## 拓展

### Providers

之前在 `@Module` 装饰器编码的 providers 数组，本质是这样的：

```ts
import CatService from 'path/to/cat.service'

@Module({
  providers: [
    {
      provide: CatService,
      useClass: CatService
    }
  ]
})
```

`useClass` 的好处是将 service 的实例化、DI 等过程交给 nest 自动处理，还有其他两种用法：

- 如果希望使用静态的值：可以使用 `useValue` 提供一个静态的值；
- 如果希望获得更多灵活性：可以使用 `useFactory` 提供一个工厂函数，通过通过 `inject` 属性值为工厂函数提供参数；
