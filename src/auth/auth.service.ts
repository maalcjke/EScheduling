import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    Req,
    Res,
    UnauthorizedException
} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {UsersService} from "../users/users.service";
import {LoginDto} from "./dto/login.dto";
import { verify } from 'argon2';
import {SessionService} from "../session/session.service";
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly sessionService: SessionService,
    ) {}

    public async register(dto: RegisterDto) {
        const isExists = await this.userService.findByEmail(dto.email);

        if(isExists) throw new ConflictException("Пользователь уже существует");

        return this.userService.create(dto.email, dto.password, dto.username, "zaglushka");
    }

    public async login(req: Express.Request, dto: LoginDto) {
        const user = await this.userService.findByEmail(dto.email);
        if(!user) throw new NotFoundException("Пользователь не найден, проверьте вводимые данные");
        if(!(await verify(user.password, dto.password))) throw new UnauthorizedException("Проверьте правильность вводимых данных");

        return this.sessionService.save(req.session, user);
    }

    public async logout(@Req() req: Express.Request, @Res() res: Response) {
        return this.sessionService.delete(req.session, res);
    }
}
