import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserModel } from '../database/UserModel';

export class UserRepository implements IUserRepository {
    public async create(user: User): Promise<User> {
        const createdUser = await UserModel.create({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
        });

        const userData = createdUser.get({ plain: true });
        return new User(
            userData.id,
            userData.name,
            userData.email,
            userData.password,
            userData.phoneNumber
        );
    }

    public async findById(id: string): Promise<User | null> {
        const user = await UserModel.findByPk(id);
        if (!user) {
            return null;
        }

        const userData = user.get({ plain: true });
        return new User(
            userData.id,
            userData.name,
            userData.email,
            userData.password,
            userData.phoneNumber
        );
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return null;
        }

        const userData = user.get({ plain: true });
        return new User(
            userData.id,
            userData.name,
            userData.email,
            userData.password,
            userData.phoneNumber
        );
    }

    public async update(user: User): Promise<User> {
        await UserModel.update(
            {
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
            { where: { id: user.id } }
        );

        return user;
    }

    public async delete(id: string): Promise<void> {
        await UserModel.destroy({ where: { id } });
    }
}
