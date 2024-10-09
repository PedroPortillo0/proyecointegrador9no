export interface CreatePaymentData {
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
  