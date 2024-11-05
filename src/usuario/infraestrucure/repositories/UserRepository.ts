import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserModel } from '../database/UserModel';

export class UserRepository implements IUserRepository {
    public async create(user: User): Promise<User> {
        const createdUser = await UserModel.create({
            id: user.id,
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            password: user.password
        });

        const userData = createdUser.get({ plain: true });
        return new User(
            userData.id,
            userData.uuid,
            userData.name,
            userData.email,
            userData.password
        );
    }

    public async findByUuid(uuid: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { uuid } });
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
            userData.uuid,
            userData.name,
            userData.email,
            userData.password
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
            userData.uuid,
            userData.name,
            userData.email,
            userData.password
        );
    }

    public async update(user: User): Promise<User> {
        await UserModel.update(
            {
                name: user.name,
                email: user.email,
                password: user.password
            },
            { where: { uuid: user.uuid } }
        );
    
        return user;
    }

    public async delete(uuid: string): Promise<void> {
        await UserModel.destroy({ where: { uuid } });
    }

    public async findAll(page: number, limit: number): Promise<{ users: User[], total: number }> {
        const offset = (page - 1) * limit;

        const { rows: users, count: total } = await UserModel.findAndCountAll({
            offset: offset,
            limit: limit,
        });

        const userList = users.map((user) => {
            const userData = user.get({ plain: true });
            return new User(
                userData.id,
                userData.uuid,
                userData.name,
                userData.email,
                userData.password
            );
        });

        return { users: userList, total };
    }
}
