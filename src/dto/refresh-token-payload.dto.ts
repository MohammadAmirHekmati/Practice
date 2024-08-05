import { ParseUserAgent } from "./user-agent.dto";

export class RefreshTokenPayloadDto {
    userAgnet:ParseUserAgent
    userId:string
}