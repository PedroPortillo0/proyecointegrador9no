import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql', 
        logging: false,   
    }
);


export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente con la base de datos MySQL.');
        await sequelize.sync({ alter: true });
        console.log('Base de datos sincronizada correctamente.');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};
