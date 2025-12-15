import express from 'express';
import { getAllProducts, getProductById, getProductByCategory, getProductByDiscount, createProduct, updateProductById, searchProduct, deleteProductById, createMultipleProducts } from '../controllers/productController.js';


const router = express.Router();


router.get('/', getAllProducts);
// Specific routes should be defined before the catch-all `/:id` route
router.get('/search', searchProduct);
router.get('/category/:category', getProductByCategory);
router.get('/discount/:discount', getProductByDiscount);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.post('/multiple', createMultipleProducts);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

export default router;