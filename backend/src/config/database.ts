import { Sequelize } from 'sequelize';

// Support both DATABASE_URL (production) and individual credentials (development)
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: console.log,
      dialectOptions: {
        connectTimeout: 30000,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000,
      },
    })
  : new Sequelize(
      process.env.DB_NAME || 'waqif_international',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || 'postgres',
      {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        dialect: 'postgres',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );

export const connectDB = async (): Promise<void> => {
  console.log('🔄 Connecting to PostgreSQL...');
  console.log('📍 DATABASE_URL exists:', !!process.env.DATABASE_URL);
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected Successfully');
    
    // Sync models
    await sequelize.sync({ alter: false });
    console.log('✅ Database models synchronized');
  } catch (error) {
    console.error('❌ PostgreSQL Connection Error:', error);
    // Don't exit, let the server run and handle errors gracefully
  }
};

export default sequelize;

