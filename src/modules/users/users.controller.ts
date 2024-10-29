import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
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
    return await this.usersService.findMe(userData);
  }

  @ApiBearerAuth()
  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() updateUserDto: UpdateUserReqDto,
  ) {
    return await this.usersService.updateMe(userData, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete('me')
  public async removeMe(@CurrentUser() userData: IUserData) {
    return await this.usersService.removeMe(userData);
  }

  @Get(':userId')
  public async findOne(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<UserBaseResDto> {
    const result = await this.usersService.findOne(userId);
    return UserMapper.toResDto(result);
  }
}
