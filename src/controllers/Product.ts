import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product';

const createProduct = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, units } = req.body;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
        price,
        units
    });

    return product
        .save()
        .then((product) => res.status(201).json(product ))
        .catch((error) => res.status(500).json({ error }));
};

const readProduct = (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return Product.findById(productId)
        .then((product) => (product ? res.status(200).json( product ) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Product.find()
        .then((product) => res.status(200).json( product ))
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
