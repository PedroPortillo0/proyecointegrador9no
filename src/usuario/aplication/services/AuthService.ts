import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class AuthService {
    constructor(private userRepository: IUserRepository) {}

    public async login(email: string, password: string): Promise<string | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error('User not found');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid password');

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return token;
    }

    public verifyToken(token: string): any {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
