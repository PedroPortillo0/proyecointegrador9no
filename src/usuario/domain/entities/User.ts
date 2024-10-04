import { v4 as uuidv4 } from 'uuid';

export class User {
    constructor(
        public id: number | null = null,   // Ajuste para incluir el campo `id` (autoincremental)
        public uuid: string = uuidv4(),    // Campo `uuid`
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
