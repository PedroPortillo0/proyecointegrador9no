"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class PayPalAPI {
    constructor(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    processPayment(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            const authResponse = yield axios_1.default.post('https://api.sandbox.paypal.com/v1/oauth2/token', 'grant_type=client_credentials', {
                auth: {
                    username: this.clientId,
                    password: this.clientSecret,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const accessToken = authResponse.data.access_token;
            const paymentResponse = yield axios_1.default.post('https://api.sandbox.paypal.com/v1/payments/payment', {
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
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return paymentResponse.data.id;
        });
    }
}
exports.PayPalAPI = PayPalAPI;
