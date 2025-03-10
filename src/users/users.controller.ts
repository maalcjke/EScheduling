import {Controller, Get, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {UserData} from "../auth/decorators/UserData";
import {AuthGuard} from "../auth/guards/Auth.guard";
import {Access} from "../auth/decorators/Access";
import {AccessType} from "../auth/enums/AccessType.enum";

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Access(AccessType.AUTHORIZED)
  @Get()
  public async getProfile(@UserData('id') id: number) {
    return this.usersService.findById(id);
  }
}
