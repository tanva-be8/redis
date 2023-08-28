import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-fragrant-bread-308308.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'tanva.j',
      password: 'g0vfnXSci7at',
      database: 'neondb',
      ssl: true,
      entities: [User],
      synchronize: true,
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      // url: 'redis://localhost:6379',
      url: '//10.231.244.207:6379',
      ttl: 11,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
