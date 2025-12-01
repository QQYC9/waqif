import { connectDB } from '../config/database.js';
import { sequelize } from '../models/index.js';

async function removeUnits() {
  try {
    await connectDB();
    
    console.log('🔄 إزالة جدول units وعمود unitId...\n');
    
    // حذف عمود unitId من products
    await sequelize.query('ALTER TABLE products DROP COLUMN IF EXISTS "unitId"');
    console.log('✅ تم حذف عمود unitId من جدول products');
    
    // حذف جدول units
    await sequelize.query('DROP TABLE IF EXISTS units CASCADE');
    console.log('✅ تم حذف جدول units');
    
    console.log('\n✅ تم التنظيف بنجاح!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ خطأ:', error);
    process.exit(1);
  }
}

removeUnits();
