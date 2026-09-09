const mongoose = require('mongoose');
const env = require('./env');

let isConnected = false;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      bufferCommands: false,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Database operations will error until MongoDB is active.');
  }
};

module.exports = connectDB;

