import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './usuario/infraestrucure/database'; // Importa la configuración de la base de datos
import { userRoutes } from './usuario/infraestrucure/routes/userRoutes';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Usar el puerto definido en .env o el 3000 por defecto

app.use(express.json());
app.use('/api/v1/', userRoutes); // Configura tus rutas de usuarios

// Iniciar la conexión con la base de datos y el servidor
(async () => {
    await connectToDatabase(); // Conectar y sincronizar la base de datos
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})();
