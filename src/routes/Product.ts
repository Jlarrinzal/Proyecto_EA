import express from 'express';
import controller from '../controllers/Product';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.product.create), controller.createProduct);
router.get('/:productId', controller.readProduct);
router.get('/', controller.readAll);
router.put('/:productId', ValidateSchema(Schemas.product.update), controller.updateProduct);
router.delete('/:productId', controller.deleteProduct);

export = router;
