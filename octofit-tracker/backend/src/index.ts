import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database.js";
import { User } from "./models/user.js";
import { Team } from "./models/team.js";
import { Activity } from "./models/activity.js";
import { Workout } from "./models/workout.js";
import { Leaderboard } from "./models/leaderboard.js";

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "OctoFit Tracker backend is running.",
    apiBaseUrl: `${baseUrl}/api`,
    codespaceName: codespaceName ?? null,
  });
});

app.get(["/api/users", "/api/users/"], async (_, res) => {
  const users = await User.find().lean();
  res.json({ count: users.length, users });
});

app.get(["/api/teams", "/api/teams/"], async (_, res) => {
  const teams = await Team.find().lean();
  res.json({ count: teams.length, teams });
});

app.get(["/api/activities", "/api/activities/"], async (_, res) => {
  const activities = await Activity.find().lean();
  res.json({ count: activities.length, activities });
});

app.get(["/api/leaderboard", "/api/leaderboard/"], async (_, res) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
  res.json({ leaderboard });
});

app.get(["/api/workouts", "/api/workouts/"], async (_, res) => {
  const workouts = await Workout.find().lean();
  res.json({ count: workouts.length, workouts });
});

const startServer = async () => {
  try {
    await connectDatabase();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed; ensure mongod is running on port 27017.", error);
    process.exit(1);
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Backend listening on ${baseUrl}`);
  });
};

startServer();
