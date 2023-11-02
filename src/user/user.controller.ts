import {
  BadRequestException,
  Controller,
  Get,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('info')
  async getUserInfo(@Req() req: Request) {
    const { id } = req['user'];
    if (!id) {
      throw new BadRequestException('请求数据不合法');
    }
    const res = await this.userService.findOneById(id);
    return res;
  }
}
