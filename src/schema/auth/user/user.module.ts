import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {UserController} from "./controllers/user.controller";
import {UserService} from "./providers/user.service";
import {UserRepository} from "./repositories/user.repository";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers:[UserController],
    providers:[UserService,UserRepository]
})
export class UserModule {

}