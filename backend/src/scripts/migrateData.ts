import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Old database (source)
const oldDb = new Sequelize('postgresql://postgres:kdTukmKlrFwyNayMniACKVYyBYkkySzp@switchback.proxy.rlwy.net:20018/railway', {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
    connectTimeout: 60000,
  },
});

// New database (target)
const newDb = new Sequelize('postgresql://postgres:CInTouKuwPoEzGguBWVARKxVCnxJdFKZ@centerbeam.proxy.rlwy.net:49741/railway', {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
    connectTimeout: 60000,
  },
});

async function migrateData() {
  try {
    console.log('🔄 Connecting to databases...');
    await oldDb.authenticate();
    console.log('✅ Connected to old database');
    await newDb.authenticate();
    console.log('✅ Connected to new database');

    // Clear new database
    console.log('🗑️ Clearing new database...');
    await newDb.query('TRUNCATE products, sub_categories, categories, users RESTART IDENTITY CASCADE');

    // Migrate users
    console.log('📦 Migrating users...');
    const [users] = await oldDb.query('SELECT * FROM users');
    for (const user of users as any[]) {
      await newDb.query(
        `INSERT INTO users (id, username, email, password, role, "createdAt", "updatedAt") 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        { bind: [user.id, user.username, user.email, user.password, user.role, user.createdAt, user.updatedAt] }
      );
    }
    console.log(`✅ Migrated ${(users as any[]).length} users`);

    // Migrate categories
    console.log('📦 Migrating categories...');
    const [categories] = await oldDb.query('SELECT * FROM categories ORDER BY id');
    for (const cat of categories as any[]) {
      await newDb.query(
        `INSERT INTO categories (id, name, image, "createdAt", "updatedAt") 
         VALUES ($1, $2, $3, $4, $5)`,
        { bind: [cat.id, cat.name, cat.image, cat.createdAt, cat.updatedAt] }
      );
    }
    console.log(`✅ Migrated ${(categories as any[]).length} categories`);

    // Migrate subcategories
    console.log('📦 Migrating subcategories...');
    const [subcategories] = await oldDb.query('SELECT * FROM sub_categories ORDER BY id');
    for (const sub of subcategories as any[]) {
      await newDb.query(
        `INSERT INTO sub_categories (id, "categoryId", name, image, "createdAt", "updatedAt") 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        { bind: [sub.id, sub.categoryId, sub.name, sub.image, sub.createdAt, sub.updatedAt] }
      );
    }
    console.log(`✅ Migrated ${(subcategories as any[]).length} subcategories`);

    // Migrate products
    console.log('📦 Migrating products...');
    const [products] = await oldDb.query('SELECT * FROM products ORDER BY id');
    let count = 0;
    for (const prod of products as any[]) {
      try {
        await newDb.query(
          `INSERT INTO products (id, "subCategoryId", name, description, specifications, price, image, "createdAt", "updatedAt") 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          { bind: [prod.id, prod.subCategoryId, prod.name, prod.description, prod.specifications, prod.price, prod.image, prod.createdAt, prod.updatedAt] }
        );
        count++;
      } catch (e) {
        console.log(`⚠️ Skipped product ${prod.id}: ${prod.name}`);
      }
    }
    console.log(`✅ Migrated ${count} products`);

    // Update sequences
    console.log('🔄 Updating sequences...');
    await newDb.query(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`);
    await newDb.query(`SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories))`);
    await newDb.query(`SELECT setval('sub_categories_id_seq', (SELECT MAX(id) FROM sub_categories))`);
    await newDb.query(`SELECT setval('products_id_seq', (SELECT MAX(id) FROM products))`);

    console.log('\n🎉 Migration completed successfully!');
    
    // Show counts
    const [userCount] = await newDb.query('SELECT COUNT(*) as count FROM users');
    const [catCount] = await newDb.query('SELECT COUNT(*) as count FROM categories');
    const [subCount] = await newDb.query('SELECT COUNT(*) as count FROM sub_categories');
    const [prodCount] = await newDb.query('SELECT COUNT(*) as count FROM products');
    
    console.log('\n📊 Final counts:');
    console.log(`   Users: ${(userCount as any[])[0].count}`);
    console.log(`   Categories: ${(catCount as any[])[0].count}`);
    console.log(`   Subcategories: ${(subCount as any[])[0].count}`);
    console.log(`   Products: ${(prodCount as any[])[0].count}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

migrateData();
