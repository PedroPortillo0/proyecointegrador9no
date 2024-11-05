import { VeterinarianRepository } from '../../Domain/Repositories/VeterinarianRepository';
import { Veterinarian } from '../../Domain/entities/Veterinarian';
import { sequelize as db } from '../../../Config/Db';
import { QueryTypes } from 'sequelize';

export class MySQLVeterinarianRepository implements VeterinarianRepository {
    public async create(veterinarian: Veterinarian): Promise<Veterinarian> {
        await db.query(
            `INSERT INTO veterinarians (uuid, lastName, email, password, location, createdAt)
            VALUES (?, ?, ?, ?, ?, ?)`,
            {
                replacements: [
                    veterinarian.uuid,
                    veterinarian.lastName,
                    veterinarian.email,
                    veterinarian.password,
                    veterinarian.location,
                    veterinarian.createdAt || new Date(),
                ],
                type: QueryTypes.INSERT,
            }
        );
        return veterinarian;
    }

    public async findByUuid(uuid: string): Promise<Veterinarian | null> {
        const [rows] = await db.query(
            `SELECT * FROM veterinarians WHERE uuid = ?`,
            {
                replacements: [uuid],
                type: QueryTypes.SELECT,
            }
        );

        const veterinarians = rows as any[];
        if (veterinarians.length === 0) return null;

        const vet = veterinarians[0];
        return new Veterinarian(
            vet.id,
            vet.uuid,
            vet.lastName,
            vet.email,
            vet.password,
            vet.location,
            vet.createdAt
        );
    }

    public async findById(id: number): Promise<Veterinarian | null> {
        const [rows] = await db.query(
            `SELECT * FROM veterinarians WHERE id = ?`,
            {
                replacements: [id],
                type: QueryTypes.SELECT,
            }
        );

        const veterinarians = rows as any[];
        if (veterinarians.length === 0) return null;

        const vet = veterinarians[0];
        return new Veterinarian(
            vet.id,
            vet.uuid,
            vet.lastName,
            vet.email,
            vet.password,
            vet.location,
            vet.createdAt
        );
    }

    public async findAll(page: number, limit: number): Promise<{ veterinarians: Veterinarian[], total: number }> {
        const offset = (page - 1) * limit;

        const [rows] = await db.query(
            `SELECT * FROM veterinarians LIMIT ? OFFSET ?`,
            {
                replacements: [limit, offset],
                type: QueryTypes.SELECT,
            }
        );

        const [countResult] = await db.query(
            `SELECT COUNT(*) as total FROM veterinarians`,
            { type: QueryTypes.SELECT }
        );

        const veterinarians = (rows as any[]).map((vet) =>
            new Veterinarian(
                vet.id,
                vet.uuid,
                vet.lastName,
                vet.email,
                vet.password,
                vet.location,
                vet.createdAt
            )
        );

        const total = (countResult as any[])[0].total;
        return { veterinarians, total };
    }

    public async update(veterinarian: Veterinarian): Promise<Veterinarian | null> {
        await db.query(
            `UPDATE veterinarians SET lastName = ?, email = ?, password = ?, location = ?
            WHERE uuid = ?`,
            {
                replacements: [
                    veterinarian.lastName,
                    veterinarian.email,
                    veterinarian.password,
                    veterinarian.location,
                    veterinarian.uuid,
                ],
                type: QueryTypes.UPDATE,
            }
        );

        return veterinarian;
    }

    public async delete(uuid: string): Promise<void> {
        await db.query(
            `DELETE FROM veterinarians WHERE uuid = ?`,
            {
                replacements: [uuid],
                type: QueryTypes.DELETE,
            }
        );
    }
}
