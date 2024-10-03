import express, { Request, Response } from 'express';
import { PayPalAPI } from '././payment/intraestruture/paypal/PayPalAPI';
import { PaymentService } from '././payment/application/services/PaymentService';
import { Payment } from '././payment/domain/models/Payment';

const app = express();
const port = 3000;

// Configuración de PayPal
const clientId = 'ATrBdypYtXF6qu9yfNfUQRlZXTHz_YxA7EQKNFnQ_Nd4HYEXmb7I7jKtM6azS6E9i6z8PPVY_2uOuic-';
const clientSecret = 'EB1zKNVCeY6ASNzkcm2TeKKUjAqLeJqoYIPSqmZf6Obn8JGTAFvjpDE0fzN5rfh23ZzzSY8eG3PxDHW8';

const paymentProcessor = new PayPalAPI(clientId, clientSecret);
const paymentService = new PaymentService(paymentProcessor);

app.use(express.json());

// Ruta para realizar el pago
app.post('/payment', async (req: Request, res: Response) => {
    const { id, amount, currency, userId } = req.body;
    
    if (!id || !amount || !currency || !userId) {
        return res.status(400).json({ error: 'Faltan parámetros en la solicitud.' });
    }

    const payment = new Payment(id, amount, currency, 'pending', userId);
    
    try {
        const paymentId = await paymentService.executePayment(payment);
        return res.status(200).json({ paymentId, message: 'Pago exitoso' });
    } catch (error) {
        return res.status(500).json({ error: 'Fallo en el procesamiento del pago' });
    }
});

// Inicializar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
