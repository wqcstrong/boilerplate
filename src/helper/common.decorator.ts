import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';

export const Roles = (...roles: string[]) =>
  SetMetadata('roles', roles);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const UserInfo = createParamDecorator(
  (key: keyof User, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    return key ? user[key] : new User(user);
  },
);
