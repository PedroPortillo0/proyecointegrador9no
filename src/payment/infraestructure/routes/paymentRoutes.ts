import express from 'express';
import { PaymentController } from '../controllers/PaymentController';

const router = express.Router();

router.post('/create-payment', PaymentController.createPayment);
router.get('/payment-status/:id', PaymentController.getPaymentStatus);

export default router;
