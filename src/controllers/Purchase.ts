import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Purchase from '../models/Purchase';
import {mongoosePagination, PaginationOptions } from 'mongoose-paginate-ts';

const createPurchase = (req: Request, res: Response, next: NextFunction) => {
    const { user, product, quantity } = req.body;

    const purchase = new Purchase({
        _id: new mongoose.Types.ObjectId(),
        user,
        product,
        quantity
    });

    return purchase
        .save()
        .then((purchase) => res.status(201).json(purchase))
        .catch((error) => res.status(500).json({ error }));
};

const readPurchase = (req: Request, res: Response, next: NextFunction) => {
    const purchaseId = req.params.purchaseId;

    return Purchase.findById(purchaseId)
        .then((purchase) => (purchase ? res.status(200).json(purchase) : res.status(404).json({ message: 'Compra no encontrada' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1; 
    const options: PaginationOptions = {
        page,
        limit: 3
    };
    return Purchase.paginate(options)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json({ error }));
};

const updatePurchase = (req: Request, res: Response, next: NextFunction) => {
    const purchaseId = req.params.purchaseId;

    return Purchase.findById(purchaseId)
        .then((purchase) => {
            if (purchase) {
                purchase.set(req.body);

                return purchase
                    .save()
                    .then((updatedPurchase) => res.status(200).json(updatedPurchase))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Compra no encontrada' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deletePurchase = (req: Request, res: Response, next: NextFunction) => {
    const purchaseId = req.params.purchaseId;

    return Purchase.findByIdAndDelete(purchaseId)
        .then((purchase) => (purchase ? res.status(204).json({ message: 'Compra eliminada' }) : res.status(404).json({ message: 'Compra no encontrada' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createPurchase, readPurchase, readAll, updatePurchase, deletePurchase };
