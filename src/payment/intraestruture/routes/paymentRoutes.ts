import { Router } from 'express';
import { processPayment } from '../controllers/PaymentController';

const router = Router();

// Define la ruta para procesar el pago
router.post('/payment', processPayment);

export default router;
