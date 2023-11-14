import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from '../instances/sequelize';

/**
 * A job in the system.
 */
class Job extends Model {
    /**
     * The unique identifier of the job.
     */
    public id!: number;

    /**
     * The status of the job (new, accepted, declined, completed).
     */
    public status!: string;

    /**
     * The identifier of the suburb where the job is located.
     */
    public suburb_id!: number;

    /**
     * The identifier of the category of the job.
     */
    public category_id!: number;

    /**
     * The name of the contact person for the job.
     */
    public contact_name!: string;

    /**
     * The phone number of the contact person for the job.
     */
    public contact_phone!: string;

    /**
     * The email address of the contact person for the job.
     */
    public contact_email!: string;

    /**
     * The quoted price for the job.
     */
    public price!: number;

    /**
     * A description of the job.
     */
    public description!: string;

    /**
     * The date and time when the job was created.
     */
    public created_at!: Date;

    /**
     * The date and time when the job was last updated.
     */
    public updated_at!: Date;
}

Job.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: DataTypes.STRING(50),
            defaultValue: 'new',
            allowNull: false
        },
        suburb_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'suburbs',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        contact_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        contact_phone: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        contact_email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Job',
        tableName: 'jobs',
        underscored: true,
    }
);

export { Job };