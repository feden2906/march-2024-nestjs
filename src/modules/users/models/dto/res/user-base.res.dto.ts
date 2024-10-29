import { ApiProperty } from '@nestjs/swagger';

import { UserID } from '../../../../../common/types/entity-ids.type';

export class UserBaseResDto {
  @ApiProperty({ type: String })
  id: UserID;
  name: string;
  email: string;
  bio?: string;
  image?: string;
}
