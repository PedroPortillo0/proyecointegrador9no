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

    public async getUserById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, email, phoneNumber } = req.body;
        try {
            const updatedUser = await userService.updateUser(id, name, email, phoneNumber);
            return res.json(updatedUser);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await userService.deleteUser(id);
            return res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}
