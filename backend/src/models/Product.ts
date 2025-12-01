import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface ProductAttributes {
  id: number;
  subCategoryId: number;
  name: string;
  description: string;
  specifications: string;
  price: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'specifications' | 'image' | 'createdAt' | 'updatedAt'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public subCategoryId!: number;
  public name!: string;
  public description!: string;
  public specifications!: string;
  public price!: number;
  public image!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: any) {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        subCategoryId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'sub_categories',
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
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        specifications: {
          type: DataTypes.TEXT,
          allowNull: true,
          defaultValue: '',
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            min: 0,
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
        tableName: 'products',
        timestamps: true,
        indexes: [
          {
            fields: ['subCategoryId'],
          },
          {
            fields: ['name'],
            type: 'FULLTEXT',
          },
        ],
      }
    );
  }
}

export default Product;
