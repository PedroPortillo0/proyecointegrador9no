import express from 'express';
import paymentRoutes from '././payment/intraestruture/routes/paymentRoutes';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Configurar las rutas de la aplicación
app.use('/api', paymentRoutes);

// Inicializar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
