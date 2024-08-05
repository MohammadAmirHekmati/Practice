import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {Request} from "express"
import { ParseUserAgent } from './dto/user-agent.dto';
const UaParser=require("ua-parser-js")


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("login")
  async login(@Req() request:Request){
    return await this.appService.login(request)
  }  

  @Get("re/generate/ac")
  async generateAccessToken(@Query("refreshToken") refreshToken:string,@Req() request:Request){
    const userAgnet:ParseUserAgent=UaParser(request.headers["user-agent"])
      return await this.appService.generateAccessToken(refreshToken,userAgnet)
  }

  @Get("log/out")
  async logOut(@Query("refreshToken") refreshToken:string){
  return await this.appService.logOut(refreshToken)
  }
}
