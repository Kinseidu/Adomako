import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "./logger";

export const connectDatabase = async (): Promise<typeof mongoose> => {
  const uri = env.mongodbUri;

  if (!uri) {
    logger.warn("MONGODB_URI is not set. Skipping database connection for development.");
    return mongoose;
  }

  mongoose.set("strictQuery", true);

  try {
  const connection = await mongoose.connect(uri);
  logger.info(`✅ MongoDB connected: ${connection.connection.host}/${connection.connection.name}`);
  if (process.env.NODE_ENV !== "production") {
    console.log(`✅ [DEV] MongoDB connected: ${connection.connection.host}/${connection.connection.name}`);
  }
  return connection;
} catch (error: any) {
  logger.error("❌ MongoDB connection failed. Check your MONGO_URI and credentials.", error.message);
  process.exit(1); // fail fast
}

};



export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};

