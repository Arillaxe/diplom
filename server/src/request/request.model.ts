import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Request extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hostel: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  floor: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  room: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  place: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;
}
