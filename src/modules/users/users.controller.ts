import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UserBaseResDto } from './models/dto/res/user-base.res.dto';
import { UserMapper } from './services/user.mapper';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData) {
    const result = await this.usersService.findMe(userData);
    return UserMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() updateUserDto: UpdateUserReqDto,
  ) {
    const result = await this.usersService.updateMe(userData, updateUserDto);
    return UserMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Delete('me')
  public async removeMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.removeMe(userData);
  }

  @SkipAuth()
  @Get(':userId')
  public async findOne(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<UserBaseResDto> {
    const result = await this.usersService.findOne(userId);
    return UserMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Post(':userId/follow')
  public async follow(
    @Param('userId', ParseUUIDPipe) userId: UserID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.follow(userData, userId);
  }

  @ApiBearerAuth()
  @Delete(':userId/follow')
  public async unfollow(
    @Param('userId', ParseUUIDPipe) userId: UserID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.unfollow(userData, userId);
  }
}
