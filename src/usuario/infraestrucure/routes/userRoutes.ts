import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRoutes  = Router();
const userController = new UserController();

userRoutes .post('/users', userController.createUser);
userRoutes .post('/users/login', userController.loginUser);
userRoutes .get('/users/:uuid', authMiddleware, userController.getUserByUuid);
userRoutes .put('/users/:uuid', authMiddleware, userController.updateUser);
userRoutes .delete('/users/:uuid', authMiddleware, userController.deleteUser);
userRoutes.get('/users', userController.getAllUsers);
userRoutes.get('/users/:uuid/credentials', authMiddleware, userController.getUserCredentials);



export { userRoutes} ;
