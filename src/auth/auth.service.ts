import {Inject, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {RegisterDto} from "./dto/register.dto";

@Injectable()
export class AuthService {
    public async register(dto: RegisterDto) {
        //TO:DO UsersService find, check, create
    }

    public async login() {
        //TO:DO UsersService find, check, login
    }

    public async logout() {
        //TO:DO UsersService find, check, clear
    }

    private async saveSession() {
        //TO:DO save session
    }
}
