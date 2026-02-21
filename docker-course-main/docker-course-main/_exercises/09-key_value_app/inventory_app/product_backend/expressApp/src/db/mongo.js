const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_HOST,
      MONGO_PORT = 27017,
      MONGO_DB,
      MONGO_AUTH_SOURCE = 'admin'
    } = process.env;

    if (!MONGO_USER || !MONGO_PASSWORD || !MONGO_HOST || !MONGO_DB) {
      throw new Error('Missing required MongoDB environment variables');
    }

    const mongoUri =
      `mongodb://${encodeURIComponent(MONGO_USER)}` +
      `:${encodeURIComponent(MONGO_PASSWORD)}` +
      `@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectMongo;
