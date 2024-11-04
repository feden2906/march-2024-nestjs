import { PickType } from '@nestjs/swagger';

import { BaseArticleReqDto } from './base-article.req.dto';

export class UpdateArticleDto extends PickType(BaseArticleReqDto, [
  'title',
  'description',
  'body',
]) {}
