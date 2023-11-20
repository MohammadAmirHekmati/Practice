import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PostgresProvider } from "./postgres/postgres.data-source";
import { MongoDataSource } from './mongo/mongo.data-source';
import { CacheConfig } from './redis/redis.config';
import { CachingService } from './redis/redis.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      useClass: CacheConfig,
      imports: [ConfigModule]
    }),
    MongooseModule.forRootAsync({
      useClass: MongoDataSource,
      imports: [ConfigModule]
    })
  ],
  providers: [PostgresProvider, CachingService],
  exports: [PostgresProvider, CachingService]
})
export class DatabaseModule { }
