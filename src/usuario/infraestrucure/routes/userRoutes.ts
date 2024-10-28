import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';
const {  validationResult, check } = require('express-validator'); 

const userRoutes = Router();
const userController = new UserController();


const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        next(); 
    }
};

const validateCreateUser = [
    check('name').notEmpty().withMessage('El nombre es obligatorio'),
    check('email').isEmail().withMessage('Correo electrónico no válido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    handleValidationErrors
];

const validateLoginUser = [
    check('email').isEmail().withMessage('Correo electrónico no válido'),
    check('password').notEmpty().withMessage('La contraseña es obligatoria'),
    handleValidationErrors
];

// Rutas
userRoutes.post('/users', validateCreateUser, (req: Request, res: Response) => userController.createUser(req, res));
userRoutes.post('/users/login', validateLoginUser, (req: Request, res: Response) => userController.loginUser(req, res));

// Rutas con autenticación y sin validación adicional
userRoutes.get('/users/:uuid', authMiddleware, (req: Request, res: Response) => userController.getUserByUuid(req, res));
userRoutes.put('/users/:uuid', authMiddleware, (req: Request, res: Response) => userController.updateUser(req, res));
userRoutes.delete('/users/:uuid', authMiddleware, (req: Request, res: Response) => userController.deleteUser(req, res));
userRoutes.get('/users', (req: Request, res: Response) => userController.getAllUsers(req, res));
userRoutes.get('/users/:uuid/credentials', authMiddleware, (req: Request, res: Response) => userController.getUserCredentials(req, res));

export { userRoutes };
