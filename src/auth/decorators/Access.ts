import { SetMetadata } from '@nestjs/common';
import {AccessType} from "../enums/AccessType.enum";

export const Access = (type: AccessType) => SetMetadata('access', type);