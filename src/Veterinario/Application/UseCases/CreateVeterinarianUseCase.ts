import { VeterinarianRepository } from '../../Domain/Repositories/VeterinarianRepository';
import { Veterinarian } from '../../Domain/entities/Veterinarian';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import s3Client from '../../../Config/awsConfig';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { fromBuffer } from 'file-type';

export class VeterinarianService {
    constructor(private veterinarianRepository: VeterinarianRepository) {}

    public async registerVeterinarian(data: Omit<Veterinarian, 'id' | 'uuid' | 'createdAt'>): Promise<Veterinarian> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const veterinarian = new Veterinarian(
            null,
            uuidv4(),
            data.lastName,
            data.email,
            hashedPassword,
            data.location,
            new Date()
        );

        if (!veterinarian.validateEmail()) {
            throw new Error('Formato de correo electrónico no válido');
        }

        return this.veterinarianRepository.create(veterinarian);
    }

    // Nuevo método para subir la imagen de la licencia a S3
    public async uploadLicenseImage(imageBuffer: Buffer): Promise<string> {
        // Validación de tipo de imagen
        const fileType = await fromBuffer(imageBuffer);
        if (!fileType || !['image/jpeg', 'image/png'].includes(fileType.mime)) {
            throw new Error('Archivo inválido. Solo se permiten imágenes JPEG y PNG.');
        }

        // Generación de un nombre único para la imagen
        const fileName = `license_${uuidv4()}.jpg`;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `veterinarians/${fileName}`,
            Body: imageBuffer,
            ContentType: fileType.mime,
        };

        // Subida de la imagen a S3
        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        // Retorna la URL de la imagen
        return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/veterinarians/${fileName}`;
    }

    public async getVeterinarianById(id: number): Promise<Veterinarian | null> {
        return this.veterinarianRepository.findById(id);
    }

    public async getVeterinarianByUuid(uuid: string): Promise<Veterinarian | null> {
        return this.veterinarianRepository.findByUuid(uuid);
    }

    public async updateVeterinarian(uuid: string, data: Partial<Omit<Veterinarian, 'id' | 'uuid' | 'createdAt'>>): Promise<Veterinarian | null> {
        const veterinarian = await this.veterinarianRepository.findByUuid(uuid);
        if (!veterinarian) {
            throw new Error('Veterinario no encontrado');
        }

        if (data.lastName) veterinarian.lastName = data.lastName;
        if (data.email) {
            veterinarian.email = data.email;
            if (!veterinarian.validateEmail()) {
                throw new Error('Formato de correo electrónico no válido');
            }
        }
        if (data.password) {
            veterinarian.password = await bcrypt.hash(data.password, 10);
        }
        if (data.location) veterinarian.location = data.location;

        return this.veterinarianRepository.update(veterinarian);
    }

    public async deleteVeterinarian(uuid: string): Promise<void> {
        const veterinarian = await this.veterinarianRepository.findByUuid(uuid);
        if (!veterinarian) {
            throw new Error('Veterinario no encontrado');
        }

        await this.veterinarianRepository.delete(uuid);
    }

    public async getAllVeterinarians(page: number, limit: number): Promise<{ veterinarians: Veterinarian[], total: number }> {
        return this.veterinarianRepository.findAll(page, limit);
    }
}
