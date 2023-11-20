import {Injectable} from "@nestjs/common";
import {UserRepository} from "../repositories/user.repository";
import {CreateUserDto} from "../dto/user.dto";

@Injectable()
export class UserService {
    constructor(private userRepo:UserRepository) {
    }

    async createUser(createUserDto:CreateUserDto){
        return await this.userRepo.userSave(createUserDto)
    }
}