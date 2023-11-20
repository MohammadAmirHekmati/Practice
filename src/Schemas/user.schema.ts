import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IUserDocument } from "../Modules/Login/Types/UserDocument";

export type UserDocument = UserSchema & IUserDocument

@Schema()
export class UserSchema {
    @Prop({ type: String, index: true })
    userName: string
    
    @Prop({ type: String })
    fullName: string
    
    @Prop({ type: String })
    password: string
}

export const userSchema = SchemaFactory.createForClass(UserSchema);