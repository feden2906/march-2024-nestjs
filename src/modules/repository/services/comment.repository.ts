import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CommentEntity } from '../../../database/entities/comment.entity';

@Injectable()
export class CommentRepository extends Repository<CommentEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CommentEntity, dataSource.manager);
  }
}
