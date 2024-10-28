
import { Veterinarian } from '../entities/Veterinarian';

export interface VeterinarianRepository {
    create(veterinarian: Veterinarian): Promise<Veterinarian>;
    findById(id: number): Promise<Veterinarian | null>;
    findByUuid(uuid: string): Promise<Veterinarian | null>;
    findAll(page: number, limit: number): Promise<{ veterinarians: Veterinarian[], total: number }>;
    update(veterinarian: Veterinarian): Promise<Veterinarian | null>;
    delete(uuid: string): Promise<void>;
}
