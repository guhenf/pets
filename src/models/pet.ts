import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the pet
 *         name:
 *           type: string
 *           description: The name of the pet
 *         age:
 *           type: integer
 *           description: The age of the pet
 *         breed:
 *           type: string
 *           description: The breed of the pet
 *         color:
 *           type: string
 *           description: The color of the pet
 *         gender:
 *           type: string
 *           description: The gender of the pet
 */

class Pet extends Model {
  declare id: number;
  declare name: string;
  declare age: number;
  declare breed: string;
  declare color: string;
  declare gender: string;
}

Pet.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: true },
    breed: { type: DataTypes.STRING(25), allowNull: true },
    color: { type: DataTypes.STRING(25), allowNull: true },
    gender: { type: DataTypes.STRING(25), allowNull: true },
  },
  {
    tableName: "pets",
    sequelize,
  },
);

export default Pet;
