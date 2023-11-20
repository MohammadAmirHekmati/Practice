import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import appConfiguration from "./app/app.configuration";
import postgresConfiguration from "./postgres/postgres.configuration";
import redisConfiguration from "./redis/redis.configuration";
import mongoConfiguration from "./mongo/mongo.configuration";
import swaggerConfiguration from "./swagger/swagger.configuration";
import {SwaggerService} from "./swagger/swagger.service";
@Module({
    imports:[ConfigModule.forRoot({
    load:[appConfiguration,postgresConfiguration,redisConfiguration,mongoConfiguration,swaggerConfiguration]
    })],
    providers:[SwaggerService]
})
export  class ConfigurationModule {
}