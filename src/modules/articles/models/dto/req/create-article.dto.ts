import { PickType } from '@nestjs/swagger';

import { BaseArticleReqDto } from './base-article.req.dto';

export class CreateArticleDto extends PickType(BaseArticleReqDto, [
  'title',
  'description',
  'body',
  'tags',
]) {}
