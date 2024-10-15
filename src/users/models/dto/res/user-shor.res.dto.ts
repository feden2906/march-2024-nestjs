import { PickType } from '@nestjs/swagger';

import { UserBaseResDto } from './user-base.res.dto';

export class UserShorResDto extends PickType(UserBaseResDto, ['id', 'name']) {}
