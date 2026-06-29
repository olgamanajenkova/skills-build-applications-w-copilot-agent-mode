import mongoose from "mongoose";
import { User } from "../models/user.js";
import { Team } from "../models/team.js";
import { Activity } from "../models/activity.js";
import { Workout } from "../models/workout.js";
import { Leaderboard } from "../models/leaderboard.js";

const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/octofit_db";

const users = [
  { name: "Ava Carter", email: "ava.carter@example.com", team: "Blue Sharks" },
  { name: "Noah Patel", email: "noah.patel@example.com", team: "Red Rockets" },
  { name: "Mia Chen", email: "mia.chen@example.com", team: "Blue Sharks" },
  { name: "Ethan King", email: "ethan.king@example.com", team: "Green Grit" },
];

const teams = [
  { name: "Blue Sharks", members: 2, points: 320 },
  { name: "Red Rockets", members: 1, points: 140 },
  { name: "Green Grit", members: 1, points: 90 },
];

const workouts = [
  {
    title: "Morning Run",
    type: "cardio",
    durationMinutes: 30,
    difficulty: "easy",
    description: "A refreshing 5K run to start the day and boost your aerobic base.",
  },
  {
    title: "Core Circuit",
    type: "strength",
    durationMinutes: 25,
    difficulty: "medium",
    description: "A fast-paced bodyweight circuit to strengthen abs and lower back.",
  },
  {
    title: "HIIT Sprint",
    type: "cardio",
    durationMinutes: 20,
    difficulty: "hard",
    description: "High-intensity intervals that alternate sprints with recovery jogs.",
  },
  {
    title: "Recovery Yoga",
    type: "flexibility",
    durationMinutes: 40,
    difficulty: "easy",
    description: "Gentle stretches and breathing exercises to help muscles recover.",
  },
];

const activities = [
  {
    userEmail: "ava.carter@example.com",
    type: "run",
    durationMinutes: 35,
    distanceKm: 6.1,
    points: 70,
    date: new Date("2026-06-24T07:15:00.000Z"),
  },
  {
    userEmail: "noah.patel@example.com",
    type: "strength",
    durationMinutes: 45,
    distanceKm: 0,
    points: 50,
    date: new Date("2026-06-24T18:00:00.000Z"),
  },
  {
    userEmail: "mia.chen@example.com",
    type: "bike",
    durationMinutes: 55,
    distanceKm: 18.2,
    points: 95,
    date: new Date("2026-06-23T16:45:00.000Z"),
  },
  {
    userEmail: "ethan.king@example.com",
    type: "swim",
    durationMinutes: 30,
    distanceKm: 1.2,
    points: 90,
    date: new Date("2026-06-23T08:30:00.000Z"),
  },
];

const leaderboard = [
  { userEmail: "mia.chen@example.com", name: "Mia Chen", team: "Blue Sharks", points: 95, rank: 1 },
  { userEmail: "ava.carter@example.com", name: "Ava Carter", team: "Blue Sharks", points: 70, rank: 2 },
  { userEmail: "noah.patel@example.com", name: "Noah Patel", team: "Red Rockets", points: 50, rank: 3 },
  { userEmail: "ethan.king@example.com", name: "Ethan King", team: "Green Grit", points: 90, rank: 4 },
];

const seedDatabase = async () => {
  console.log("Seed the octofit_db database with test data");

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB at", mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  const createdUsers = await User.insertMany(users);
  const createdTeams = await Team.insertMany(teams);
  await Workout.insertMany(workouts);

  const userMap = createdUsers.reduce<Record<string, typeof createdUsers[number]>>((map, user) => {
    map[user.email] = user;
    return map;
  }, {});

  const activityDocs = activities.map((activity) => ({
    userId: userMap[activity.userEmail]._id,
    type: activity.type,
    durationMinutes: activity.durationMinutes,
    distanceKm: activity.distanceKm,
    points: activity.points,
    date: activity.date,
  }));

  await Activity.insertMany(activityDocs);

  const leaderboardDocs = leaderboard.map((entry) => ({
    userId: userMap[entry.userEmail]._id,
    name: entry.name,
    team: entry.team,
    points: entry.points,
    rank: entry.rank,
  }));

  await Leaderboard.insertMany(leaderboardDocs);

  console.log("Seed complete: users", createdUsers.length, "teams", createdTeams.length);
  console.log("Seed complete: workouts", workouts.length, "activities", activityDocs.length, "leaderboard", leaderboardDocs.length);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
};

seedDatabase().catch((error) => {
  console.error("Failed to seed octofit_db:", error);
  process.exit(1);
});
