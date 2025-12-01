
import type { Category, Product, SubCategory } from './types';

export const initialCategories: Category[] = [
  { id: 1, name: 'كيماويات وأوساط زراعية', image: '/images/category-chemicals.jpg' },
  { id: 2, name: 'مستلزمات ومعدات طبية', image: '/images/FB_IMG_1762725738851.jpg' },
  { id: 3, name: 'مستلزمات مخبرية', image: '/images/category-lab-equipment.jpg' },
  { id: 4, name: 'أجهزة ومعدات قياس', image: '/images/slider-1.jpg' },
  { id: 5, name: 'معامل تعليمية', image: '/images/category-surgery-equipment.jpg' },
];

export const initialSubCategories: SubCategory[] = [
  // 1. Chemicals
  { id: 11, categoryId: 1, name: 'كيماويات مخبرية' },
  { id: 12, categoryId: 1, name: 'أوساط زراعية' },
  { id: 13, categoryId: 1, name: 'منظفات ومستحضرات تجميل' },
  // 2. Medical
  { id: 21, categoryId: 2, name: 'مستلزمات استهلاكية' },
  { id: 22, categoryId: 2, name: 'أجهزة ومعدات طبية' },
  { id: 23, categoryId: 2, name: 'أثاث وكراسي معاقين' },
  // 3. Lab Supplies
  { id: 31, categoryId: 3, name: 'أجهزة مخبرية' },
  { id: 32, categoryId: 3, name: 'زجاجات بلاستيك' },
  { id: 33, categoryId: 3, name: 'محاليل وكواشف' },
  // 4. Measurement
  { id: 41, categoryId: 4, name: 'أجهزة قياس عامة' },
  // 5. Educational
  { id: 51, categoryId: 5, name: 'فيزياء' },
  { id: 52, categoryId: 5, name: 'معامل تشريح' },
  { id: 53, categoryId: 5, name: 'أحياء' },
];

