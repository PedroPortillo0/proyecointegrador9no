import mercadopago from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

class MercadoPagoClient {
  constructor() {
    // Configurar el Access Token de Mercado Pago utilizando el .env
    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
    });
  }

  getClient() {
    return mercadopago;
  }
}

export default new MercadoPagoClient();
