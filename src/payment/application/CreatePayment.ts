import { PaymentRepository } from '../domain/PaymentRepository';
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

export class CreatePayment {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(items: Item[], email: string) {
    const preferenceItems = items.map((item) => {
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
    const paymentData = {
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

    return this.paymentRepository.createPayment(paymentData);
  }
}