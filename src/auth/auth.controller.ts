import {Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import {Response} from 'express';
import {AuthGuard} from "./guards/Auth.guard";
import {Access} from "./decorators/Access";
import {AccessType} from "./enums/AccessType.enum";

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Access(AccessType.UNAUTHORIZED)
  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Access(AccessType.UNAUTHORIZED)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: Express.Request, @Body() dto: LoginDto) {
    return this.authService.login(req, dto);
  }

  @Access(AccessType.AUTHORIZED)
  @Post('logout')
  public async logout(@Req() req: Express.Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }
}
