import mongoose, { Schema, ObjectId, Document } from 'mongoose';
import {mongoosePagination, Pagination} from 'mongoose-paginate-ts';


export interface IPurchase {
    user: string;
    product: string; 
    quantity: number; 
}

export interface IPurchaseModel extends IPurchase, Document {}

const PurchaseSchema: Schema = new Schema(
    {
        user: { type: String, ref: 'User', required: true },
        product: { type: String, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    },
    {
        versionKey: false,
        timestamps: true
    }
);
PurchaseSchema.plugin(mongoosePagination);
export default mongoose.model<IPurchaseModel, Pagination<IPurchaseModel>>('Purchase', PurchaseSchema);
