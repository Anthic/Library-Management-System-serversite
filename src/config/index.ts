import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV,
  deploymentUrl: process.env.DEPLOYMENT_URL || "*",
};
