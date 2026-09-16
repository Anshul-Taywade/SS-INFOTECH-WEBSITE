const mongoose = require('mongoose');
const env = require('./env');

let isConnected = false;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  // If running on Vercel without a cloud MongoDB Atlas URI, skip localhost to prevent serverless execution timeout
  if (process.env.VERCEL && (!env.MONGO_URI || env.MONGO_URI.includes('localhost') || env.MONGO_URI.includes('127.0.0.1'))) {
    return;
  }

  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 4000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Notice: ${error.message}. Running in instant-response fallback mode.`);
  }
};

module.exports = connectDB;


