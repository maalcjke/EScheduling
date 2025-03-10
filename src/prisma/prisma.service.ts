import {Injectable, OnModuleInit} from '@nestjs/common';
import { PrismaClient } from 'prisma/__client_generated__';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit(): Promise<void> {
      await this.$connect();
    }
}
