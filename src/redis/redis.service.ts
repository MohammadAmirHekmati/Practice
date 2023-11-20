import {Inject, Injectable} from "@nestjs/common";
import {redisConnectionConstant} from "./redis-connection.constant";

@Injectable()
export class RedisService {
    constructor(@Inject(redisConnectionConstant) private redisClient) {
    }

    async setKey(key:string,value:string){
        await this.redisClient.set(key, value);
    }

    async getKey(key:string){
        const value = await this.redisClient.get('key');
        return value
    }
}