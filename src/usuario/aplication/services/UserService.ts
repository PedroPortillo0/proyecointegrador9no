import { IUserService } from '../interfaces/IUserService';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {}

    public async registerUser(name: string, email: string, password: string, phoneNumber: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(null, uuidv4(), name, email, hashedPassword, phoneNumber);
        
        if (!user.validateEmail()) {
            throw new Error('Invalid email format');
        }
        
        return await this.userRepository.create(user);
    }

    public async getUserById(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    public async updateUser(id: string, name: string, email: string, phoneNumber: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new Error('User not found');
        
        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        
        return await this.userRepository.update(user);
    }

    public async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
