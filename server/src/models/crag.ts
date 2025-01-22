import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Optional } from "sequelize/types";
import Sector from "./sector.js";

interface CragAttributes {
  id: number;
  name: string;
  country: string;
}

interface CragCreationAttributes extends Optional<CragAttributes, 'id'> {}

@Table({
    tableName: 'crags',
    timestamps: false
})
class Crag extends Model<CragAttributes, CragCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    country: string;

}

export default Crag;
