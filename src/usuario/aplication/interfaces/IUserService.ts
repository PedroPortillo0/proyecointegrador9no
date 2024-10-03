import { User } from '../../domain/entities/User';

export interface IUserService {
    registerUser(name: string, email: string, password: string, phoneNumber: string): Promise<User>;
    getUserById(id: string): Promise<User | null>;
    updateUser(id: string, name: string, email: string, phoneNumber: string): Promise<User>;
    deleteUser(id: string): Promise<void>;
}
