import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './usuario/infraestrucure/database'; 
import { userRoutes } from './usuario/infraestrucure/routes/userRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 
app.use(express.json());
app.use('/api/v1/', userRoutes); 


(async () => {
    await connectToDatabase(); 
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})();
