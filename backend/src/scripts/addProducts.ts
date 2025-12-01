import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import { Category, SubCategory, Product } from '../models/index.js';

dotenv.config();

const products = [
  "Amikacin (30 mcg)",
  "Amoxycillin/Clavulanate (20/10 mcg) (30 mcg)",
  "Ampicillin (10 mcg)",
  "Ampicillin/Cloxacillin (10 mcg)",
  "Ampicillin/Sulbactam (10x10 mcg)",
  "Amphotericin-B (20 mcg)",
  "Azithromycin (15 mcg)",
  "Aztreonam (30 mcg)",
  "Bacitracin (8 units)",
  "Cefaclor (30 mcg)",
  "Cefazolin 30 mcg",
  "Cefepime (30 mcg)",
  "Cefixime (5 mcg)",
  "Cefprozil (30 mcg)",
  "Cefoxitin (30 mcg)",
  "Cefadroxil (Cephadroxil) (30 mcg)",
  "Ceftriaxone/Tazobactam (30/10 mcg)",
  "Cefdinir (5 mcg)",
  "Ceftriaxone (30 mcg)",
  "Clotrimazole (10 mcg)",
  "Cefpodoxime (10 mcg)",
  "Cefoperazone (75 mcg)",
  "Cefotaxime (Cephotaxime) (30 mcg)",
  "Ceftazidime (30 mcg)",
  "Ceftizoxime (30 mcg)",
  "Cefuroxime (30 mcg)",
  "Cephalothin 30 mcg",
  "Chloramphenicol (30 mcg)",
  "Ciprofloxacin (5 mcg)",
  "Clarithromycin (15 mcg)",
  "Clindamycin (10 mcg)",
  "Colistin (Methane Sulphonate) (10 mcg)",
  "Co-Trimoxazole (Trimethoprim/ Sulphamethoxazole) 1.25/23.75 mcg",
  "Doxycycline (30 mcg)",
  "Ertapenem (10 mcg)",
  "Erythromycin (15 mcg)",
  "Fluconazole (10 mcg)",
  "Gentamicin (10 mcg)",
  "Gatifloxacin (5 mcg)",
  "Kanamycin (30 mcg)",
  "Ketoconazole (30 mcg)",
  "Imipenem (10 mcg)",
  "Itraconazole (30 mcg)",
  "Levofloxacin (5 mcg)",
  "Linezolid (30 mcg)",
  "Lincomycin (10 mcg)",
  "Lomefloxacin (10 mcg)",
  "Meropenem (10 mcg)",
  "Moxifloxacin (5 mcg)",
  "Metronidazole (10 mcg)",
  "Nalidixic Acid (30 mcg)",
  "Nitrofurantoin (300 mcg)",
  "Novobiocin (5 mcg)",
  "Norfloxacin (10 mcg)",
  "Nystatin (50 mcg)",
  "Ofloxacin (5 mcg)",
  "Optochin (5 mcg)",
  "Oxacillin (5 mcg)",
  "Oxidase Disc (50 disc)",
  "Penicillin (10 units)",
  "Piperacillin (100 mcg)",
  "Piperacillin/Tazobactam (100/10 mcg)",
  "Quinupristin-dalfopristin 15 µg",
  "Rifampin (5 mcg)",
  "Streptomycin (25 mcg)",
  "Telithromycin 15 µg",
  "Tetracycline (30 mcg)",
  "Tobramycin (10 mcg)",
  "Trimethoprim/sulfamethoxazole 1.25 µg / 23.5 µg",
  "Vancomycin (30 mcg)"
];

const addProducts = async () => {
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
        name: 'أوساط زراعية'
      }
    });

    if (!subCategory) {
      subCategory = await SubCategory.create({
        categoryId: category.getDataValue('id'),
        name: 'أوساط زراعية'
      });
      await subCategory.reload();
      console.log('✅ Created subcategory: أوساط زراعية');
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

addProducts();
