import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory:(configService:ConfigService)=>({
            type:"postgres",
            host:configService.get("postgres.host"),
            port:configService.get("postgres.port"),
            database:configService.get("postgres.database"),
            username:configService.get("postgres.username"),
            password:String(configService.get("postgres.password")),
            autoLoadEntities:configService.get("postgres.autoLoadedEntities"),
            synchronize:configService.get("postgres.synchronize")
        })
    }),
    MongooseModule.forRootAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
         useFactory:(configService:ConfigService)=>({
             uri:`mongodb://${configService.get("mongo.host")}:${configService.get("mongo.port")}/${configService.get("mongo.database")}`
         })
    })
    ]
})
export class DatabaseModule{}