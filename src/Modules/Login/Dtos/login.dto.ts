import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({ name: "username", description: "UserName", type: "string" })
    @IsString()
    username: string
    
    @ApiProperty({ name: "fullName", description: "User FullName", type: "string" })
    @IsString()
    fullName: string
    
    @ApiProperty({ name: "password", description: "User Password", type: "string" })
    @IsString()
    password: string
}