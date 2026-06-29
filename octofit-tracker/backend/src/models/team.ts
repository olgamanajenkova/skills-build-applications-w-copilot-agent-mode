import mongoose from "mongoose";

export interface TeamDocument extends mongoose.Document {
  name: string;
  members: number;
  points: number;
}

const teamSchema = new mongoose.Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true },
    members: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Team = mongoose.models.Team ?? mongoose.model<TeamDocument>("Team", teamSchema);
