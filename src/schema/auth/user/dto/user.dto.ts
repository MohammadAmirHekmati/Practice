import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({name:"name",description:"User Full Name",type:"string"})
    name:string

    @ApiProperty({name:"number",description:"User Phone Number",type:"string"})
    number:string
}