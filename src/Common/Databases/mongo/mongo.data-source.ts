import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
@Injectable()
export class MongoDataSource implements MongooseOptionsFactory {
    constructor(private config: ConfigService) { }

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        
        const options: MongooseModuleOptions = {
            uri: this.config.get<string>("mongo.uri"),
            user: this.config.get<string>("mongo.user"),
            pass: this.config.get<string>("mongo.pass"),
            dbName: this.config.get<string>("mongo.dbName"),
        }

        return options;
    }
    
}