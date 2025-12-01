import sequelize from '../config/database.js';
import User from './User.js';
import Category from './Category.js';
import SubCategory from './SubCategory.js';
import Product from './Product.js';

// Initialize models
User.initModel(sequelize);
Category.initModel(sequelize);
SubCategory.initModel(sequelize);
Product.initModel(sequelize);

// Define associations
Category.hasMany(SubCategory, { foreignKey: 'categoryId', as: 'subCategories', onDelete: 'CASCADE' });
SubCategory.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

SubCategory.hasMany(Product, { foreignKey: 'subCategoryId', as: 'products', onDelete: 'CASCADE' });
Product.belongsTo(SubCategory, { foreignKey: 'subCategoryId', as: 'subCategory' });

export {
  sequelize,
  User,
  Category,
  SubCategory,
  Product,
};

