import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, Length, Matches } from 'class-validator';

export class RegisterDTO {
  @Matches(/^[a-zA-Z0-9_\-]+$/, {
    message: ' 只能输入英文字母、数字、下划线和横线',
  })
  @Length(3, 20, { message: '用户名要求为 3 ~ 20 个字符' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

export class SignInDTO extends PickType(RegisterDTO, [
  'username',
  'password',
]) {}
