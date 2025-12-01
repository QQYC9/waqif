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

interface Product {
  name: string;
  model: string;
  picture: string;
}

const products: Product[] = [
  { name: "Life-size skeleton 180CM Tall", model: "XC-101", picture: "" },
  { name: "Skeleton with Muscles and Ligaments 180CM Tall", model: "XC-101A", picture: "" },
  { name: "85CM Skeleton", model: "XC-102", picture: "" },
  { name: "85CM Skeleton with Spinal Nerves", model: "XC-102A", picture: "" },
  { name: "85M Skeleton with Nerves and Blood Vessels", model: "XC-102B", picture: "" },
  { name: "85CM Skeleton with Painted Muscles", model: "XC-102C", picture: "" },
  { name: "45CM Mini Skeleton", model: "XC-103", picture: "" },
  { name: "Life-Size Skull", model: "XC-104", picture: "" },
  { name: "Head with Brain", model: "XC-318B", picture: "" },
  { name: "Median Section of the Head", model: "XC-319", picture: "" },
  { name: "Frontal and Median Section of the Head", model: "XC-319A", picture: "" },
  { name: "Frontal Section of the Head", model: "XC-319B", picture: "" },
  { name: "Larynx, Heart and Lung Model", model: "XC-320", picture: "" },
  { name: "Lung Model (4 parts)", model: "XC-321", picture: "" },
  { name: "Model of the Head", model: "XC-324", picture: "" },
  { name: "Nerves of Neck Region", model: "XC-324B", picture: "" },
  { name: "Palm Anatomy", model: "XC-325", picture: "" },
  { name: "Normal, Flat and Arched Foot", model: "XC-326", picture: "" },
  { name: "Foot Anatomical Model", model: "XC-326A", picture: "" },
  { name: "Foot Section Model", model: "XC-326B", picture: "" },
  { name: "Model of the Transparent Lung Segment", model: "XC-330", picture: "" },
  { name: "Female Pelvis Model", model: "XC-332D", picture: "" },
  { name: "Urinary System Model", model: "XC-333", picture: "" },
  { name: "80CM Human Muscle Model Male (27 parts)", model: "XC-334", picture: "" },
  { name: "50CM Human Muscle Model Male (1 part)", model: "XC-335", picture: "" },
  { name: "Muscle of Human Arm (7 parts)", model: "XC-336", picture: "" },
  { name: "Muscle of Human Leg (13 parts)", model: "XC-337", picture: "" },
  { name: "Life-size Human Muscle Foot Model (7 parts)", model: "XC-338", picture: "" },
  { name: "Life-Size Skull with Painted Muscles", model: "XC-104B", picture: "" },
  { name: "Life-Size Skull with Colored Bones", model: "XC-104C", picture: "" },
  { name: "Deluxe Life-Size Skull Style D", model: "XC-104D", picture: "" },
  { name: "Skull Model with 8 Parts Brain", model: "XC-104E", picture: "" },
  { name: "Miniature Plastic Skull", model: "XC-106", picture: "" },
  { name: "Life-size Vertebral Column", model: "XC-107", picture: "" },
  { name: "Vertebral Column with Painted Muscles", model: "XC-107A", picture: "" },
  { name: "Didactic Vertebral Column", model: "XC-107C", picture: "" },
  { name: "Life Size Shoulder Joint", model: "XC-109", picture: "" },
  { name: "Life Size Muscled Shoulder Joint", model: "XC-109A", picture: "" },
  { name: "Life-size Hip Joint", model: "XC-110", picture: "" },
  { name: "Life-size Knee Joint", model: "XC-111", picture: "" },
  { name: "Life-size Elbow Joint", model: "XC-112", picture: "" },
  { name: "Life-size Foot Joint", model: "XC-113", picture: "" },
  { name: "Life-size Foot Joint with Ligaments", model: "XC-113A", picture: "" },
  { name: "Life-size Hand Joint", model: "XC-114", picture: "" },
  { name: "Life-size Hand Joint with Ligaments", model: "XC-114A", picture: "" },
  { name: "Life-size Pelvis with 5pcs Lumbar Vertebrae", model: "XC-115", picture: "" },
  { name: "Half-size Pelvis with 5pcs Lumbar Vertebrae", model: "XC-115A", picture: "" },
  { name: "Lumbar Set (2 pcs)", model: "XC-116", picture: "" },
  { name: "Lumbar Set (3 pcs)", model: "XC-117", picture: "" },
  { name: "Lumbar Set (4 pcs)", model: "XC-118", picture: "" },
  { name: "Life-size Lumbar Vertebrae with Sacrum & Coccyx and Herniated Disc", model: "XC-119", picture: "" },
  { name: "Mini Lumbar Vertebrae with Sacrum & Coccyx and Herniated Disc", model: "XC-119A", picture: "" },
  { name: "Thoracic Spinal Column", model: "XC-120", picture: "" },
  { name: "Life-size Upper Extremity (In pairs)", model: "XC-121", picture: "" }
];

const SUBCATEGORY_ID = 67; // مجسمات

async function addProducts() {
  try {
    await sequelize.authenticate();
    console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');

    let successCount = 0;
    let errorCount = 0;

    for (const product of products) {
      try {
        await sequelize.query(
          `INSERT INTO products ("subCategoryId", name, description, specifications, price, image, "createdAt", "updatedAt")
           VALUES (:subCategoryId, :name, :description, :specifications, :price, :image, NOW(), NOW())`,
          {
            replacements: {
              subCategoryId: SUBCATEGORY_ID,
              name: product.name,
              description: `Model: ${product.model}`,
              specifications: '',
              price: 0,
              image: product.picture || '/images/placeholder.jpg'
            }
          }
        );
        successCount++;
        console.log(`✅ تم إضافة: ${product.name} (${product.model})`);
      } catch (error: any) {
        errorCount++;
        console.error(`❌ خطأ في إضافة ${product.name}:`, error.message);
      }
    }

    console.log(`\n📊 النتيجة النهائية:`);
    console.log(`   ✅ تم إضافة ${successCount} منتج بنجاح`);
    console.log(`   ❌ فشل إضافة ${errorCount} منتج`);

  } catch (error) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', error);
  } finally {
    await sequelize.close();
  }
}

addProducts();
