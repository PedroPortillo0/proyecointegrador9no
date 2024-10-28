import { VeterinarianRepository } from '../../Domain/Repositories/VeterinarianRepository';
import { Veterinarian } from '../../Domain/entities/Veterinarian';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import s3Client from '../../../Config/awsConfig'; 
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { fromBuffer } from 'file-type';

// Validación de imagen
const validateImage = async (buffer: Buffer) => {
    const fileType = await fromBuffer(buffer);
    if (!fileType || !['image/jpeg', 'image/png'].includes(fileType.mime)) {
        throw new Error('Archivo inválido. Solo se permiten imágenes JPEG y PNG.');
    }
};

// Subida de imagen a S3
const uploadImageToS3 = async (imageBuffer: Buffer, fileName: string) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `veterinarians/${fileName}`,
        Body: imageBuffer,
        ContentType: 'image/jpeg'
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/veterinarians/${fileName}`; // Retorna la URL
};

// Eliminación de imagen en S3
const deleteImageFromS3 = async (fileName: string) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `veterinarians/${fileName}`,
    };
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
};

export class VeterinarianService {
    constructor(private veterinarianRepository: VeterinarianRepository) {}

    public async registerVeterinarian(data: Omit<Veterinarian, 'id' | 'uuid' | 'createdAt'>): Promise<Veterinarian> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        let imageUrl = '';

        if (data.licenseImage) {
            const imageBuffer = Buffer.isBuffer(data.licenseImage) 
                ? data.licenseImage 
                : Buffer.from(data.licenseImage, 'base64');
            await validateImage(imageBuffer);
            imageUrl = await uploadImageToS3(imageBuffer, `license_${uuidv4()}.jpg`);
        }

        const veterinarian = new Veterinarian(
            null,
            uuidv4(),
            data.firstName,
            data.lastName,
            data.email,
            hashedPassword,
            data.location,
            imageUrl
        );

        if (!veterinarian.validateEmail()) {
            throw new Error('Invalid email format');
        }

        return this.veterinarianRepository.create(veterinarian);
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
            throw new Error('Veterinarian not found');
        }

        if (data.licenseImage) {
            const imageBuffer = Buffer.isBuffer(data.licenseImage) 
                ? data.licenseImage 
                : Buffer.from(data.licenseImage, 'base64');
            await validateImage(imageBuffer);
            veterinarian.licenseImage = await uploadImageToS3(imageBuffer, `license_${uuidv4()}.jpg`);
        }

        if (data.firstName) veterinarian.firstName = data.firstName;
        if (data.lastName) veterinarian.lastName = data.lastName;
        if (data.email) {
            veterinarian.email = data.email;
            if (!veterinarian.validateEmail()) {
                throw new Error('Invalid email format');
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
            throw new Error('Veterinarian not found');
        }

        if (veterinarian.licenseImage) {
            const fileName = veterinarian.licenseImage.split('/').pop();
            if (fileName) {
                await deleteImageFromS3(fileName);
            }
        }

        await this.veterinarianRepository.delete(uuid);
    }

    public async getAllVeterinarians(page: number, limit: number): Promise<{ veterinarians: Veterinarian[], total: number }> {
        return this.veterinarianRepository.findAll(page, limit);
    }
}
