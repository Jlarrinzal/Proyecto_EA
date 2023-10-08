import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import {mongoosePagination, Pagination} from 'mongoose-paginate-ts';

export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true } 
    },
    {
        versionKey: false
    }
);

UserSchema.plugin(mongoosePagination);
export default mongoose.model<IUserModel, Pagination<IUserModel>>('User', UserSchema);