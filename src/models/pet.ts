import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

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
<<<<<<< HEAD
    animal: { type: DataTypes.STRING(50), allowNull: false },
=======
>>>>>>> deb59248787b942313a215a567459c13b645ca43
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
