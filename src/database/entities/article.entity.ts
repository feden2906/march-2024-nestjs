import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { LikeEntity } from './like.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ARTICLES)
export class ArticleEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text', { nullable: true })
  body?: string;

  @OneToMany(() => LikeEntity, (entity) => entity.article)
  likes?: LikeEntity[];

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToMany(() => TagEntity, (entity) => entity.articles)
  tags?: TagEntity[];
}
