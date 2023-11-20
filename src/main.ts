import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth'
import { Logger } from '@nestjs/common';
import { AppConfigService, SwaggerConfigService } from './Configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get<AppConfigService>(AppConfigService)
  app.setGlobalPrefix(appConfig.apiGlobalPrefix)

  const swaggerConfig = app.get<SwaggerConfigService>(SwaggerConfigService)
  app.use([`/${swaggerConfig.prefix}`],
    basicAuth({
      challenge: true,
      users: { 'test': '123456' },
    }));

  if (appConfig.mode == 'developer') {
    swaggerConfig.initialize(app);
  }

  await app.listen(appConfig.port).then(() => {
    Logger.log(`🚀 App is Running on: http://localhost:${appConfig.port}/${appConfig.apiGlobalPrefix}`);
    Logger.log(`🚀 Swagger is Running on: http://localhost:${appConfig.port}/${swaggerConfig.prefix}`);
  });
}
bootstrap();
