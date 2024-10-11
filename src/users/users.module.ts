import { forwardRef, Module } from '@nestjs/common';

import { ArticlesModule } from '../articles/articles.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersAdminController } from './users-admin.controller';
import { UsersAdminService } from './users-admin.service';

@Module({
  imports: [forwardRef(() => ArticlesModule)],
  controllers: [UsersController, UsersAdminController],
  providers: [UsersService, UsersAdminService],
  exports: [UsersService],
})
export class UsersModule {}
