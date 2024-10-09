import { DataTypes, Model, Optional } from "sequelize";
import db from '.';

type UserAttributes = {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserCreationAtttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAtttributes> implements UserAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
