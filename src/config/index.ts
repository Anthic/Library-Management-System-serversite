import dotenv from "dotenv";
dotenv.config();
const corsConfig = {
  origin: [
    "http://localhost:5173",
    "https://library-mangement-clientsite.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};
export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV,
  deploymentUrl: process.env.DEPLOYMENT_URL || "*",
  cors: corsConfig,
};
