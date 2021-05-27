import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class PasswordReset extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  key: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
