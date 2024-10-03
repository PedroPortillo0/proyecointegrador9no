import { Payment } from '../../domain/models/Payment';
import { PaymentProcessor } from '../../domain/services/PaymentProcessor';

export class PaymentService {
    constructor(private paymentProcessor: PaymentProcessor) {}

    async executePayment(payment: Payment): Promise<string> {
        return await this.paymentProcessor.processPayment(payment);
    }
}
