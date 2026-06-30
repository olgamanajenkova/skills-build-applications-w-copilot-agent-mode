import mongoose from "mongoose";

export interface ActivityDocument extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm: number;
  points: number;
  date: Date;
}

const activitySchema = new mongoose.Schema<ActivityDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Activity = mongoose.models.Activity ?? mongoose.model<ActivityDocument>("Activity", activitySchema);
