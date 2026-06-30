import express from "express";
import { Activity } from "../models/activity.js";

const router = express.Router();

router.get("/", async (_, res) => {
  const activities = await Activity.find().lean();
  res.json({ count: activities.length, activities });
});

router.post("/", async (req, res) => {
  const { userId, type, durationMinutes, distanceKm, points, date } = req.body;
  if (!userId || !type || durationMinutes == null || distanceKm == null || points == null || !date) {
    return res.status(400).json({ error: "userId, type, durationMinutes, distanceKm, points, and date are required" });
  }

  const activity = await Activity.create({
    userId,
    type,
    durationMinutes,
    distanceKm,
    points,
    date: new Date(date),
  });

  res.status(201).json({ activity });
});

export default router;
