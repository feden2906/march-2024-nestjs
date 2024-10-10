import { Body, Controller, Post } from '@nestjs/common';
import { UsersAdminService } from './users-admin.service';

@Controller('users-admin')
export class UsersAdminController {
  constructor(private readonly usersService: UsersAdminService) {}

  @Post('ban')
  ban(@Body() dto: any) {
    return this.usersService.ban(dto.id);
  }
}
