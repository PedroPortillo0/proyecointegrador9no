import { User } from '../entities/User';

export interface IUserRepository {
    create(user: User): Promise<User>;
    findByUuid(uuid: string): Promise<User | null>; 
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(user: User): Promise<User>;
    delete(uuid: string): Promise<void>;
    findAll(page: number, limit: number): Promise<{ users: User[], total: number }>;
}
