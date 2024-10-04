import mercadoPagoClient from '../infraestructure/mercadoPago/MercadoPagoClient';
import { v4 as uuidv4 } from 'uuid';

interface Product {
  id: number;
  title: string;
  description: string;
  unit_price: number;
}

const PRODUCTS: { [key: number]: Product } = {
  1: { id: 1, title: 'Premium Product', description: 'High-end product', unit_price: 50 }
};

interface Item {
  product_id: number;
  quantity?: number;
}

interface MercadoPagoPreference {
  items: Array<{
    title: string;
    description: string;
    unit_price: number;
    quantity: number;
  }>;
  payer: {
    email: string;
  };
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return: 'approved' | 'all';
  external_reference: string;
}

// Función para crear una preferencia de pago
export const createPayment = async (items: Item[], email: string) => {
  const preferenceItems = items.map((item) => {
    // Especificar el tipo de `product`
    const product: Product | undefined = PRODUCTS[item.product_id];
    if (!product) {
      throw new Error(`Product with ID ${item.product_id} does not exist`);
    }
    return {
      title: product.title,
      description: product.description,
      unit_price: product.unit_price,
      quantity: item.quantity || 1,
    };
  });

  const order_id = uuidv4();

  const preferenceData: MercadoPagoPreference = {
    items: preferenceItems,
    payer: { email },
    back_urls: {
      success: 'https://tu-sitio.com/success',
      failure: 'https://tu-sitio.com/failure',
      pending: 'https://tu-sitio.com/pending',
    },
    auto_return: 'approved',
    external_reference: order_id,
  };

  const client = mercadoPagoClient.getClient();

  try {
    const response = await client.preferences.create(preferenceData);
    return {
      id: response.body.id,
      init_point: response.body.init_point,
      external_reference: order_id,
    };
  } catch (error) {
    throw new Error(`Error al crear la preferencia de pago: ${(error as Error).message}`);
  }
};

// Función para obtener el estado de un pago
export const getPaymentStatus = async (paymentId: string) => {
  const client = mercadoPagoClient.getClient();
  try {
    const response = await client.payment.get(Number(paymentId));
    return response.body;
  } catch (error) {
    throw new Error(`Error al obtener el estado del pago: ${(error as Error).message}`);
  }
};
