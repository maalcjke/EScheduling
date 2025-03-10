import {Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {AccessType} from "../enums/AccessType.enum";
import {Reflector} from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest() as Express.Request;
        const accessType = this.reflector.get<AccessType>('access', context.getHandler());

        const isAuth = typeof request.session.userId !== 'undefined'

        switch (accessType) {
            case AccessType.AUTHORIZED:
                if(!isAuth) throw new UnauthorizedException('Вы должны быть авторизованы');
                return true;
            case AccessType.UNAUTHORIZED:
                if(isAuth) throw new ForbiddenException('Вы должны быть не авторизованы');
                return true;
            default:
                return true;
        }
    }
}