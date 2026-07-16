import express from 'express';
import { 
  listPurchaseOrders, 
  getPurchaseOrderById, 
  createPurchaseOrder, 
  approvePurchaseOrder, 
  receivePurchaseOrder 
} from '../controllers/poController.js';

const router = express.Router();

router.get('/', listPurchaseOrders);
router.get('/:id', getPurchaseOrderById);
router.post('/', createPurchaseOrder);
router.post('/:id/approve', approvePurchaseOrder);
router.post('/:id/receive', receivePurchaseOrder);

export default router;
