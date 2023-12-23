import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export const connectToDatabase = async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
  
    await mongoose.connect(mongoUri);
  };

export const closeDatabase = async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  };