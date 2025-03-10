import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Устанавливаем глобально для всех модулей
  })]
})
export class AppModule {}
