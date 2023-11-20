import { ConfigService } from '@nestjs/config';
import * as redisStore from "cache-manager-ioredis"
import { CacheOptionsFactory, CacheModuleOptions } from '@nestjs/cache-manager';

export class CacheConfig implements CacheOptionsFactory {
  constructor(private config: ConfigService) {}
  createCacheOptions(): Promise<CacheModuleOptions<Record<string, any>>> | CacheModuleOptions<Record<string, any>> {
    const options: CacheModuleOptions = {
      store: redisStore,
      host: this.config.get<string>("redis.host"),
      port: this.config.get<number>("redis.port"),
      ttl: 10
    }
    return options
  }

}