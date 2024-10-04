import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRoutes  = Router();
const userController = new UserController();

userRoutes .post('/users', userController.createUser);
userRoutes .post('/users/login', userController.loginUser);
userRoutes .get('/users/:id', authMiddleware, userController.getUserById);
userRoutes .put('/users/:id', authMiddleware, userController.updateUser);
userRoutes .delete('/users/:id', authMiddleware, userController.deleteUser);

export { userRoutes} ;
