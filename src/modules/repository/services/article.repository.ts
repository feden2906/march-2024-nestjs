import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { ListArticleQueryDto } from '../../articles/models/dto/req/list-article-query.dto';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }

  public async findAll(
    userData: IUserData,
    query: ListArticleQueryDto,
  ): Promise<[ArticleEntity[], number]> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    // qb.leftJoinAndSelect('article.tags', 'tag', 'tag.name = :tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
    );
    qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :userId');
    qb.setParameter('userId', userData.userId);

    if (query.search) {
      qb.andWhere('CONCAT(article.title, article.description) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    if (query.tag) {
      qb.andWhere('tag.name = :tag', { tag: query.tag });
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async getById(
    userData: IUserData,
    articleId: ArticleID,
    em?: EntityManager,
  ): Promise<ArticleEntity> {
    const repo = em ? em.getRepository(ArticleEntity) : this;

    const qb = repo.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
    );
    qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :userId');
    qb.setParameter('userId', userData.userId);

    qb.where('article.id = :articleId', { articleId });
    return await qb.getOne();
  }
}
