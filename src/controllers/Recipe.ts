import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Recipes from '../models/Recipe';
import {mongoosePagination, PaginationOptions } from 'mongoose-paginate-ts';
import User from '../models/User';

const createRecipe = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, product, recipe} = req.body;

    try {
        const userExists = await User.findById(userId);

        if (!userExists) {
            return res.status(404).json({ message: 'User not found in the database', userExists });
        }

        const recipes = new Recipes({
            _id: new mongoose.Types.ObjectId(),
            userId: userExists._id,
            product,
            recipe,
        });

        const newRecipe = await recipes.save();
        return res.status(201).json(newRecipe);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1; 
    const options: PaginationOptions = {
        page,
        limit: 50
    };
    return Recipes.paginate(options)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json({ error }));
};

export default { createRecipe, readAll};
