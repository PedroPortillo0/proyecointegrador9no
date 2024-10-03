import { Payment } from '../models/Payment';

export interface PaymentProcessor {
    processPayment(payment: Payment): Promise<string>;
}
