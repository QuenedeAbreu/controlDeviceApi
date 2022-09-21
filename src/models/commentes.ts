import { Model, DataTypes } from 'sequelize';
import sequelize from '../instances/mysql';
import { User } from './user';
import { Computer } from './computers';

export interface IComments extends Model {
  id: BigInteger;
  user_id: BigInteger;
  computer_id: BigInteger;
  comment: string;
  datetime: Date;
}

export const Comments = sequelize.define<IComments>('comments', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  computer_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'comments',
  timestamps: true,
});

Comments.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(Computer, {
  foreignKey: 'computer_id',
  targetKey: 'id',
  onDelete: 'CASCADE'
});