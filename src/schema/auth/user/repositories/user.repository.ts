import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dto/user.dto";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(UserEntity) private readonly userRepo:Repository<UserEntity>) {
    }

    async userSave(createUserDto:CreateUserDto){
        const user=new UserEntity()
        user.name=createUserDto.name
        user.number=createUserDto.number
        return await this.userRepo.save(this.userRepo.create(user))
    }
}