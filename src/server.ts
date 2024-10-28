import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { connectToDatabase } from './usuario/infraestrucure/database'; 
import { userRoutes } from './usuario/infraestrucure/routes/userRoutes';
import veterinarianRoutes from './Veterinario/Infraestructure/Routes/veterinarianRoutes'; // Importa la ruta de veterinario

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors({
    origin: '*', // Permitir todos los orígenes (en producción especifica el dominio)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

// Configuración de limitador de peticiones
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 solicitudes por IP cada 15 minutos
    message: {
        error: 'Demasiadas peticiones desde esta IP. Por favor intenta de nuevo después de 15 minutos.'
    }
});

// Aplica el limitador a todas las solicitudes
app.use(limiter);

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/veterinarians', veterinarianRoutes); // Agrega la ruta de veterinario

// Middleware de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack); // Muestra el error en la consola
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: {
            message: err.message || 'Error Interno del Servidor',
            status: statusCode
        }
    });
});

// Conexión a la base de datos y inicio del servidor
(async () => {
    await connectToDatabase(); 
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})();
