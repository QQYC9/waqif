import { connectDB } from '../config/database.js';
import { Category, SubCategory, Unit, Product } from '../models/index.js';

const cleaningProducts = {
  categoryName: 'كيماويات وأوساط زراعية',
  subCategoryName: 'منظفات ومستحضرات التجميل',
  units: [
    {
      name: 'مواد صناعة المنظفات',
      products: [
        { name: 'سلفونيك', description: 'حمض السلفونيك - مادة أساسية في صناعة المنظفات', price: 50 },
        { name: 'تكسابون', description: 'تكسابون - مادة فعالة للتنظيف والرغوة', price: 45 },
        { name: 'صابون كوري', description: 'صابون كوري عالي الجودة', price: 35 },
        { name: 'أديتا', description: 'أديتا - مادة مخلبية للتنظيف', price: 40 },
        { name: 'كلور هندي', description: 'كلور هندي - مادة تبييض ومطهرة', price: 30 },
        { name: 'صودا اش', description: 'صودا اش (كربونات الصوديوم)', price: 25 },
        { name: 'صودا كاوية', description: 'صودا كاوية (هيدروكسيد الصوديوم)', price: 35 },
        { name: 'ملح ليمون', description: 'ملح ليمون (حمض الستريك)', price: 20 },
        { name: 'ملح نقي', description: 'ملح نقي للاستخدامات الصناعية', price: 15 },
        { name: 'كمبرلان', description: 'كمبرلان - مادة منظفة', price: 45 },
        { name: 'بيتائين', description: 'بيتائين - مادة فعالة سطحياً', price: 50 },
        { name: 'تايلوز', description: 'تايلوز - مادة مثخنة', price: 40 },
      ]
    },
    {
      name: 'العطور والروائح',
      products: [
        { name: 'عطر تفاح', description: 'عطر برائحة التفاح الطبيعية', price: 30 },
        { name: 'عطر ورد جوري', description: 'عطر برائحة الورد الجوري الفاخرة', price: 35 },
        { name: 'عطر خوخ', description: 'عطر برائحة الخوخ المنعشة', price: 30 },
        { name: 'عطر رمان', description: 'عطر برائحة الرمان الطبيعية', price: 30 },
        { name: 'عطر ليمون', description: 'عطر برائحة الليمون المنعشة', price: 25 },
        { name: 'عطر عود', description: 'عطر برائحة العود الفاخرة', price: 50 },
        { name: 'عطر لافندر', description: 'عطر برائحة اللافندر المهدئة', price: 35 },
        { name: 'عطر دوفن', description: 'عطر دوفن الفاخر', price: 40 },
        { name: 'عطر نعناع', description: 'عطر برائحة النعناع المنعشة', price: 25 },
        { name: 'عطر فراولة', description: 'عطر برائحة الفراولة الحلوة', price: 30 },
        { name: 'عطر برتقال', description: 'عطر برائحة البرتقال المنعشة', price: 25 },
        { name: 'عطر ياسمين', description: 'عطر برائحة الياسمين الطبيعية', price: 35 },
        { name: 'عطر برايز', description: 'عطر برايز الفاخر', price: 40 },
        { name: 'عطر ليمون', description: 'عطر برائحة الليمون الطبيعية', price: 25 },
      ]
    },
    {
      name: 'زيوت نباتية',
      products: [
        { name: 'زيوت خام', description: 'زيوت نباتية خام طبيعية', price: 40 },
        { name: 'زيت الزعفران', description: 'زيت الزعفران الطبيعي', price: 150 },
        { name: 'زيت الورد', description: 'زيت الورد الطبيعي', price: 80 },
        { name: 'زيت اللافندر', description: 'زيت اللافندر العطري', price: 60 },
        { name: 'زيت الكافور', description: 'زيت الكافور الطبيعي', price: 45 },
        { name: 'زيت الزعتر', description: 'زيت الزعتر الطبيعي', price: 50 },
        { name: 'زيت الليمون', description: 'زيت الليمون العطري', price: 40 },
        { name: 'زيت النيم', description: 'زيت النيم الطبيعي', price: 55 },
        { name: 'زيت إكليل الجبل', description: 'زيت إكليل الجبل (روزماري)', price: 50 },
        { name: 'زيت اللوز الحلو', description: 'زيت اللوز الحلو الطبيعي', price: 60 },
        { name: 'زيت شجرة الشاي', description: 'زيت شجرة الشاي العطري', price: 55 },
        { name: 'زيت الكركم', description: 'زيت الكركم الطبيعي', price: 65 },
        { name: 'زيت الجوجوبا', description: 'زيت الجوجوبا للعناية بالبشرة', price: 70 },
        { name: 'زيت الخروع', description: 'زيت الخروع الطبيعي', price: 35 },
        { name: 'زيت الصبار', description: 'زيت الصبار (الألوفيرا)', price: 45 },
        { name: 'زيت الثوم', description: 'زيت الثوم الطبيعي', price: 40 },
        { name: 'زيت الجلسرين', description: 'زيت الجلسرين النقي', price: 30 },
        { name: 'زيت جوز الهند النقي', description: 'زيت جوز الهند النقي الطبيعي', price: 50 },
        { name: 'زيت بذور العنب', description: 'زيت بذور العنب الطبيعي', price: 55 },
        { name: 'زيت اللوز المر', description: 'زيت اللوز المر الطبيعي', price: 60 },
        { name: 'زيت البابونج', description: 'زيت البابونج المهدئ', price: 55 },
        { name: 'زيت القرفة', description: 'زيت القرفة العطري', price: 50 },
        { name: 'زيت الأوكالبتوس', description: 'زيت الأوكالبتوس الطبيعي', price: 45 },
        { name: 'زيت المشمش', description: 'زيت المشمش الطبيعي', price: 60 },
        { name: 'زيت الأرغان', description: 'زيت الأرغان المغربي الفاخر', price: 90 },
        { name: 'زيت النعناع', description: 'زيت النعناع العطري المنعش', price: 40 },
      ]
    }
  ]
};

