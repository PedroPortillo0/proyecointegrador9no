import { Request, Response } from 'express';
import { PaymentService } from '../../application/services/PaymentService';
import { PayPalAPI } from '../paypal/PayPalAPI';
import { Payment } from '../../domain/models/Payment';
import twilio from 'twilio';

// Cargar las variables de entorno
const clientId = process.env.PAYPAL_CLIENT_ID!;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
const paymentProcessor = new PayPalAPI(clientId, clientSecret);
const paymentService = new PaymentService(paymentProcessor);

// Configuración de Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioClient = twilio(accountSid, authToken);
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER!;

// Controlador de pago
export const processPayment = async (req: Request, res: Response) => {
    const { amount, currency, userId, userPhoneNumber } = req.body;

    if (!amount || !currency || !userId || !userPhoneNumber) {
        return res.status(400).json({ error: 'Faltan parámetros en la solicitud.' });
    }

    const payment = new Payment('1', amount, currency, 'pending', userId);

    try {
        // Procesar el pago utilizando el servicio de PayPal
        const paymentId = await paymentService.executePayment(payment);

        // Enviar notificación por WhatsApp
        await twilioClient.messages.create({
            body: `¡Hola! Tu pago de ${currency} ${amount} ha sido procesado correctamente. ID de pago: ${paymentId}`,
            from: twilioWhatsAppNumber,
            to: `whatsapp:${userPhoneNumber}`
        });

        return res.status(200).json({ paymentId, message: 'Pago exitoso y notificación enviada por WhatsApp.' });
    } catch (error) {
        return res.status(500).json({ error: 'Error en el procesamiento del pago', details: error });
    }
};
