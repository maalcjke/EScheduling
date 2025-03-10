import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as session from "express-session"
import {ConfigService} from "@nestjs/config";
import IORedis from 'ioredis'
import {RedisStore} from "connect-redis";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const redis = new IORedis(config.getOrThrow<string>("REDIS_URI"))

    app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))

    app.use(
      session({
        secret: config.getOrThrow<string>("SESSION_SECRET"),
        name: config.getOrThrow<string>("SESSION_NAME"),
        resave: true,
        saveUninitialized: false,
        cookie: {
          domain: config.getOrThrow<string>("SESSION_DOMAIN"),
          maxAge: 1000 * 60 * 60, //TODO: get from env
          secure: false, //config.getOrThrow<boolean>("SESSION_SECURE"),
          httpOnly: true, //config.getOrThrow<boolean>("SESSION_HTTP_ONLY"),
          sameSite: 'lax'
        },
        store: new RedisStore({
          client: redis,
          prefix: config.getOrThrow<string>("SESSION_FOLDER")
        })
      })
    )

    app.useGlobalPipes(new ValidationPipe({
        transform: true // Автоматическое преобразование входных данных
    }));

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
