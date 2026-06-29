import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/octofit-tracker";

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "OctoFit Tracker backend is running." });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB at", mongoUri);
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
