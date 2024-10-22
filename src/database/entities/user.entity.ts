import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('text', { nullable: true })
  bio: string;

  @Column('text', { nullable: true })
  image: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.user)
  likes?: LikeEntity[];
}
