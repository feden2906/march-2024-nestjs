import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SignInReqDto } from './models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from './models/dto/req/sign-up.req.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.signUp(dto);
  }

  @Post('sign-in')
  public async signIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.signIn(dto);
  }
}
