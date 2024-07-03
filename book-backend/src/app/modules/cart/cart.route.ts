
import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { cartController } from './cart.controller';

const router = express.Router();

router.post('/cart',auth(USER_ROLE.manager,USER_ROLE.user),cartController.createCart);
router.get('/sales',cartController.getAllSales);

export const cartRoutes = router