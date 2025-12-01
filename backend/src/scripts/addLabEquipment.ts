import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import { Category, SubCategory, Product } from '../models/index.js';

dotenv.config();

const products = [
  "جهاز كيمياء سبكتروفلتوميتر 295-UV دجتل",
  "جهاز كيمياء سبکتر وفلتوميتر 285- دجتل",
  "جهاز كيمياء سبكتروفلتوميتر 722-Li",
  "جهاز كيمياء كلروميتر",
  "حمام مائي 2 فتحات",
  "حمام مائي 4 فتحات",
  "حمام مائي 6 فتحات",
  "سنترفيوج",
  "سنترفيوج يدوي",
  "جهاز الطرد المركزي للهيماتوكريت",
  "سنترفيوج مع ال",
  "عداد مستعمرات كولني كاونتر",
  "جهاز تعقيم اوتكلاف 18 لتر - 24 لتر",
  "جهاز تعقيم أوتوكلاف 50 لتر",
  "جهاز تعقيم اوفن 32 لتر",
  "جهاز تعقيم اوفن 72 لتر",
  "جهاز تعقيم اوفن 28 لتر",
  "حاضنة تزيع بكتيريا انكيوبيتور 52 لتر",
  "حاضنة تزيع بكتيريا انكيوبيتور 28 لتر",
  "اجهزة تسخين وارق 250ml-500ml-1000ml",
  "جهاز هوت بليت",
  "جهاز مغنتك ستيرر خلاط مغناطيسي"
];

const addLabEquipment = async () => {
  try {
    await connectDB();

    // Find category
    const category = await Category.findOne({
      where: { name: 'مستلزمات مخبرية' }
    });

    if (!category) {
      console.error('❌ Category not found');
      process.exit(1);
    }

    console.log(`✅ Found category: ${category.getDataValue('name')} (ID: ${category.getDataValue('id')})`);

    // Find or create subcategory
    let subCategory = await SubCategory.findOne({
      where: { 
        categoryId: category.getDataValue('id'),
        name: 'أجهزة مخبرية'
      }
    });

    if (!subCategory) {
      subCategory = await SubCategory.create({
        categoryId: category.getDataValue('id'),
        name: 'أجهزة مخبرية'
      });
      await subCategory.reload();
      console.log('✅ Created subcategory: أجهزة مخبرية');
    } else {
      console.log(`✅ Found subcategory: ${subCategory.getDataValue('name')} (ID: ${subCategory.getDataValue('id')})`);
    }

    const subCategoryId = subCategory.getDataValue('id');

    // Add products
    let addedCount = 0;
    for (const productName of products) {
      try {
        await Product.create({
          subCategoryId: subCategoryId,
          name: productName,
          description: productName,
          specifications: '',
          price: 0,
          image: '/images/placeholder.jpg'
        });
        addedCount++;
        console.log(`✅ Added: ${productName}`);
      } catch (error: any) {
        console.error(`❌ Error adding ${productName}:`, error.message);
      }
    }

    console.log(`\n🎉 Successfully added ${addedCount} out of ${products.length} products!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

addLabEquipment();
