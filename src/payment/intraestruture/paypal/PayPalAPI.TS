import axios from 'axios';
import { Payment } from '../../domain/models/Payment';
import { PaymentProcessor } from '../../domain/services/PaymentProcessor';

export class PayPalAPI implements PaymentProcessor {
    private clientId: string;
    private clientSecret: string;

    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    async processPayment(payment: Payment): Promise<string> {
        const authResponse = await axios.post(
            'https://api.sandbox.paypal.com/v1/oauth2/token',
            'grant_type=client_credentials',
            {
                auth: {
                    username: this.clientId,
                    password: this.clientSecret,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const accessToken = authResponse.data.access_token;

        const paymentResponse = await axios.post(
            'https://api.sandbox.paypal.com/v1/payments/payment',
            {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal',
                },
                transactions: [
                    {
                        amount: {
                            total: payment.amount,
                            currency: payment.currency,
                        },
                    },
                ],
                redirect_urls: {
                    return_url: 'https://your-redirect-url.com',
                    cancel_url: 'https://your-cancel-url.com',
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return paymentResponse.data.id;
    }
}
