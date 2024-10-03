import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any; // Ajusta el tipo según la estructura de tu JWT decodificado
        }
    }
}
