import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserID } from '../../../common/types/entity-ids.type';
import { Config } from '../../../configs/config.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/services/article.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private userRepository: UserRepository,
    private articleRepository: ArticleRepository,
  ) {}

  public async findMe(userData: IUserData) {
    const qb = this.userRepository.createQueryBuilder('user');
    qb.leftJoinAndSelect('user.refreshTokens', 'refreshTokens');
    qb.where('user.id = :userId', { userId: userData.userId });
    const mapped = await qb.getMany();
    const raw = await qb.getRawMany();
    return await qb.getOne();
  }

  public async updateMe(userData: IUserData, dto: UpdateUserReqDto) {
    return `This action updates a #${userData.userId} user`;
  }

  public async removeMe(userData: IUserData) {
    return `This action removes a #${userData.userId} user`;
  }

  public async findOne(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
