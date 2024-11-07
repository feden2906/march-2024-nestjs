import { ApiProperty } from '@nestjs/swagger';

import { UserResDto } from '../../../../users/models/dto/res/user.res.dto';

export class ArticleResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Article ID',
  })
  id: string;

  @ApiProperty({
    example: 'Article Title',
    description: 'Article Title',
  })
  title: string;

  @ApiProperty({
    example: 'Article Description',
    description: 'Article Description',
  })
  description: string;

  @ApiProperty({
    example: 'Article Body',
    description: 'Article Body',
  })
  body: string;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Article Created Date',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Article Updated Date',
  })
  updated: Date;

  @ApiProperty({
    example: ['tag1', 'tag2'],
    description: 'Article Tags',
  })
  tags: string[];

  isLiked: boolean;

  user?: UserResDto;
}
