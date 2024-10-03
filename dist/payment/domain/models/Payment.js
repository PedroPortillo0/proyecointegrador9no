"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Payment {
    constructor(id, amount, currency, status, userId) {
        this.id = id;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
        this.userId = userId;
    }
}
exports.Payment = Payment;
