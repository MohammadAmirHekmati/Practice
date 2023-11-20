import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private cacheManger: Cache) {
  }

  public OTP_TTL: number = parseInt(process.env.CACHE_OTP_TTL);

  async setKey(key: string, value: string) {
    const ttl = this.OTP_TTL;
    await this.cacheManger.set(key, value, ttl);
  }

  async getKey(key: string) {
    const value = await this.cacheManger.get(key);
    return value
  }
}