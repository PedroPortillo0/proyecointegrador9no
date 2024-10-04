import { User } from '../../domain/entities/User';

export interface IUserService {
    registerUser(name: string, email: string, password: string, phoneNumber: string): Promise<User>;
    getUserByUuid(uuid: string): Promise<User | null>;
    updateUser(uuid: string, updateData: { name?: string; email?: string; password?: string; phoneNumber?: string }): Promise<User>;
    deleteUser(uuid: string): Promise<void>;
    findAllUsers(page: number, limit: number): Promise<{ users: User[], total: number }>;
}
