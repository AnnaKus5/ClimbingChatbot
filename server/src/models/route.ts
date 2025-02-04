import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Optional } from "sequelize/types";

// id	int	NO	PRI
// name	varchar(255)	NO	
// sector_id	int	NO	MUL
// tall_recommend_sum	int	YES	
// grade_mean	float	YES	
// cluster	int	YES	
// rating_tot	float	YES	

interface RouteAttributes {
  id: number;
  name: string;
  sector_id: number;
  tall_recommend_sum: number;
  grade_mean: number;
  cluster: number;
  rating_tot: number;
}

interface RouteCreationAttributes extends Optional<RouteAttributes, 'id'> {}

@Table({
    tableName: 'routes',
    timestamps: false
})
class Route extends Model<RouteAttributes, RouteCreationAttributes> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.INTEGER)
    sector_id: number;

    @Column(DataType.INTEGER)
    tall_recommend_sum: number;

    @Column(DataType.FLOAT)
    grade_mean: number;

    @Column(DataType.INTEGER)
    cluster: number;

    @Column(DataType.FLOAT)
    rating_tot: number;

}

export default Route;
