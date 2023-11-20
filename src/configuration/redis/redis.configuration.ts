import {registerAs} from "@nestjs/config";

export default registerAs("redis",()=>({
    host:"localhost",
    port:6379
}))