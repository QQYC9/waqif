import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import { Category, SubCategory, Product } from '../models/index.js';

dotenv.config();

const products = [
  {
    name: "كؤوس زجاجية بيكر",
    description: "كؤوس زجاجية بيكر",
    specifications: "الأحجام المتوفرة: 5000 - 3000 - 2000 - 1000 - 500 - 250 - 100 - 50 - 25"
  },
  {
    name: "دوارق مخروطية كونكل فلاسك",
    description: "دوارق مخروطية كونكل فلاسك",
    specifications: "الأحجام المتوفرة: 5000 - 3000 - 2000 - 1000 - 500 - 250 - 100 - 50"
  },
  {
    name: "دوارق مخروطية كونكل فلاسك مع الغطاء",
    description: "دوارق مخروطية كونكل فلاسك مع الغطاء",
    specifications: "الأحجام المتوفرة: 250 - 500"
  },
  {
    name: "دوارق كروية",
    description: "دوارق كروية",
    specifications: "الأحجام المتوفرة: 50 - 100 - 250 - 500 - 1000 - 2000"
  },
  {
    name: "مخبار سلندر زجاجي",
    description: "مخبار سلندر زجاجي",
    specifications: "الأحجام المتوفرة: 2000 - 1000 - 500 - 250 - 100 - 50 - 25 - 10"
  },
  {
    name: "قوارير حجمية",
    description: "قوارير حجمية",
    specifications: "الأحجام المتوفرة: 2000 - 1000 - 500 - 250 - 100 - 50 - 25 - 10 - 5"
  },
  {
    name: "قمع فصل مخروطي",
    description: "قمع فصل مخروطي",
    specifications: "الأحجام المتوفرة: 60 - 125 - 250 - 500 - 1000"
  },
  {
    name: "طقم مكثف تقطير سكسوليت",
    description: "طقم مكثف تقطير سكسوليت",
    specifications: "الأحجام المتوفرة: 250 - 500 - 1000"
  },
  {
    name: "مكثف تقطير زجاجي",
    description: "مكثف تقطير زجاجي",
    specifications: "الأحجام المتوفرة: 250 - 500 - 1000"
  },
  {
    name: "مكثف تقطير حلزوني زجاجي",
    description: "مكثف تقطير حلزوني زجاجي",
    specifications: "الأحجام المتوفرة: 250 - 500"
  },
  {
    name: "توصيلات مكثف جميع الأشكال – وحدة ترشيح فلتريشن زجاجية",
    description: "توصيلات مكثف جميع الأشكال – وحدة ترشيح فلتريشن زجاجية",
    specifications: ""
  },
  {
    name: "ماصات زجاجية",
    description: "ماصات زجاجية",
    specifications: "الأحجام المتوفرة: 1 - 2 - 5 - 10 - 25"
  },
  {
    name: "ماصات زجاجية حجمية",
    description: "ماصات زجاجية حجمية",
    specifications: "الأحجام المتوفرة: 1 - 2 - 5 - 25 - 50"
  },
  {
    name: "سحاحة زجاجية",
    description: "سحاحة زجاجية",
    specifications: "الأحجام المتوفرة: 100 - 50 - 25"
  },
  {
    name: "قنينة كثافة",
    description: "قنينة كثافة",
    specifications: "الأحجام المتوفرة: 25 - 50"
  },
  {
    name: "جفنة صهر خزف",
    description: "جفنة صهر خزف",
    specifications: "الأحجام المتوفرة: 25 - 35 - 45 - 60 - 75"
  },
  {
    name: "بواتق خزف بدون غطاء",
    description: "بواتق خزف بدون غطاء",
    specifications: "الأحجام المتوفرة: 75 - 100 - 120 - 250"
  },
  {
    name: "مدق هاون",
    description: "مدق هاون",
    specifications: "الأحجام المتوفرة: 150 - 120 - 90 - 60"
  },
  {
    name: "مدق هاون زجاجي",
    description: "مدق هاون زجاجي",
    specifications: "الأحجام المتوفرة: 150 - 120 - 90 - 60"
  },
  {
    name: "حوض زجاجي",
    description: "حوض زجاجي",
    specifications: ""
  },
  {
    name: "قمع خزف بوخنر",
    description: "قمع خزف بوخنر",
    specifications: "الأحجام المتوفرة: 120 - 90 - 60"
  }
];

const addGlassware = async () => {
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
        name: 'زجاجيات مخبرية'
      }
    });

    if (!subCategory) {
      subCategory = await SubCategory.create({
        categoryId: category.getDataValue('id'),
        name: 'زجاجيات مخبرية'
      });
      await subCategory.reload();
      console.log('✅ Created subcategory: زجاجيات مخبرية');
    } else {
      console.log(`✅ Found subcategory: ${subCategory.getDataValue('name')} (ID: ${subCategory.getDataValue('id')})`);
    }

    const subCategoryId = subCategory.getDataValue('id');

    // Add products
    let addedCount = 0;
    for (const product of products) {
      try {
        await Product.create({
          subCategoryId: subCategoryId,
          name: product.name,
          description: product.description,
          specifications: product.specifications,
          price: 0,
          image: '/images/placeholder.jpg'
        });
        addedCount++;
        console.log(`✅ Added: ${product.name}`);
      } catch (error: any) {
        console.error(`❌ Error adding ${product.name}:`, error.message);
      }
    }

    console.log(`\n🎉 Successfully added ${addedCount} out of ${products.length} products!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

addGlassware();
