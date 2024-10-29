import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RefreshTokenEntity } from '../../../database/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshTokenEntity, dataSource.manager);
  }

  public async isRefreshTokenExist(refreshToken: string): Promise<boolean> {
    return await this.existsBy({ refreshToken });
  }
}
