import { getAllPurchases, getPurchaseById, getPurchaseByUserId, getPurchaseByProductId, createPurchase, updatePurchaseById, updatePurchaseByUserId, deletePurchaseById } from '../controllers/purchaseController.js';
import express from 'express';

const router = express.Router();

router.get('/', getAllPurchases);
router.get('/:id', getPurchaseById);
router.get('/user/:user_id', getPurchaseByUserId);
router.get('/product/:product_id', getPurchaseByProductId);
router.post('', createPurchase);
router.put('/:id', updatePurchaseById);
router.put('/user/:user_id', updatePurchaseByUserId);
router.delete('/:id', deletePurchaseById);

export default router;