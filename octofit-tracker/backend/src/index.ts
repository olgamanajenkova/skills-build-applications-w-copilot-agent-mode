import { connectDatabase } from "./config/database.js";
import { app, port, baseUrl } from "./app.js";

const startServer = async () => {
  try {
    await connectDatabase();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed; ensure mongod is running on port 27017.", error);
    process.exit(1);
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });
};

startServer();
