import { Request, Response } from 'express';
import { AuthService } from '../../aplication/services/AuthService';
import { UserService } from '../../aplication/services/UserService';
import { UserRepository } from '../repositories/UserRepository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userRepository);

export class UserController {
    public async createUser(req: Request, res: Response): Promise<Response> {
        const { name, email, password, phoneNumber } = req.body;
        try {
            const user = await userService.registerUser(name, email, password, phoneNumber);
            return res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }

    public async loginUser(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        try {
            const token = await authService.login(email, password);
            return res.json({ token });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }

    public async getUserByUuid(req: Request, res: Response): Promise<Response> {
        try {
            const uuid = req.params.uuid;
            const user = await userService.getUserByUuid(uuid);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        const { uuid } = req.params;
        const { name, email, phoneNumber } = req.body;
        try {
            const updatedUser = await userService.updateUser(uuid, name, email, phoneNumber);
            return res.json(updatedUser);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const { uuid } = req.params; 
        try {
            await userService.deleteUser(uuid);
            return res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }

    public async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 4;

            const { users, total } = await userService.findAllUsers(page, limit);
            return res.json({ users, total });
        } catch (error) {
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
