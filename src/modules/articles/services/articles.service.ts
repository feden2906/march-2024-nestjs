import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/services/article.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { CreateArticleDto } from '../models/dto/req/create-article.dto';
import { UpdateArticleDto } from '../models/dto/req/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  public async create(
    userData: IUserData,
    dto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const tags = await this.createTags(dto.tags);

    return await this.articleRepository.save(
      this.articleRepository.create({ ...dto, tags, user_id: userData.userId }),
    );
  }

  public async findOne(articleId: ArticleID): Promise<ArticleEntity> {
    return {} as any;
  }

  public async update(
    userData: IUserData,
    articleId: ArticleID,
    updateUserDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    return {} as any;
  }

  private async createTags(tags: string[]): Promise<TagEntity[]> {
    if (!tags || !tags.length) return [];

    const entities = await this.tagRepository.findBy({ name: In(tags) });
    const existingTags = entities.map((tag) => tag.name);
    const newTags = tags.filter((tag) => !existingTags.includes(tag));
    const newEntities = await this.tagRepository.save(
      newTags.map((tag) => this.tagRepository.create({ name: tag })),
    );
    return [...entities, ...newEntities];
  }
}
