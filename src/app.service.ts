import { ForbiddenException, Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { ParseUserAgent } from './dto/user-agent.dto';
const UaParser=require("ua-parser-js")
import {Request} from "express"
import { v4 as uuidv4 } from 'uuid';
import { RefreshTokenPayloadDto } from './dto/refresh-token-payload.dto';


@Injectable()
export class AppService {
  constructor(private redisService:RedisService,
    private jwtService:JwtService){}

    user_refresh_token="USER_REFRESH_TOKEN_"

  async login(request:Request){
    const idUser=uuidv4()
    const userAgnet:ParseUserAgent=UaParser(request.headers["user-agent"])
    const refreshTokenPayload:RefreshTokenPayloadDto={
      userAgnet:userAgnet,
      userId:idUser
    }
    const refreshToken= await this.jwtService.sign(refreshTokenPayload,{expiresIn:"7D"})
    const accessTokenPayload:RefreshTokenPayloadDto={
      userAgnet:userAgnet,
      userId:uuidv4()
    }
    await this.redisService.setKey(`${this.user_refresh_token}${idUser}`,refreshToken,604800)
    return await this.jwtService.sign(accessTokenPayload,{expiresIn:"15m"})
  }

  async generateAccessToken(refreshToken:string,userAgent:ParseUserAgent){

      const decodedRefreshToken:RefreshTokenPayloadDto=this.jwtService.decode(refreshToken)
      const getRefreshToken=await this.redisService.getKey(`${this.user_refresh_token}${decodedRefreshToken.userId}`)
    
      if(getRefreshToken)
      {
        if (userAgent.browser.name!==decodedRefreshToken.userAgnet.browser.name ||
           userAgent.os.name!==decodedRefreshToken.userAgnet.os.name ||
           userAgent.device.type!==decodedRefreshToken.userAgnet.device.type) 
            throw new ForbiddenException("کاربر گرامی دوباره لاگین کنید")

            const accessTpokenPayload:RefreshTokenPayloadDto={
              userAgnet:decodedRefreshToken.userAgnet,
              userId:decodedRefreshToken.userId
              }
              return await this.jwtService.sign(accessTpokenPayload,{expiresIn:"15m"})
      }
  }

  async logOut(refreshToken:string){
    const decodedRefreshToken:RefreshTokenPayloadDto=this.jwtService.decode(refreshToken)
    return await this.redisService.deleteKey(`${this.user_refresh_token}${decodedRefreshToken.userId}`)
  }
}
