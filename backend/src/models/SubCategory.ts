import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface SubCategoryAttributes {
  id: number;
  categoryId: number;
  name: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SubCategoryCreationAttributes extends Optional<SubCategoryAttributes, 'id' | 'image' | 'createdAt' | 'updatedAt'> {}

class SubCategory extends Model<SubCategoryAttributes, SubCategoryCreationAttributes> implements SubCategoryAttributes {
  public id!: number;
  public categoryId!: number;
  public name!: string;
  public image!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: any) {
    SubCategory.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        categoryId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: '/images/placeholder.jpg',
        },
      },
      {
        sequelize,
        tableName: 'sub_categories',
        timestamps: true,
        indexes: [
          {
            fields: ['categoryId'],
          },
        ],
      }
    );
  }
}

export default SubCategory;
