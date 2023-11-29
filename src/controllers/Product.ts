import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product';
import {mongoosePagination, PaginationOptions } from 'mongoose-paginate-ts';
import User from '../models/User';

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, units, user} = req.body;

    try {
        const userExists = await User.findOne({email: user});

        if (!userExists) {
            return res.status(404).json({ message: 'User not found in the database', userExists });
        }

        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            user: userExists,
            name,
            description,
            price,
            units
        });

        const newProduct = await product.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error
        return res.status(500).json({ error });
    }
};

const readProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Product.findById(productId)
        .then((product) => (product ? res.status(200).json( product ) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1; 
    const options: PaginationOptions = {
        page,
        limit: 3
    };
    return Product.paginate(options)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json({ error }));
};

const updateProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Product.findById(productId)
        .then((product) => {
            if (product) {
                product.set(req.body);

                return product
                    .save()
                    .then((product) => res.status(201).json({ product }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Product.findByIdAndDelete(productId)
        .then((product) => (product ? res.status(201).json({ product, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createProduct, readProduct, readAll, updateProduct, deleteProduct };
