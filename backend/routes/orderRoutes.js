import express from 'express'
import { addOrderItems, getMyOrders, getOrderById } from '../controllers/orderController.js';
import { protect } from "../middleware/authMiddleware.js";
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router()

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, checkObjectId, getOrderById);


export default router;