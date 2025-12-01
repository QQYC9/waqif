import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface CategoryAttributes {
  id: number;
  name: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id' | 'image' | 'createdAt' | 'updatedAt'> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public image!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: any) {
    Category.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
          allowNull: false,
          defaultValue: '/images/placeholder.jpg',
        },
      },
      {
        sequelize,
        tableName: 'categories',
        timestamps: true,
      }
    );
  }
}

export default Category;
