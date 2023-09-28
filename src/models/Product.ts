import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct {
    name: string;
    description: string;
    price: number;
    units: number;
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        units: { type: Number, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IProductModel>('Product', ProductSchema);
