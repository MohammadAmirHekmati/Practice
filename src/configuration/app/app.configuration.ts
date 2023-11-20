import {registerAs} from "@nestjs/config";

export default registerAs("app",()=>({
    globalApiPrefix:"practice",
    runningPort:3000
}))