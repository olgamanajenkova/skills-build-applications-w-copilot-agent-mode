import mongoose from "mongoose";

export interface LeaderboardDocument extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  team: string;
  points: number;
  rank: number;
}

const leaderboardSchema = new mongoose.Schema<LeaderboardDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.models.Leaderboard ?? mongoose.model<LeaderboardDocument>("Leaderboard", leaderboardSchema);
