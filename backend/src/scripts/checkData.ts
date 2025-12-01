import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import { Category, SubCategory, Product } from '../models/index.js';

dotenv.config();

const checkData = async () => {
  try {
    await connectDB();
    
    const categories = await Category.findAll();
    const subCategories = await SubCategory.findAll();
    const products = await Product.findAll();
    
    console.log('\n📊 إحصائيات قاعدة البيانات:');
    console.log('='.repeat(50));
    console.log(`✅ عدد الأقسام الرئيسية: ${categories.length}`);
    console.log(`✅ عدد الأقسام الفرعية: ${subCategories.length}`);
    console.log(`✅ عدد المنتجات: ${products.length}`);
    console.log('='.repeat(50));
    
    if (categories.length > 0) {
      console.log('\n📁 الأقسام الرئيسية:');
      categories.forEach((cat: any) => {
        console.log(`  - ${cat.getDataValue('name')} (ID: ${cat.getDataValue('id')})`);
      });
    }
    
    if (subCategories.length > 0) {
      console.log('\n📂 الأقسام الفرعية:');
      subCategories.forEach((sub: any) => {
        console.log(`  - ${sub.getDataValue('name')} (ID: ${sub.getDataValue('id')}, Category: ${sub.getDataValue('categoryId')}, Image: ${sub.getDataValue('image')})`);
      });
    }
    
    if (products.length > 0) {
      console.log('\n📦 المنتجات (أول 10):');
      products.slice(0, 10).forEach((prod: any) => {
        console.log(`  - ${prod.getDataValue('name')} (ID: ${prod.getDataValue('id')}, SubCategory: ${prod.getDataValue('subCategoryId')})`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ خطأ:', error);
    process.exit(1);
  }
};

checkData();
