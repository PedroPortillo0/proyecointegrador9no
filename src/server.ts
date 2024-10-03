import express from 'express';
import userRoutes from './usuario/infraestrucure//routes/userRoutes';
import dotenv from 'dotenv';
import { sequelize } from './usuario/infraestrucure/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Conectar a la base de datos
sequelize.sync().then(() => {
    console.log('Database connected');
});

// Registrar las rutas
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
