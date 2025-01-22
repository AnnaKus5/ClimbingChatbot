import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Optional } from "sequelize/types";
import Crag from "./crag.js";

interface SectorAttributes {
  id: number;
  name: string;
  crag_id: number;
}

interface SectorCreationAttributes extends Optional<SectorAttributes, 'id'> {}

@Table({
  tableName: "sectors",
  timestamps: false
})
class Sector extends Model<SectorAttributes, SectorCreationAttributes> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    id: number;

    @Column(DataType.STRING)
    name: string;

    @ForeignKey(() => Crag)
    @Column(DataType.INTEGER)
    crag_id: number;

    // @BelongsTo(() => Crag)
    // crag: Crag
}

export default Sector;
