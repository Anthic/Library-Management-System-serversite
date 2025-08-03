import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config";
import router from "./modules/router/allRoute";

const app = express();

app.use(
  cors({
    origin: [config.deploymentUrl, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(router);
app.get("/", (req, res) => {
  res.send("Library Management System Server is running");
});

app.listen(config.port, async () => {
  console.log(
    `Server is running on port ${config.port} in ${config.nodeEnv} mode`
  );
});

async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(config.mongoUri as string);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
}
connectToDatabase();
