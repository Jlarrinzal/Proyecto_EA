import mongoose, { Document, Schema } from 'mongoose';
import {mongoosePagination, Pagination} from 'mongoose-paginate-ts';

export interface IRecipe {
    userId: string;
    product: string;
    recipe: string;
}

export interface IRecipeModel extends IRecipe, Document {}

const RecipeSchema: Schema = new Schema(
    {
        userId: { type: String, ref: 'User', required: true },
        product: { type: String, required: true },
        recipe: { type: String, required: true },
    },
    {
        versionKey: false
    }
);

RecipeSchema.plugin(mongoosePagination);
export default mongoose.model<IRecipeModel, Pagination<IRecipeModel>>('Recipe', RecipeSchema);
