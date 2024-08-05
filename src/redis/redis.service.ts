import {Inject, Injectable} from "@nestjs/common";
import {redisConnectionConstant} from "./redis-connection.constant";
import {createClient} from "redis";


@Injectable()
export class RedisService {
    constructor(@Inject(redisConnectionConstant) private redisClient:ReturnType<typeof createClient>) {
    }

    async setKey(key: string, value: string, ttl?: number) {
        await this.redisClient.set(key, value,{EX:ttl});
    }

    async getKey(key:string){
        return await this.redisClient.get(key)
    }

    async deleteKey(key:string){
        await this.redisClient.del(key)
    }
}