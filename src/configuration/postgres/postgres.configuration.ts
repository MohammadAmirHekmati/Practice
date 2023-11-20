import {registerAs} from "@nestjs/config";

export default registerAs("postgres",()=>({
    host:"localhost",
    port:5432,
    database:"practice",
    username:"postgres",
    password:"123456",
    autoLoadedEntities:true,
    synchronize:true
}))