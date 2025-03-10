import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from "./dto/register.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // @Post('login')
  // public async login(@Body() dto: ) {
  //   return this.authService.login(dto);
  // }
  //
  // @Post('logout')
  // public async logout(@Body() dto: ) {
  //   return this.authService.logout(dto);
  // }
}
