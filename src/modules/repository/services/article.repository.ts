import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

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
    qb.leftJoinAndSelect('article.user', 'user');

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
}
