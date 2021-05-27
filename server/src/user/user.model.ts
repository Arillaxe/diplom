import * as crypto from 'crypto';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Role } from '../roles/role.enum';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  contractNumber: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.DATE,
  })
  lastSignIn: Date;

  @Column({
    type: DataType.ARRAY(DataType.ENUM('student', 'comendant', 'dekanat', 'admin')),
    allowNull: false,
    defaultValue: ['student'],
  })
  roles: Role[];

  @Column({
    type: DataType.STRING,
  })
  passwordSalt: string;

  @Column({
    type: DataType.STRING(1024),
  })
  passwordHash: string;

  private async encryptPassword(password: string): Promise<string> {
    const encrypted: Buffer = await new Promise((res, rej) => {
      crypto.pbkdf2(password, this.passwordSalt, 10000, 512, 'sha512', (err, hashed) => {
        if (err) {
          rej(err);
        } else {
          res(hashed);
        }
      })
      });

      return encrypted.toString('hex');
  }

  async setPassword(password) {
    this.passwordSalt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = await this.encryptPassword(password);
  }

  async validatePassword(password: string) {
    const encrypted = await this.encryptPassword(password);

    return this.passwordHash === encrypted;
  }

  toAuthJSON() {
    return { 
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      surname: this.surname,
      contractNumber: this.contractNumber,
      phone: this.phone,
      email: this.email,
      lastSignIn: this.lastSignIn,
      roles: this.roles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
