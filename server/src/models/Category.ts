import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/sequelize';

/**
 * The Category class represents a row in the 'categories' table.
 */
class Category extends Model {
    /** The ID of the category */
    public id!: number;

    /** The name of the category */
    public name!: string;

    /** The ID of the parent category */
    public parent_category_id!: number;
}

Category.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    parent_category_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
});

export default Category;