import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/services/article.repository';
import { LikeRepository } from '../../repository/services/like.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { CreateArticleDto } from '../models/dto/req/create-article.dto';
import { ListArticleQueryDto } from '../models/dto/req/list-article-query.dto';
import { UpdateArticleDto } from '../models/dto/req/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
    private readonly likeRepository: LikeRepository,
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

  public async findAll(
    userData: IUserData,
    query: ListArticleQueryDto,
  ): Promise<[ArticleEntity[], number]> {
    return await this.articleRepository.findAll(userData, query);
  }

  public async findOne(
    userData: IUserData,
    articleId: ArticleID,
  ): Promise<ArticleEntity> {
    return await this.articleRepository.getById(userData, articleId);
  }

  public async update(
    userData: IUserData,
    articleId: ArticleID,
    updateUserDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    return {} as any;
  }

  public async like(userData: IUserData, articleId: ArticleID): Promise<void> {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    const like = await this.likeRepository.findOneBy({
      user_id: userData.userId,
      article_id: articleId,
    });
    if (like) {
      throw new ConflictException('You already liked this article');
    }
    await this.likeRepository.save(
      this.likeRepository.create({
        user_id: userData.userId,
        article_id: articleId,
      }),
    );
  }

  public async unlike(
    userData: IUserData,
    articleId: ArticleID,
  ): Promise<void> {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    const like = await this.likeRepository.findOneBy({
      user_id: userData.userId,
      article_id: articleId,
    });
    if (!like) {
      throw new ConflictException('You have not liked this article yet');
    }
    await this.likeRepository.remove(like);
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
