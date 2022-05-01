'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../instances/mysql';
import { User } from './user';

export interface IComputer extends Model {
  id: BigInteger;
  brand: string;
  model: string;
  serial_number: string;
  warranty_end: Date;
  patrimony_number: number;
  status: number;
  user_id_register: BigInteger;
}

export const Computer = sequelize.define<IComputer>('computers', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serial_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  warranty_end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  patrimony_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id_register: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },

}, {
  tableName: 'computers',
  timestamps: true,
});

Computer.belongsTo(User, {
  foreignKey: 'user_id_register',
  targetKey: 'id',
  onDelete: 'CASCADE'
});