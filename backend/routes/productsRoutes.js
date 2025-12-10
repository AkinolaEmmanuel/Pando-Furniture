import express from 'express';
import { getAllProducts, getProductById, getProductByCategory, getProductByDiscount, createProduct, updateProductById, searchProduct, deleteProductById, createMultipleProducts } from '../controllers/productController.js';


const router = express.Router();


router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/category/:category', getProductByCategory);
router.get('/discount/:discount', getProductByDiscount);
router.get('/search/:query', searchProduct);
router.post('/', createProduct);
router.post('/multiple', createMultipleProducts);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

export default router;