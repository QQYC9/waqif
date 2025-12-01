import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import { Category, SubCategory, Product } from '../models/index.js';

dotenv.config();

const products = [
  "محلول بيلروبينBILIRUBIND & T",
  "محلول جي بي تيSGPT",
  "محلول جي او تيSGOT",
  "محلول الكلاينALKALINE PHOSPHATASE",
  "محلول اسید فوسفاتACID PHOSPHATASE",
  "محلول توتل بروتينTOTAL PROTEIN",
  "محلول توتل بروتينTOTAL PROTEIN",
  "محلول البيومينALBUMIN",
  "محلول جلكوزGLUCOSE",
  "محلول جلكوزGLUCOSE",
  "محلول كرياتنينCREATININE",
  "محلول كرياتنينCREATININE",
  "محلول كالسيومCALCIUM",
  "محلول يوريك اسيدURIC ACID",
  "محلول يورياUREA",
  "محلول کلورایدCHLORIDE",
  "محلول کلسترولCHOLESTEROL",
  "محلول اتش دي ال كلسترولHDL CHOLESTEROL",
  "محلول امیلیزTRIGLYCERIDES",
  "محلول سي كيa-AMYLASE",
  "محلول سي كي ام بيCK",
  "محلول بوتاسيومCK-MB",
  "محلول صوديومPOTASSIUM",
  "محلول فسفورسSodium",
  "محلول بي تيPHOSPHORUS",
  "محلول بي تي تيPT",
  "محلول ایرونAPTT",
  "محلول ایرونIRON",
  "محلول مغنسيومIRON+TIBC",
  "محلول در ابکن 1 لترMAGNESIUM",
  "Hemoglobin Hb 1L",
  "محلول جلكوز 6 بي ديG-6PD",
  "صبغة جمساءGiemsa Stain",
  "صبغة جمساءGiemsa Stain",
  "صبغة جرامGram's Stain (A, B,C & D)",
  "صبغة زيل نلسنZiehl Nielsen stain",
  "صبغة البرتALBERT'S STAIN-A & B",
  "صبغة رايتWright's Stain",
  "صبغة لشمانLEISHMAN STAIN",
  "صبغة ملاكيت جرينMalachite Green",
  "لوجل ايودينLugol's lodine",
  "میثايل ريدMethyl Red Indicator",
  "محلول کوفکسKovacs' Reagent (Indole)",
  "زيت عدسات ميكرسكوبImmersion Oil",
  "محلول ایوسینEosin (Aqu.) 2%",
  "هيما توكسلينHematoxylin",
  "لاكتو فينول كتن بلوLactophenol Cotton Blue",
  "بيكرك اسيدPicric Acid",
  "محلول اوكسديزOxidase Reagent",
  "صبغة سفرانينGrams Safranin 0.5%",
  "صبغة كريستال فيلوتGrams Crystal Violet",
  "صبغة برلينت كريزل بلوBrilliant Cresyl Blue",
  "کاتلیزCatalase test",
  "كربول فيوكسينCarbol Fuchsin",
  "جرام ایودینGram lodine",
  "Blood Group ABO Test",
  "فصائل دم",
  "ASO Test Kits",
  "CRP Test Kits",
  "RF Test Kits",
  "WIDAL TEST",
  "ويدل",
  "BRUCELL-A بروسلا",
  "BRUCELL-M بروسلا",
  "BRUCELL-RB Rose Bengal",
  "بروسلا",
  "ANTI HUMAN GLOBULIN (AHG)",
  "Bovine Albumin 22% (BSA)",
  "VDRL",
  "RPR",
  "Occult blood in stool (HEMOSPOT)"
];

const addReagents = async () => {
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
        name: 'محاليل وكواشف'
      }
    });

    if (!subCategory) {
      subCategory = await SubCategory.create({
        categoryId: category.getDataValue('id'),
        name: 'محاليل وكواشف'
      });
      await subCategory.reload();
      console.log('✅ Created subcategory: محاليل وكواشف');
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
        if (addedCount % 10 === 0) {
          console.log(`✅ Added ${addedCount} products...`);
        }
      } catch (error: any) {
        console.error(`❌ Error adding ${productName}:`, error.message);
      }
    }

    console.log(`\n🎉 Successfully added ${addedCount} out of ${products.length} products!`);
    console.log(`✅ Total products added: ${addedCount}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

addReagents();
