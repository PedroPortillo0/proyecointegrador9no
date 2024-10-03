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
const express_1 = __importDefault(require("express"));
const PayPalAPI_1 = require("././payment/intraestruture/paypal/PayPalAPI");
const PaymentService_1 = require("././payment/application/services/PaymentService");
const Payment_1 = require("././payment/domain/models/Payment");
const app = express_1.default();
const port = 3000;
// Configuración de PayPal
const clientId = 'ATrBdypYtXF6qu9yfNfUQRlZXTHz_YxA7EQKNFnQ_Nd4HYEXmb7I7jKtM6azS6E9i6z8PPVY_2uOuic-';
const clientSecret = 'EB1zKNVCeY6ASNzkcm2TeKKUjAqLeJqoYIPSqmZf6Obn8JGTAFvjpDE0fzN5rfh23ZzzSY8eG3PxDHW8';
const paymentProcessor = new PayPalAPI_1.PayPalAPI(clientId, clientSecret);
const paymentService = new PaymentService_1.PaymentService(paymentProcessor);
app.use(express_1.default.json());
// Ruta para realizar el pago
app.post('/payment', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { id, amount, currency, userId } = req.body;
    if (!id || !amount || !currency || !userId) {
        return res.status(400).json({ error: 'Faltan parámetros en la solicitud.' });
    }
    const payment = new Payment_1.Payment(id, amount, currency, 'pending', userId);
    try {
        const paymentId = yield paymentService.executePayment(payment);
        return res.status(200).json({ paymentId, message: 'Pago exitoso' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Fallo en el procesamiento del pago' });
    }
}));
// Inicializar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
