import {registerAs} from "@nestjs/config";

export default registerAs("mongo",()=>({
    host:"localhost",
    port:27017,
    database:"practice"
}))