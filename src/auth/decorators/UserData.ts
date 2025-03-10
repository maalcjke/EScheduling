import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import {User} from "../../../prisma/__client_generated__";

export const UserData = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user

        return data ? user[data] : user
    }
)