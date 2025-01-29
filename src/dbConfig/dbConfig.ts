import mongoose from 'mongoose';

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.error('MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.error('MongoDB connection error: ', err);
      process.exit(1);
    });
  } catch (error) {
    console.log('Something went wrong with the database connection');
    console.error(error);
  }
}
