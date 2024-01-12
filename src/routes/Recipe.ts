import express from 'express';
import controller from '../controllers/Recipe';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.post('/createrecipe', /*ValidateSchema(Schemas.recipes.create)*/ controller.createRecipe);
router.get('/readall'/*, [verifyToken]*/, controller.readAll);
router.get('/readuserrecipe/:userId', controller.readUserRecipes);

export = router;
