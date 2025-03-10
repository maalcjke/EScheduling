import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Устанавливаем глобально для всех модулей
  }), PrismaModule, AuthModule]
})
export class AppModule {}
