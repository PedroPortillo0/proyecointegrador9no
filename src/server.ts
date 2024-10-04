import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './usuario/infraestrucure/database'; 
import { userRoutes } from './usuario/infraestrucure/routes/userRoutes';
import paymentRoutes from './payment/infraestructure/routes/paymentRoutes';
import { whatsappRouter } from './WhatsApp/infrestructure/routes/whatsappRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());

app.use('/api/v1/', userRoutes);
app.use('/api/v1/paymentRoutes', paymentRoutes);
app.use('/api/v1/whatsapp', whatsappRouter); 

(async () => {
    await connectToDatabase(); 
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})();
