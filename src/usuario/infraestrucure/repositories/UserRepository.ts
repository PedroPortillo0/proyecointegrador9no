import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserModel } from '../database/UserModel';

export class UserRepository implements IUserRepository {
    public async create(user: User): Promise<User> {
        try {
            const createdUser = await UserModel.create({
                id: user.id, // `User` ya maneja la generación del UUID
                name: user.name,
                email: user.email,
                password: user.password,
                phoneNumber: user.phoneNumber,
            });

            const userData = createdUser.get({ plain: true });
            return new User(
                userData.id,      // `id` autoincremental desde la base de datos
                userData.uuid,    // `uuid`
                userData.name,
                userData.email,
                userData.password,
                userData.phoneNumber
            );
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating user: ${error.message}`);
            }
            throw new Error('An unknown error occurred while creating user');
        }
    }

    public async findById(id: string): Promise<User | null> {
        try {
            const user = await UserModel.findByPk(id);
            if (!user) {
                return null;
            }

            const userData = user.get({ plain: true });
            return new User(
                userData.id,      // `id` autoincremental desde la base de datos
                userData.uuid,    // `uuid`
                userData.name,
                userData.email,
                userData.password,
                userData.phoneNumber
            );
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error finding user by ID: ${error.message}`);
            }
            throw new Error('An unknown error occurred while finding user by ID');
        }
    }

    public async findByEmail(email: string): Promise<User | null> {
        try {
            const user = await UserModel.findOne({ where: { email } });
            if (!user) {
                return null;
            }

            const userData = user.get({ plain: true });
            return new User(
                userData.id,
                userData.uuid,
                userData.name,
                userData.email,
                userData.password,
                userData.phoneNumber
            );
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error finding user by email: ${error.message}`);
            }
            throw new Error('An unknown error occurred while finding user by email');
        }
    }

    public async update(user: User): Promise<User> {
        try {
            await UserModel.update(
                {
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                },
                { where: { id: user.id } }
            );

            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
            throw new Error('An unknown error occurred while updating user');
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            await UserModel.destroy({ where: { id } });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error deleting user: ${error.message}`);
            }
            throw new Error('An unknown error occurred while deleting user');
        }
    }
}
