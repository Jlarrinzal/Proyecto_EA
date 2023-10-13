import express from 'express';
import controller from '../controllers/User';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.post('/createuser', ValidateSchema(Schemas.user.create), controller.createUser);
router.get('/readuser/:userId', controller.readUser);
router.get('/readall', [verifyToken], controller.readAll);
router.put('/updateuser/:userId', ValidateSchema(Schemas.user.update), controller.updateUser);
router.delete('/deleteuser/:userId', controller.deleteUser);
router.post("/signin", controller.signin);

export = router;
