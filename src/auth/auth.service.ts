import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {UsersService} from "../users/users.service";
import {LoginDto} from "./dto/login.dto";
import { verify } from 'argon2';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    public async register(dto: RegisterDto) {
        const isExists = await this.userService.findByEmail(dto.email);

        if(isExists) throw new ConflictException("Пользователь уже существует");

        return await this.userService.create(dto.email, dto.password, dto.username, "zaglushka");
        //TODO: make save session
    }

    public async login(dto: LoginDto) {
        const user = await this.userService.findByEmail(dto.email);
        if(!user || !(await verify(user.password, dto.password))) throw new NotFoundException("Пользователь не найден, проверьте вводимые данные");

        //Save Session
    }

    public async logout() {
        //TO:DO UsersService find, check, clear
    }
}
