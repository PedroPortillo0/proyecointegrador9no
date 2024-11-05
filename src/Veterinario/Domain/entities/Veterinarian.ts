export class Veterinarian {
    constructor(
        public id: number | null,
        public uuid: string,
        public lastName: string,
        public email: string,
        public password: string,
        public location?: string,
        public createdAt?: Date
    ) {}

    // Método para validar el formato de email
    validateEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
}
