import { Sequelize } from 'sequelize-typescript';
import { Room } from '../room/room.model';
import { User } from '../user/user.model';
import { PasswordReset } from '../auth/passwordReset.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });

      sequelize.addModels([Room, User, PasswordReset]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
