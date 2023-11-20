import {registerAs} from "@nestjs/config";

export default registerAs("swagger",()=>({
    title:"Practice Open API",
    description:"Practice Desc",
    prefix:"docs",
    version:"1.0",
    tag:"Practice"
}))