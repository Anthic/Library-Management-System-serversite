"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const corsConfig = {
    origin: [
        "http://localhost:5173",
        "https://library-mangement-clientsite.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};
exports.default = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    nodeEnv: process.env.NODE_ENV,
    deploymentUrl: process.env.DEPLOYMENT_URL || "*",
    cors: corsConfig,
};
