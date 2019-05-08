import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
}
declare const _default: mongoose.Model<IUser, {}>;
export default _default;
