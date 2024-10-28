// fileScanner.ts
import dotenv from 'dotenv';

dotenv.config();

const VIRUSTOTAL_API_KEY = process.env.VIRUSTOTAL_API_KEY;

export const scanFileForViruses = async (fileBuffer: Buffer): Promise<boolean> => {
    console.log("Validación de VirusTotal omitida para pruebas.");
    return true; // Siempre retorna true para omitir la validación
};
