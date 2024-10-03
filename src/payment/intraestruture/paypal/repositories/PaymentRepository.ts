import { Payment } from '../../../domain/models/Payment';

export class PaymentRepository {
    async save(payment: Payment): Promise<void> {
        // Implementa la lógica para guardar el pago en la base de datos
    }
}
