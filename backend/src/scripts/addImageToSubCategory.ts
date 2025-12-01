import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import sequelize from '../config/database.js';

dotenv.config();

const addImageColumn = async () => {
  try {
    await connectDB();
    
    console.log('🔄 جاري إضافة عمود image إلى جدول sub_categories...');
    
    // Add image column to sub_categories table
    await sequelize.query(`
      ALTER TABLE sub_categories 
      ADD COLUMN IF NOT EXISTS image VARCHAR(255) DEFAULT '/images/placeholder.jpg';
    `);
    
    console.log('✅ تم إضافة عمود image بنجاح إلى جدول sub_categories');
    
    // Update existing records to have default image
    await sequelize.query(`
      UPDATE sub_categories 
      SET image = '/images/placeholder.jpg' 
      WHERE image IS NULL;
    `);
    
    console.log('✅ تم تحديث السجلات الموجودة بالصورة الافتراضية');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ خطأ في إضافة عمود image:', error);
    process.exit(1);
  }
};

addImageColumn();
