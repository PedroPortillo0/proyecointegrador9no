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
        const newUser = await this.userRepository.create(user);
    
        return newUser;
    }

    public async getUserByUuid(uuid: string): Promise<User | null> {
        return await this.userRepository.findByUuid(uuid);
    }

    public async updateUser(uuid: string, updateData: { name?: string; email?: string; password?: string; phoneNumber?: string }): Promise<User> {
        const user = await this.userRepository.findByUuid(uuid);
        if (!user) throw new Error('User not found');
        
        if (updateData.name) user.name = updateData.name;
        if (updateData.email) {
            user.email = updateData.email;
            if (!user.validateEmail()) {
                throw new Error('Invalid email format');
            }
        }
        if (updateData.password) {
            const hashedPassword = await bcrypt.hash(updateData.password, 10);
            user.password = hashedPassword;
        }
        if (updateData.phoneNumber) user.phoneNumber = updateData.phoneNumber;
        
        return await this.userRepository.update(user);
    }

    public async deleteUser(uuid: string): Promise<void> {
        await this.userRepository.delete(uuid);
    }

    public async findAllUsers(page: number, limit: number): Promise<{ users: User[], total: number }> {
        return await this.userRepository.findAll(page, limit);
    }
}
