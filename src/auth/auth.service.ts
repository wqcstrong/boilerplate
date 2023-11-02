import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDTO, SignInDTO } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInDTO) {
    const user = await this.userService.findOneByName(data.username);
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const isValid = await bcrypt.compare(
      data.password,
      user.password,
    );
    if (!isValid) {
      throw new BadRequestException('密码错误');
    }

    const payload = {
      sub: user.id,
      user,
    };
    return {
      access_token: await this.issueToken(payload),
    };
  }

  async register(data: RegisterDTO) {
    const exist = await this.userService.findOneByName(data.username);
    if (exist) {
      throw new BadRequestException('用户名已存在');
    }

    data.password = await bcrypt.hash(data.password, 10);

    await this.userService.create(new User(data));
    const user = await this.userService.findOneByName(data.username);

    const payload = {
      sub: user.id,
      user,
    };
    return {
      access_token: await this.issueToken(payload),
    };
  }

  async issueToken(payload: object) {
    return await this.jwtService.signAsync(payload);
  }
}
