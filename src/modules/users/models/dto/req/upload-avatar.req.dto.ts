import { ApiProperty } from '@nestjs/swagger';

export class UploadAvatarReqDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  avatar: any;
}
