import express from "express";
import cors from "cors";
import { Team } from "./models/team.js";
import { Leaderboard } from "./models/leaderboard.js";
import { Workout } from "./models/workout.js";
import usersRouter from "./routes/users.js";
import activitiesRouter from "./routes/activities.js";

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const allowedOrigins = [baseUrl, `http://localhost:${port}`, `http://localhost:5173`];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS policy does not allow access from ${origin}`));
    },
  })
);

app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "OctoFit Tracker backend is running.",
    apiBaseUrl: `${baseUrl}/api`,
    codespaceName: codespaceName ?? null,
  });
});

app.use("/api/users", usersRouter);

app.get(["/api/teams", "/api/teams/"], async (_, res) => {
  const teams = await Team.find().lean();
  res.json({ count: teams.length, teams });
});

app.use("/api/activities", activitiesRouter);

app.get(["/api/leaderboard", "/api/leaderboard/"], async (_, res) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
  res.json({ leaderboard });
});

app.get(["/api/workouts", "/api/workouts/"], async (_, res) => {
  const workouts = await Workout.find().lean();
  res.json({ count: workouts.length, workouts });
});

app.get("/config", (_, res) => {
  res.json({ apiBaseUrl: baseUrl, codespaceName: codespaceName ?? null });
});

export { app, port, baseUrl, codespaceName, allowedOrigins };
