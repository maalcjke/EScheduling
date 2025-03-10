import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {hash} from "argon2";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    public async findById(id: number) {
        return this.prismaService.user.findUnique({
            where: {
                id
            }
        });
    }

    public async findByEmail(email: string) {
        return this.prismaService.user.findUnique({
            where: {
                email
            }
        });
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
