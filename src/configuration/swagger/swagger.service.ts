import {INestApplication, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

@Injectable()
export class SwaggerService {
    constructor(private configService:ConfigService) {
    }

    initialize(app:INestApplication){
        const config = new DocumentBuilder()
            .setTitle(this.configService.get("swagger.titile"))
            .setDescription(this.configService.get("swagger.description"))
            .setVersion(this.configService.get("swagger.version"))
            .addTag(this.configService.get("swagger.tag"))
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup(this.configService.get("swagger.prefix"), app, document);
    }
}