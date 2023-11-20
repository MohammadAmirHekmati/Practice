import {Body, Controller, Injectable, Post} from "@nestjs/common";
import {UserService} from "../providers/user.service";
import {CreateUserDto} from "../dto/user.dto";
import {ApiTags} from "@nestjs/swagger";
@ApiTags("[USER]")
@Controller("user")
export class UserController {
    constructor(private userService:UserService) {
    }


    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto)
    }
}