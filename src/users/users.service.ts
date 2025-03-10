import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {hash} from "argon2";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    public async findById(id: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        })

        if(!user) throw new NotFoundException("Пользователь не найден");

        return user;
    }

    public async findByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })

        if(!user) throw new NotFoundException("Пользователь не найден");

        return user;
    }

    public async create(email: string, password: string, username: string, avatar: string) {
        return this.prismaService.user.create({
            data: {
                email,
                password: await hash(password),
                username,
                avatar
            }
        });
    }
}
