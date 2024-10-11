import { UserService } from '../src/usuario/aplication/services/UserService';
import { User } from '../src/usuario/domain/entities/User';
import { jest } from '@jest/globals';

const mockUserRepository = {
    create: jest.fn(async (user: User) => {
        return new User(123, user.uuid, user.name, user.email, user.password, user.phoneNumber);
    }),
    findByUuid: jest.fn(async (uuid: string) => {
        if (uuid === 'uuid-123') {
            return new User(123, 'uuid-123', 'testuser', 'test@example.com', 'hashedpassword', '1234567890');
        }
        return null;
    }),
    update: jest.fn(async (user: User) => {
        return new User(user.id, user.uuid, user.name, user.email, user.password, user.phoneNumber);
    }),
    delete: jest.fn(async (uuid: string) => {
        return;
    }),
    findAll: jest.fn(async (page: number, limit: number) => {
        const users = [
            new User(1, 'uuid-1', 'user1', 'user1@example.com', 'password1', '1234567890'),
            new User(2, 'uuid-2', 'user2', 'user2@example.com', 'password2', '0987654321')
        ];
        return { users, total: users.length };
    }),
    findById: jest.fn(async (id: string) => {
        if (id === '123') {
            return new User(123, 'uuid-123', 'testuser', 'test@example.com', 'hashedpassword', '1234567890');
        }
        return null;
    }),
    findByEmail: jest.fn(async (email: string) => {
        if (email === 'test@example.com') {
            return new User(123, 'uuid-123', 'testuser', 'test@example.com', 'hashedpassword', '1234567890');
        }
        return null;
    })
};


describe('UserService', () => {
    it('should create a user', async () => {
        const userService = new UserService(mockUserRepository);
        const user = await userService.registerUser('testuser', 'test@example.com', 'password', '1234567890');

        expect(user).toBeDefined();
        expect(user.email).toBe('test@example.com');
        expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
    });
});
