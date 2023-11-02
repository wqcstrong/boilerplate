import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './common.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class CommonGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const skipAuth = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      ctx.getClass(),
      ctx.getHandler(),
    ]);
    if (skipAuth) return true;

    const req = ctx.switchToHttp().getRequest<Request>();
    const token = this.extractToken(req);
    if (!token) {
      throw new UnauthorizedException('请登录');
    }
    try {
      const secret = this.configService.get('jwt.secret');
      const { user } = await this.jwtService.verifyAsync(token, {
        secret,
      });
      req['user'] = user;
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedException('登录已过期');
      } else {
        throw new UnauthorizedException(e.message);
      }
    }
    return true;
  }

  extractToken(req: Request) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
