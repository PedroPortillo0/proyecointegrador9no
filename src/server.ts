import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './usuario/infraestrucure/database'; 
import { userRoutes } from './usuario/infraestrucure/routes/userRoutes';
import paymentRoutes from './payment/infraestructure/routes/paymentRoutes';
import { whatsappRouter } from './WhatsApp/infrestructure/routes/whatsappRouter'; // Importar las rutas de WhatsApp

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/v1/', userRoutes);
app.use('/api/v1/paymentRoutes', paymentRoutes);
app.use('/api/v1/whatsapp', whatsappRouter); // Agregar las rutas de WhatsApp

// Iniciar la conexión a la base de datos y el servidor
(async () => {
    await connectToDatabase(); 
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})();
