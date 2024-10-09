import { DataTypes, Model, QueryInterface } from "sequelize";
import { IUser } from "../../Interfaces/user/IUser";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUser>>('users', {
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
    },
    )
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  }
}