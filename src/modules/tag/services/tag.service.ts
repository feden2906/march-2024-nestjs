import { Injectable } from '@nestjs/common';

import { TagEntity } from '../../../database/entities/tag.entity';
import { TagRepository } from '../../repository/services/tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  public async getPopular(): Promise<TagEntity[]> {
    return await this.tagRepository.getPopular();
  }
}