async function addCleaningProducts() {
  try {
    await connectDB();
    console.log('🔄 بدء إضافة منتجات المنظفات ومستحضرات التجميل...\n');

    // البحث عن الفئة الرئيسية
    const category = await Category.findOne({
      where: { name: cleaningProducts.categoryName }
    });

    if (!category) {
      console.error(`❌ لم يتم العثور على فئة "${cleaningProducts.categoryName}"`);
      process.exit(1);
    }

    const categoryId = category.getDataValue('id');
    const categoryName = category.getDataValue('name');
    console.log(`✅ تم العثور على الفئة: ${categoryName} (ID: ${categoryId})\n`);

    // البحث عن القسم الفرعي أو إنشاءه
    let subCategory = await SubCategory.findOne({
      where: {
        name: cleaningProducts.subCategoryName,
        categoryId: categoryId
      }
    });

    if (!subCategory) {
      subCategory = await SubCategory.create({
        name: cleaningProducts.subCategoryName,
        categoryId: categoryId,
        image: '/images/placeholder.jpg'
      });
      console.log(`✅ تم إنشاء القسم الفرعي: ${cleaningProducts.subCategoryName}\n`);
    } else {
      console.log(`ℹ️  القسم الفرعي موجود مسبقاً: ${cleaningProducts.subCategoryName}\n`);
    }

    const subCategoryId = subCategory.getDataValue('id');

    let totalProducts = 0;

    // إضافة الوحدات والمنتجات
    for (const unitData of cleaningProducts.units) {
      console.log(`📦 معالجة الوحدة: ${unitData.name}`);

      // البحث عن الوحدة أو إنشاءها
      let unit = await Unit.findOne({
        where: {
          name: unitData.name,
          subCategoryId: subCategoryId
        }
      });

      if (!unit) {
        unit = await Unit.create({
          name: unitData.name,
          subCategoryId: subCategoryId,
          image: '/images/placeholder.jpg'
        });
        console.log(`  ✅ تم إنشاء الوحدة: ${unitData.name}`);
      } else {
        console.log(`  ℹ️  الوحدة موجودة مسبقاً: ${unitData.name}`);
      }

      const unitId = unit.getDataValue('id');

      // إضافة المنتجات
      let addedCount = 0;
      let skippedCount = 0;

      for (const product of unitData.products) {
        // التحقق من وجود المنتج
        const existingProduct = await Product.findOne({
          where: {
            name: product.name,
            subCategoryId: subCategoryId,
            unitId: unitId
          }
        });

        if (!existingProduct) {
          await Product.create({
            name: product.name,
            description: product.description,
            specifications: '',
            price: product.price,
            image: '/images/placeholder.jpg',
            subCategoryId: subCategoryId,
            unitId: unitId
          });
          addedCount++;
          totalProducts++;
        } else {
          skippedCount++;
        }
      }

      console.log(`  ✅ تم إضافة ${addedCount} منتج جديد`);
      if (skippedCount > 0) {
        console.log(`  ⏭️  تم تخطي ${skippedCount} منتج موجود مسبقاً`);
      }
      console.log('');
    }

    console.log('═══════════════════════════════════════');
    console.log(`✅ تم الانتهاء بنجاح!`);
    console.log(`📊 إجمالي المنتجات المضافة: ${totalProducts}`);
    console.log('═══════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ حدث خطأ:', error);
    process.exit(1);
  }
}

addCleaningProducts();
