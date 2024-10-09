import { Request, Response } from 'express';
import { CreatePayment } from '../../application/CreatePayment';
import { mercadoPagoClient } from '../mercadoPago/MercadoPagoClient';

const createPaymentUseCase = new CreatePayment(mercadoPagoClient);

export class PaymentController {
  static async createPayment(req: Request, res: Response) {
    try {
      const { items, email } = req.body;
      const paymentResponse = await createPaymentUseCase.execute(items, email);
      res.status(200).json(paymentResponse);
    } catch (error) {
      console.error('Error al crear el pago:', error);
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Error desconocido' });
    }
  }

  static async getPaymentStatus(req: Request, res: Response) {
    try {
      const paymentId = req.params.id;
      const paymentStatus = await mercadoPagoClient.getPaymentStatus(paymentId);
      res.status(200).json(paymentStatus);
    } catch (error) {
      console.error('Error al obtener el estado del pago:', error);
      res.status(500).json({ error: (error instanceof Error) ? error.message : 'Error desconocido' });
    }
  }
}
