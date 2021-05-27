import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Room extends Model {
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  room: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  place: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId?: number; 
}
