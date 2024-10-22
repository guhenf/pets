import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"

class Pet extends Model {
    declare id: number;
    declare animal: string;
    declare name: string;
    declare age: number;
    declare breed: string;
    declare color: string;
    declare gender: string;
}

Pet.init({
    id: { type: DataTypes.INTEGER, primaryKey: true },
    animal: {type: DataTypes.STRING(25), allowNull: true},
    name: { type: DataTypes.STRING(50), allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: true },
    breed: { type: DataTypes.STRING(25), allowNull: true },
    color: { type: DataTypes.STRING(25), allowNull: true },
    gender: { type: DataTypes.STRING(25), allowNull: true }
},
{
    tableName: "Pets",
    sequelize    
})

export default Pet