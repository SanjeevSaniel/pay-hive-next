import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    };

    try {
      console.log('Connecting to MongoDB...');
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      });
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to connect to MongoDB:', e);
    throw e;
  }

  return cached.conn;
}
