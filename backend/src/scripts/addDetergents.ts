import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import { Category, SubCategory, Product } from '../models/index.js';

dotenv.config();

const products = [
  "كلورا الأصلي 45 كيلو تركيز 70%",
  "حمض الخليك غذائي 35 كيلو تركيز 99.85",
  "حمض الهيدروكلوريك 40 كيلو تركيز 33 - 35%",
  "تايلوز كوري 20 كيلو",
  "سلفونيك سعودي 230 كيلو (ابكو)",
  "سلفونيك سعودي 220 كيلو (الوطنية)",
  "تكسابون سعودي 220 كيلو",
  "صودا قشور كويتي 99%",
  "صودا قشور عماني 99.9%",
  "صودا سائل عماني 50%",
  "صودا حبيبات سعودي 99.9%",
  "صودا أش لايت 99%",
  "بيكربونات الصوديوم",
  "كربونات الصوديوم",
  "الأسيتون",
  "تراي صوديوم فوسفات",
  "تراي صوديوم سترات",
  "صوديوم ميتاباي سولفت",
  "صوديوم هكساميتا فوسفات",
  "سوربات البوتاسيوم",
  "سترات الصوديوم",
  "فيتامين سي",
  "بنزوات الصوديوم",
  "كربوكسي ميثيل السيللوز CMC",
  "حمض لاكتيك",
  "حمض البوريك",
  "بوركس",
  "ستريك اسيد أني هيدرات (ملح الليمون)",
  "ستريك اسيد موني هيدرات",
  "كمبرلان سعودي 220 كيلو",
  "بيتايين سعودي 220 كيلو",
  "فورمالين سعودي 32 كيلو",
  "اديتا 20 كيلو"
];

const addDetergents = async () => {
  try {
    await connectDB();

    // Find category
    const category = await Category.findOne({
      where: { name: 'كيماويات وأوساط زراعية' }
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
        name: 'المنظفات ومستحضرات التجميل'
      }
    });

    if (!subCategory) {
      subCategory = await SubCategory.create({
        categoryId: category.getDataValue('id'),
        name: 'المنظفات ومستحضرات التجميل'
      });
      await subCategory.reload();
      console.log('✅ Created subcategory: المنظفات ومستحضرات التجميل');
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

addDetergents();
