import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppConfigService } from "./App/app-config.service";
import { SwaggerConfigService } from './Swagger/swagger-config.service';
import { validationSchema } from './Validate/env.validation';

import appConfiguration from "./App/app-config"
import swaggerConfiguration from "./Swagger/swagger-config"
import postgresConfiguration from "./Database/postgres.config"
import mongoConfiguration from "./Database/mongo.config"
import RedisConfiguration from "./Database/redis.config"

@Module({
  imports: [ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/Config/Env/.${process.env.NODE_ENV}.env`,
      load: [appConfiguration, swaggerConfiguration, postgresConfiguration, mongoConfiguration, RedisConfiguration],
      isGlobal: true, validationSchema
  })],
  providers: [AppConfigService, SwaggerConfigService],
})
export class ConfigurationModule {}
