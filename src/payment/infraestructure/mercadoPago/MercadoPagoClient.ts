import mercadopago from 'mercadopago';
import dotenv from 'dotenv';
import { PaymentRepository } from '../../domain/PaymentRepository';

dotenv.config();

export class MercadoPagoClient implements PaymentRepository {
  constructor() {
    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
    });
  }

  async createPayment(paymentData: any) {
    const response = await mercadopago.preferences.create(paymentData);
    return {
      id: response.body.id,
      init_point: response.body.init_point,
      external_reference: paymentData.external_reference,
    };
  }

  async getPaymentStatus(paymentId: string) {
    const response = await mercadopago.payment.get(Number(paymentId));
    return response.body;
  }
}

export const mercadoPagoClient = new MercadoPagoClient();
