import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  const { MONGO_URL } = process.env;

  if (!MONGO_URL) {
    throw new Error('MONGO_URL environment variable is not configured');
  }

  await mongoose.connect(MONGO_URL);
  console.log('MongoDB connection established');
};

export default connectMongoDB;
