import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME || 'waqif_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    logging: false,
  }
);

// Physics products - SubCategory ID: 54
const physicsProducts = [
  "ميكرسكوب تعليمي",
  "حقيبة الذرات العضوية",
  "جلفانومتر",
  "الفولتاميتر",
  "الأميتر",
  "منشور زجاجي",
  "مستطيل زجاجي",
  "أنبوبة اشعة الكاثود",
  "توصيل المعادن للحرارة",
  "ثاقب سدادات"
];

// Biology products - SubCategory ID: 56
const biologyProducts = [
  "مجسم فك الأسنان",
  "مجسم الجمجمة",
  "مجسم الجلد",
  "الجهاز التناسلي للرجل",
  "الجهاز التناسلي للمرأة",
  "مجسم نصف انسان جميع اعضاء الجسم 85سم",
  "مجسم نصف انسان جميع اعضاء الجسم 45سم",
  "مجسم الجهاز التنفسي"
];

const PHYSICS_SUBCATEGORY_ID = 54;
const BIOLOGY_SUBCATEGORY_ID = 56;

async function addProducts() {
  try {
    await sequelize.authenticate();
    console.log('✅ تم الاتصال بقاعدة البيانات بنجاح\n');

    let totalSuccess = 0;
    let totalError = 0;

    // Add Physics products
    console.log('=== إضافة منتجات الفيزياء ===');
    for (const productName of physicsProducts) {
      try {
        await sequelize.query(
          `INSERT INTO products ("subCategoryId", name, description, specifications, price, image, "createdAt", "updatedAt")
           VALUES (:subCategoryId, :name, :description, :specifications, :price, :image, NOW(), NOW())`,
          {
            replacements: {
              subCategoryId: PHYSICS_SUBCATEGORY_ID,
              name: productName,
              description: productName,
              specifications: '',
              price: 0,
              image: '/images/placeholder.jpg'
            }
          }
        );
        totalSuccess++;
        console.log(`✅ ${productName}`);
      } catch (error: any) {
        totalError++;
        console.error(`❌ خطأ في إضافة ${productName}:`, error.message);
      }
    }

    // Add Biology products
    console.log('\n=== إضافة منتجات الأحياء ===');
    for (const productName of biologyProducts) {
      try {
        await sequelize.query(
          `INSERT INTO products ("subCategoryId", name, description, specifications, price, image, "createdAt", "updatedAt")
           VALUES (:subCategoryId, :name, :description, :specifications, :price, :image, NOW(), NOW())`,
          {
            replacements: {
              subCategoryId: BIOLOGY_SUBCATEGORY_ID,
              name: productName,
              description: productName,
              specifications: '',
              price: 0,
              image: '/images/placeholder.jpg'
            }
          }
        );
        totalSuccess++;
        console.log(`✅ ${productName}`);
      } catch (error: any) {
        totalError++;
        console.error(`❌ خطأ في إضافة ${productName}:`, error.message);
      }
    }

    console.log(`\n📊 النتيجة النهائية:`);
    console.log(`   ✅ تم إضافة ${totalSuccess} منتج بنجاح`);
    console.log(`   ❌ فشل إضافة ${totalError} منتج`);
    console.log(`\n📦 التفاصيل:`);
    console.log(`   - منتجات الفيزياء: ${physicsProducts.length}`);
    console.log(`   - منتجات الأحياء: ${biologyProducts.length}`);

  } catch (error) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', error);
  } finally {
    await sequelize.close();
  }
}

addProducts();
