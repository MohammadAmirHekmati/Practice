import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {SwaggerService} from "./configuration/swagger/swagger.service";
import * as basicAuth from 'express-basic-auth'
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService=app.get<ConfigService>(ConfigService)

  // جلوگیری از اجرا شدن اسکریپت ها ازدامین دیگر
  helmet.contentSecurityPolicy({directives:{
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
  }})

  // از آی فریم شدن سایت در بقیه دامین ها جلوگیری میکند
  helmet.xFrameOptions({action:"deny"})

  //جلوگیری از اجرای dns
  helmet.dnsPrefetchControl({allow:false})

  app.use(helmet)


  app.setGlobalPrefix(configService.get("app.globalApiPrefix"))
    app.use([`/${configService.get("swagger.prefix")}`],
        basicAuth({
            challenge: true,
            users: { 'test': '123456' },
        }));
  const swaggerService=app.get<SwaggerService>(SwaggerService)
      swaggerService.initialize(app)
  await app.listen(configService.get("app.runningPort")).then(()=>{
    console.log(`App is Running : http://localhost:${configService.get("app.runningPort")}/${configService.get("app.globalApiPrefix")}`)
    console.log(`Swagger is enabled : http://localhost:${configService.get("app.runningPort")}/${configService.get("swagger.prefix")}`)
  });
}
bootstrap();
