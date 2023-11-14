import { Model, DataTypes } from "sequelize";
import { sequelize } from '../instances/sequelize';

/**
 * A suburb in the system.
 */
class Suburb extends Model {
    /**
     * The unique identifier of the suburb.
     */
    public id!: number;

    /**
     * The name of the suburb.
     */
    public name!: string;

    /**
     * The postcode of the suburb.
     */
    public postcode!: string;
}

Suburb.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        postcode: {
            type: DataTypes.STRING(4),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Suburb',
        tableName: 'suburbs',
    }
);

export default Suburb;