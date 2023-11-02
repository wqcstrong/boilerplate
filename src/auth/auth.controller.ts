import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, SignInDTO } from './auth.dto';
import { Public } from 'src/helper/common.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signIn')
  signIn(@Body() user: SignInDTO) {
    return this.authService.signIn(user);
  }

  @Public()
  @Post('register')
  register(@Body() user: RegisterDTO) {
    return this.authService.register(user);
  }
}
