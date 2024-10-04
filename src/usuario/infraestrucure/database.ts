import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a MySQL usando variables de entorno
export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql', // Usamos MySQL como el dialecto de Sequelize
        logging: false,   // Cambia a `true` si deseas ver las consultas SQL
    }
);

// Función para conectar y crear la base de datos si no existe
export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente con la base de datos MySQL.');

        // Sincroniza los modelos con la base de datos
        await sequelize.sync({ alter: true });
        console.log('Base de datos sincronizada correctamente.');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};
