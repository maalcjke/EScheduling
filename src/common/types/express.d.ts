import { Request } from 'express';
import {User} from "../../../prisma/__client_generated__";

declare module 'express' {
    export interface Request {
        user?: User;
    }
}