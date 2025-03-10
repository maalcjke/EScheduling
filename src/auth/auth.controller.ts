import {Body, Controller, HttpCode, HttpStatus, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: Express.Request, @Body() dto: LoginDto) {
    return this.authService.login(req, dto);
  }

  @Post('logout')
  public async logout(@Req() req: Express.Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }
}
