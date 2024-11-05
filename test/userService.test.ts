import { UserService } from '../src/usuario/aplication/services/UserService';
import { User } from '../src/usuario/domain/entities/User';

// Mock del repositorio de usuario
const mockUserRepository = {
    create: jest.fn(async (user: User) => {
        return new User(123, user.uuid, user.name, user.email, user.password);
    }),
    findByUuid: jest.fn(async (uuid: string) => {
        if (uuid === 'uuid-123') {
            return new User(123, 'uuid-123', 'testuser', 'test@example.com', 'hashedpassword');
        }
        return null;
    }),
    update: jest.fn(async (user: User) => {
        return new User(user.id, user.uuid, user.name, user.email, user.password);
    }),
    delete: jest.fn(async (uuid: string) => {
        return;
    }),
    findAll: jest.fn(async (page: number, limit: number) => {
        const users = [
            new User(1, 'uuid-1', 'user1', 'user1@example.com', 'password1'),
            new User(2, 'uuid-2', 'user2', 'user2@example.com', 'password2')
        ];
        return { users, total: users.length };
    }),
    findById: jest.fn(async (id: string) => {
        if (id === '123') {
            return new User(123, 'uuid-123', 'testuser', 'test@example.com', 'hashedpassword');
        }
        return null;
    }),
    findByEmail: jest.fn(async (email: string) => {
        if (email === 'test@example.com') {
            return new User(123, 'uuid-123', 'testuser', 'test@example.com', 'hashedpassword');
        }
        return null;
    })
};

// Pruebas de UserService
describe('UserService', () => {
    let userService: UserService;

    // Inicializa el servicio antes de cada prueba
    beforeEach(() => {
        userService = new UserService(mockUserRepository);
    });

    it('should create a user', async () => {
        const user = await userService.registerUser('testuser', 'test@example.com', 'password');

        // Verifica que el usuario fue creado correctamente
        expect(user).toBeDefined();
        expect(user.email).toBe('test@example.com');
        expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
    });
});
