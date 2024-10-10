import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersAdminService } from './users-admin.service';
import { UsersAdminController } from './users-admin.controller';

@Module({
  controllers: [UsersController, UsersAdminController],
  providers: [UsersService, UsersAdminService],
})
export class UsersModule {}
