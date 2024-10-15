import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user-base.req.dto';

export class CreateUserReqDto extends PickType(UserBaseReqDto, [
  'name',
  'age',
  'email',
  'phone',
  'password',
  'isStudent',
  'gender',
  'cars',
]) {}
