import express from "express";
import { User } from "../models/user.js";

const router = express.Router();

router.get("/", async (_, res) => {
  const users = await User.find().lean();
  res.json({ count: users.length, users });
});

router.post("/", async (req, res) => {
  const { name, email, team } = req.body;
  if (!name || !email || !team) {
    return res.status(400).json({ error: "name, email, and team are required" });
  }

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return res.status(409).json({ error: "A user with that email already exists" });
  }

  const user = await User.create({ name, email, team });
  res.status(201).json({ user });
});

export default router;
