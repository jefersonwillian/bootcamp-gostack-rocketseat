import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async user => {
            console.log('\n \n \n user', user);
            if (user.password) {
                console.log('\n \nTCL: User -> init -> user', user);
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
