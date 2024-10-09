export interface PaymentRepository {
    createPayment(paymentData: any): Promise<any>;
    getPaymentStatus(paymentId: string): Promise<any>;
  }
  