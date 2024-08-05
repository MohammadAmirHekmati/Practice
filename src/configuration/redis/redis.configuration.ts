import {registerAs} from "@nestjs/config";

export default registerAs("redis",()=>({
    host:"130.185.74.233",
    port:6379
}))