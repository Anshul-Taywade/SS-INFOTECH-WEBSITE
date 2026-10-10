const mongoose = require('mongoose');
const env = require('./env');
const seedDatabase = require('./dbSeeder');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
    await seedDatabase();
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Server running in fallback mode. Database operations will error until MongoDB is active.');
  }
};

module.exports = connectDB;
