import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {Session, SessionData} from "express-session";
import {User} from "../../prisma/__client_generated__";
import { Response } from 'express';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class SessionService {
    constructor(private readonly configService: ConfigService) {}

    public async save(session: Session & Partial<SessionData>, user: User) {
        return new Promise((resolve, reject) => {
            session.userId = user.id;

            session.save(err => {
                if (err) return reject(new InternalServerErrorException('Произошла ошибка при сохранении сессии'));
            })

            resolve({
                user
            })
        })
    }

    public async delete(session: Session & Partial<SessionData>, res: Response) {
        return new Promise<void>((resolve, reject) => {
            session.destroy(err => {
                if (err) return reject(new InternalServerErrorException('Произошла ошибка при завершении сессии'));
            })

            res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'))
            resolve()
        })
    }
}
