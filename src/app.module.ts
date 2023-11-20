import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigurationModule} from "./configuration/config.module";
import {DatabaseModule} from "./database/database.module";
import {RedisModule} from "./redis/redis.module";
import {UserModule} from "./schema/auth/user/user.module";

@Module({
  imports: [ConfigurationModule,DatabaseModule,RedisModule.register(),UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
