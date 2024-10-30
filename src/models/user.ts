import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt"

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user (must be unique)
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password (will be encrypted)
 */

class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.INTEGER, allowNull: true, unique: true, validate:{isEmail: true} },
    password: { type: DataTypes.STRING(250), allowNull: true },
  },
  {
    tableName: "Users",
    sequelize,
    hooks: {
      beforeCreate: async (user: User) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  },
);

export default User;
