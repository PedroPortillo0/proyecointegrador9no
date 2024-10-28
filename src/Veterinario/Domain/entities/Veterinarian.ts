export class Veterinarian {
    constructor(
        public id: number | null,
        public uuid: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public location?: string,
        public licenseImage?: string, // Cambia Buffer a string para almacenar la URL
        public createdAt?: Date
    ) {}

    // Método para validar el formato de email
    validateEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
}
