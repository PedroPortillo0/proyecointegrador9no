import { v4 as uuidv4 } from 'uuid';

export class User {
    constructor(
        public readonly id: string = uuidv4(), // Genera un UUID automáticamente si no se proporciona uno
        public name: string,
        public email: string,
        public password: string,
        public phoneNumber: string
    ) {}

    public validateEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
}
