import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import { User, Category, SubCategory, Product } from '../models/index.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.destroy({ where: {}, force: true });
    await SubCategory.destroy({ where: {}, force: true });
    await Category.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });

    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@waqif.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('✅ Created admin user:', admin.username);

    // Create categories
    const cat1 = await Category.create({ name: 'كيماويات وأوساط زراعية', image: '/images/category-chemicals.jpg' });
    await cat1.reload();
    const cat2 = await Category.create({ name: 'مستلزمات ومعدات طبية', image: '/images/FB_IMG_1762725738851.jpg' });
    await cat2.reload();
    const cat3 = await Category.create({ name: 'مستلزمات مخبرية', image: '/images/category-lab-equipment.jpg' });
    await cat3.reload();
    const cat4 = await Category.create({ name: 'أجهزة ومعدات قياس', image: '/images/slider-1.jpg' });
    await cat4.reload();
    const cat5 = await Category.create({ name: 'معامل تعليمية', image: '/images/category-surgery-equipment.jpg' });
    await cat5.reload();
    console.log(`✅ Created 5 categories`);

    // Create subcategories
    const sub1 = await SubCategory.create({ categoryId: cat1.getDataValue('id'), name: 'كيماويات مخبرية' });
    const sub2 = await SubCategory.create({ categoryId: cat1.getDataValue('id'), name: 'أوساط زراعية' });
    const sub3 = await SubCategory.create({ categoryId: cat1.getDataValue('id'), name: 'منظفات ومستحضرات تجميل' });
    const sub4 = await SubCategory.create({ categoryId: cat2.getDataValue('id'), name: 'مستلزمات استهلاكية' });
    const sub5 = await SubCategory.create({ categoryId: cat2.getDataValue('id'), name: 'أجهزة ومعدات طبية' });
    const sub6 = await SubCategory.create({ categoryId: cat2.getDataValue('id'), name: 'أثاث وكراسي معاقين' });
    const sub7 = await SubCategory.create({ categoryId: cat3.getDataValue('id'), name: 'أجهزة مخبرية' });
    const sub8 = await SubCategory.create({ categoryId: cat3.getDataValue('id'), name: 'زجاجات بلاستيك' });
    const sub9 = await SubCategory.create({ categoryId: cat3.getDataValue('id'), name: 'محاليل وكواشف' });
    const sub10 = await SubCategory.create({ categoryId: cat4.getDataValue('id'), name: 'أجهزة قياس عامة' });
    const sub11 = await SubCategory.create({ categoryId: cat5.getDataValue('id'), name: 'فيزياء' });
    const sub12 = await SubCategory.create({ categoryId: cat5.getDataValue('id'), name: 'معامل تشريح' });
    const sub13 = await SubCategory.create({ categoryId: cat5.getDataValue('id'), name: 'أحياء' });
    console.log(`✅ Created 13 subcategories`);

    // Create sample products
    await Product.create({
      subCategoryId: sub1.getDataValue('id'),
      name: 'حمض الكبريتيك (H₂SO₄)',
      description: 'حمض معدني قوي.',
      specifications: 'التركيز 98%',
      price: 60,
      image: '/images/product-hydrochloric-acid.jpg',
    });
    await Product.create({
      subCategoryId: sub1.getDataValue('id'),
      name: 'هيدروكسيد الصوديوم (NaOH)',
      description: 'قاعدة قوية تستخدم في الصناعة.',
      specifications: 'نقاء 99%',
      price: 45,
      image: '/images/product-ethanol.jpg',
    });
    await Product.create({
      subCategoryId: sub4.getDataValue('id'),
      name: 'قفازات طبية',
      description: 'لاتكس معقم.',
      specifications: 'علبة 100 حبة',
      price: 20,
      image: '/images/slider-2.jpg',
    });
    console.log(`✅ Created 3 products`);

    console.log('\n🎉 Seeding completed successfully!');
    console.log('\n📝 Admin credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the admin password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();
