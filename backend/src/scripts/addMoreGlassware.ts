import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import { Category, SubCategory, Product } from '../models/index.js';

dotenv.config();

const products = [
  {
    name: "دوارق مخروطية فتحة جانبية",
    description: "دوارق مخروطية فتحة جانبية",
    specifications: "الأحجام المتوفرة: 250 - 500 - 1000"
  },
  {
    name: "مقياس حرارة موائ",
    description: "مقياس حرارة موائ",
    specifications: "الأحجام المتوفرة: 320 - 250 - 120"
  },
  {
    name: "زجاجة محاليل ريجنت بوتل معتمة وشفافة",
    description: "زجاجة محاليل ريجنت بوتل معتمة وشفافة",
    specifications: "الأحجام المتوفرة: 2500 - 1000 - 500 - 250 - 125"
  },
  {
    name: "زجاجة تعقيم اوتكلاف غطاء ازرق",
    description: "زجاجة تعقيم اوتكلاف غطاء ازرق",
    specifications: "الأحجام المتوفرة: 1000 - 500 - 250 - 100"
  },
  {
    name: "دروبنق بوتل قطارات زجاجية",
    description: "دروبنق بوتل قطارات زجاجية",
    specifications: "الأحجام المتوفرة: 60 - 120 - 250"
  },
  {
    name: "اقماع زجاجية",
    description: "اقماع زجاجية",
    specifications: "الأحجام المتوفرة: 60 - 75 - 90 - 100 - 120"
  },
  {
    name: "مجفف زجاجي دسكتر",
    description: "مجفف زجاجي دسكتر",
    specifications: ""
  },
  {
    name: "فسكوميتر",
    description: "فسكوميتر",
    specifications: ""
  },
  {
    name: "انابيب زجاجية",
    description: "انابيب زجاجية",
    specifications: "الأحجام المتوفرة: 5 - 10 - 25 - 50"
  },
  {
    name: "انابيب نسلر تیوب",
    description: "انابيب نسلر تیوب",
    specifications: ""
  },
  {
    name: "اطباق زجاجية بتري دش",
    description: "اطباق زجاجية بتري دش",
    specifications: ""
  },
  {
    name: "مكثف كلفنجر",
    description: "مكثف كلفنجر",
    specifications: ""
  },
  {
    name: "عمود كولوم زجاجي",
    description: "عمود كولوم زجاجي",
    specifications: ""
  },
  {
    name: "حوض TLC",
    description: "حوض TLC",
    specifications: ""
  },
  {
    name: "حوض صبغ شرائح",
    description: "حوض صبغ شرائح",
    specifications: ""
  },
  {
    name: "أسبرت لامب",
    description: "أسبرت لامب",
    specifications: ""
  },
  {
    name: "زجاجة ساعة",
    description: "زجاجة ساعة",
    specifications: ""
  },
  {
    name: "طقم انابيب توصيل قابلة لتشكيل",
    description: "طقم انابيب توصيل قابلة لتشكيل",
    specifications: ""
  },
  {
    name: "مكعب كوارتز - زجاج",
    description: "مكعب كوارتز - زجاج",
    specifications: ""
  },
  {
    name: "بيكر بلاستيك",
    description: "بيكر بلاستيك",
    specifications: "الأحجام المتوفرة: 5000 - 2000 - 1000 - 500 - 250 - 100 - 50"
  },
  {
    name: "مخبار مدرج سلندر بلاستيك",
    description: "مخبار مدرج سلندر بلاستيك",
    specifications: "الأحجام المتوفرة: 2000 - 1000 - 500 - 250 - 100 - 50 - 25 - 10"
  },
  {
    name: "قنينة الغسيل وشنق بوتل",
    description: "قنينة الغسيل وشنق بوتل",
    specifications: "الأحجام المتوفرة: 250 - 500 - 1000"
  },
  {
    name: "اقماع بلاستيك",
    description: "اقماع بلاستيك",
    specifications: "الأحجام المتوفرة: 120 - 100 - 90 - 75 - 60"
  },
  {
    name: "انابيب بلاستيكيه",
    description: "انابيب بلاستيكيه",
    specifications: "الأحجام المتوفرة: 5 - 10"
  },
  {
    name: "انابيب مخروطية",
    description: "انابيب مخروطية",
    specifications: "الأحجام المتوفرة: 10 - 15"
  },
  {
    name: "انابيب مخروطية مع الغطاء",
    description: "انابيب مخروطية مع الغطاء",
    specifications: ""
  },
  {
    name: "راك صبغ شرائح بلاستيك",
    description: "راك صبغ شرائح بلاستيك",
    specifications: ""
  },
  {
    name: "حامل انابيب اختبار زجاجية",
    description: "حامل انابيب اختبار زجاجية",
    specifications: ""
  }
];

const addMoreGlassware = async () => {
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

    // Find subcategory
    const subCategory = await SubCategory.findOne({
      where: { 
        categoryId: category.getDataValue('id'),
        name: 'زجاجيات مخبرية'
      }
    });

    if (!subCategory) {
      console.error('❌ Subcategory not found');
      process.exit(1);
    }

    console.log(`✅ Found subcategory: ${subCategory.getDataValue('name')} (ID: ${subCategory.getDataValue('id')})`);

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

addMoreGlassware();
