import {Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {AccessType} from "../enums/AccessType.enum";
import {Reflector} from "@nestjs/core";
import {UsersService} from "../../users/users.service";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly userService: UsersService) {}

    public async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const accessType = this.reflector.get<AccessType>('access', context.getHandler());

        const isAuth = typeof request.session.userId !== 'undefined'

        switch (accessType) {
            case AccessType.AUTHORIZED:
                if(!isAuth) throw new UnauthorizedException('Вы должны быть авторизованы');

                const user = await this.userService.findById(request.session.userId ?? 0)
                request.user = user;

                return true;
            case AccessType.UNAUTHORIZED:
                if(isAuth) throw new ForbiddenException('Вы должны быть не авторизованы');
                return true;
            default:
                return true;
        }
    }
}