export const initialProducts: Product[] = [
  // 1.1 Lab Chemicals
  { id: 1101, subCategoryId: 11, name: 'حمض الكبريتيك (H₂SO₄)', image: '/images/product-hydrochloric-acid.jpg', description: 'حمض معدني قوي.', specifications: 'التركيز 98%', price: 60 },
  { id: 1102, subCategoryId: 11, name: 'هيدروكسيد الصوديوم (NaOH)', image: '/images/product-ethanol.jpg', description: 'قاعدة قوية تستخدم في الصناعة.', specifications: 'نقاء 99%', price: 45 },
  { id: 1103, subCategoryId: 11, name: 'إيثانول نقي للمختبرات', image: '/images/product-ethanol.jpg', description: 'مذيب عضوي ومعقم.', specifications: '99.9% Absolute', price: 80 },

  // 1.2 Agricultural
  { id: 1201, subCategoryId: 12, name: 'بيتموس (Peat Moss)', image: '/images/category-chemicals.jpg', description: 'وسط زراعي عضوي.', specifications: '80 لتر', price: 35 },
  { id: 1202, subCategoryId: 12, name: 'أسمدة مركبة NPK', image: '/images/product-hydrochloric-acid.jpg', description: 'سماد متوازن للنباتات.', specifications: '20-20-20', price: 50 },
  { id: 1203, subCategoryId: 12, name: 'مبيدات فطرية وزيت النيم', image: '/images/category-chemicals.jpg', description: 'مكافحة الآفات العضوية.', specifications: 'مركز 1 لتر', price: 70 },

  // 1.3 Detergents/Cosmetics
  { id: 1301, subCategoryId: 13, name: 'سائل غسيل الأواني', image: '/images/FB_IMG_1762725702171.jpg', description: 'تنظيف فعال ودهون أقل.', specifications: '5 لتر', price: 25 },
  { id: 1302, subCategoryId: 13, name: 'شامبو وبلسم شعر', image: '/images/FB_IMG_1762725702171.jpg', description: 'عناية بالشعر.', specifications: 'مستخلصات طبيعية', price: 30 },
  { id: 1303, subCategoryId: 13, name: 'كريم مرطب للبشرة', image: '/images/FB_IMG_1762725702171.jpg', description: 'ترطيب عميق.', specifications: '500 مل', price: 40 },

  // 2.1 Medical Consumables
  { id: 2101, subCategoryId: 21, name: 'قفازات طبية', image: '/images/slider-2.jpg', description: 'لاتكس معقم.', specifications: 'علبة 100 حبة', price: 20 },
  { id: 2102, subCategoryId: 21, name: 'شاش معقم وضمادات', image: '/images/FB_IMG_1762725738851.jpg', description: 'للجروح والإسعافات.', specifications: 'أحجام مختلفة', price: 15 },
  { id: 2103, subCategoryId: 21, name: 'محاقن (سرنجات)', image: '/images/slider-2.jpg', description: 'استخدام مرة واحدة.', specifications: '5 مل / 10 مل', price: 10 },

  // 2.2 Medical Devices
  { id: 2201, subCategoryId: 22, name: 'جهاز قياس الضغط', image: '/images/placeholder.jpg', description: 'ديجيتال دقيق.', specifications: 'ماركة عالمية', price: 200 },
  { id: 2202, subCategoryId: 22, name: 'جهاز تخطيط القلب (ECG)', image: '/images/product-scalpel.jpg', description: 'محمول للعيادات.', specifications: '12 Channel', price: 3500 },
  { id: 2203, subCategoryId: 22, name: 'جهاز شفط (Suction)', image: '/images/product-scalpel.jpg', description: 'جهاز شفط سوائل جراحي.', specifications: 'محمول', price: 2800 },

  // 2.3 Furniture
  { id: 2301, subCategoryId: 23, name: 'كرسي متحرك', image: '/images/placeholder.jpg', description: 'خفيف الوزن وقابل للطي.', specifications: 'تحمل 120 كجم', price: 450 },
  { id: 2302, subCategoryId: 23, name: 'سرير طبي كهربائي', image: '/images/placeholder.jpg', description: 'تحكم كامل بالوضعية.', specifications: '3 حركات', price: 4000 },
  { id: 2303, subCategoryId: 23, name: 'طاولة فحص المرضى', image: '/images/placeholder.jpg', description: 'عيادات ومستشفيات.', specifications: 'جلد صناعي', price: 800 },

  // 3.1 Lab Devices
  { id: 3101, subCategoryId: 31, name: 'جهاز طرد مركزي (Centrifuge)', image: '/images/product-centrifuge.jpg', description: 'فصل العينات.', specifications: '4000 RPM', price: 1500 },
  { id: 3102, subCategoryId: 31, name: 'جهاز حاضنة/رجاج (Shaker)', image: '/images/FB_IMG_1762725714464.jpg', description: 'تحكم في الحرارة والسرعة.', specifications: 'ديجيتال', price: 2200 },
  { id: 3103, subCategoryId: 31, name: 'ماصة أوتوماتيكية', image: '/images/product-microscope.jpg', description: 'سحب عينات دقيق.', specifications: '10-100 ميكرولتر', price: 300 },

  // 3.2 Plastic Ware
  { id: 3201, subCategoryId: 32, name: 'أنابيب اختبار', image: '/images/slider-3.jpg', description: 'زجاج وبلاستيك.', specifications: '500 حبة', price: 50 },
  { id: 3202, subCategoryId: 32, name: 'زجاجات عينات', image: '/images/product-ethanol.jpg', description: 'لحفظ المحاليل.', specifications: 'بلاستيك مقوى', price: 12 },
  { id: 3203, subCategoryId: 32, name: 'دوارق وأكواب', image: '/images/slider-3.jpg', description: 'مدرجة.', specifications: 'زجاج', price: 80 },

  // 3.3 Reagents
  { id: 3301, subCategoryId: 33, name: 'محلول كلوريد الصوديوم', image: '/images/category-chemicals.jpg', description: 'للمعايرة.', specifications: '0.1 N', price: 40 },
  { id: 3302, subCategoryId: 33, name: 'كواشف كيميائية', image: '/images/category-chemicals.jpg', description: 'مجموعة كواشف.', specifications: 'محلول 1%', price: 35 },
  { id: 3303, subCategoryId: 33, name: 'نترات الفضة', image: '/images/category-chemicals.jpg', description: 'كاشف هاليدات.', specifications: 'عالي النقاء', price: 150 },

  // 4.1 Measurement Devices
  { id: 4101, subCategoryId: 41, name: 'ميزان حساس إلكتروني', image: '/images/slider-1.jpg', description: 'ميزان دقيق للمختبرات.', specifications: 'دقة 0.01g', price: 500 },
  { id: 4102, subCategoryId: 41, name: 'جهاز قياس الحموضة (pH Meter)', image: '/images/product-scissors.jpg', description: 'قلم قياس رقمي.', specifications: 'دقة عالية', price: 150 },

  // 5.1 Physics
  { id: 5101, subCategoryId: 51, name: 'أدوات تجارب فيزياء', image: '/images/FB_IMG_1762725692916.jpg', description: 'طقم تعليمي شامل.', specifications: 'ميكانيكا وكهرباء', price: 250 },
  { id: 5102, subCategoryId: 51, name: 'موازين ومكاييل', image: '/images/slider-1.jpg', description: 'تجارب الكتلة.', specifications: 'معدني', price: 40 },
  { id: 5103, subCategoryId: 51, name: 'أنابيب أشعة', image: '/images/placeholder.jpg', description: 'تجارب خصائص الضوء.', specifications: 'مع حامل', price: 600 },

  // 5.2 Anatomy
  { id: 5201, subCategoryId: 52, name: 'هيكل عظمي تعليمي', image: '/images/product-incubator.jpg', description: 'نموذج بالحجم الطبيعي.', specifications: 'PVC', price: 900 },
  { id: 5202, subCategoryId: 52, name: 'نماذج أعضاء بشرية', image: '/images/category-surgery-equipment.jpg', description: 'قلب، عين، جلد.', specifications: 'ملون', price: 150 },
  { id: 5203, subCategoryId: 52, name: 'مجسمات تشريحية', image: '/images/category-surgery-equipment.jpg', description: 'تفاصيل دقيقة.', specifications: 'مجموعة', price: 200 },

  // 5.3 Biology
  { id: 5301, subCategoryId: 53, name: 'ميكروسكوب ضوئي', image: '/images/category-lab-equipment.jpg', description: 'للمدارس والجامعات.', specifications: '40x-1000x', price: 850 },
  { id: 5302, subCategoryId: 53, name: 'شرائح مجهرية', image: '/images/slider-2.jpg', description: 'عينات جاهزة.', specifications: 'طقم', price: 100 },
  { id: 5303, subCategoryId: 53, name: 'أدوات تشريح', image: '/images/placeholder.jpg', description: 'مشارط ومقصات.', specifications: 'ستانلس ستيل', price: 120 },
];
