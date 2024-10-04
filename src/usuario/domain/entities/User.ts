import { v4 as uuidv4 } from 'uuid';

export class User {
    constructor(
        public id: number | null = null,   
        public uuid: string = uuidv4(), 
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
