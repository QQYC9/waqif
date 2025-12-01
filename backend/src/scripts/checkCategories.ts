import { connectDB } from '../config/database.js';
import { Category } from '../models/index.js';

async function checkCategories() {
  try {
    await connectDB();
    const categories = await Category.findAll();
    
    console.log('\n📋 الفئات الموجودة:\n');
    categories.forEach(cat => {
      console.log(`ID: ${cat.getDataValue('id')} | الاسم: ${cat.getDataValue('name')}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('خطأ:', error);
    process.exit(1);
  }
}

checkCategories();
