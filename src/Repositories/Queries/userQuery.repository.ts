import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument, UserSchema } from "../../Schemas/user.schema";
import { IQueryRepository, SchemaRepository } from "src/Common";

@Injectable()
export class UserQueryRepository extends SchemaRepository<UserDocument> implements IQueryRepository<UserDocument>  {
    constructor(@InjectModel(UserSchema.name) private readonly userModel: Model<UserDocument>) {
        super(userModel);
    }

}