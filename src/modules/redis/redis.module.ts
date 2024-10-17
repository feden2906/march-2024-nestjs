import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { Config, RedisConfig } from '../../configs/config.type';

@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: (configService: ConfigService<Config>) => {
        const config = configService.get<RedisConfig>('redis');
        return new Redis({
          port: config.port,
          host: config.host,
          password: config.password,
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class RedisModule {}
