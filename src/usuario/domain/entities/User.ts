export class User {
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public password: string,
        public phoneNumber: string // Nuevo atributo
    ) {}

    public validateEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
}
