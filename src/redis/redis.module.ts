import {DynamicModule, Module, Provider} from "@nestjs/common";
import {redisConnectionConstant} from "./redis-connection.constant";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {createClient} from "redis";
import {RedisService} from "./redis.service";

@Module({})
export class RedisModule {
    static register():DynamicModule{


        const redisDynamicModule:DynamicModule={
            module:RedisModule,
            imports:[ConfigModule],
            providers:[
                {
                provide:redisConnectionConstant,
                inject:[ConfigService],
                useFactory:async (configService:ConfigService)=>{
                    const host=configService.get("redis.host")
                    const port=configService.get("redis.port")
                    const client = await createClient({url:`redis://${host}:${port}`})
                        .on('error', err => console.log('Redis Client Error', err))
                        .connect();
                }},RedisService

            ],
            global:true,
            exports:[RedisService]
        }
        return redisDynamicModule
    }
}