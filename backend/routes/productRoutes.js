import express from 'express'
import { getProducts, getServices } from '../controllers/productController.js';
const router = express.Router()

router.route('/').get(getProducts);
router.route('/services').get(getServices);

export default router;