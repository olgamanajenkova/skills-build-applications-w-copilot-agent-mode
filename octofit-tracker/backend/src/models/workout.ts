import mongoose from "mongoose";

export interface WorkoutDocument extends mongoose.Document {
  title: string;
  type: string;
  durationMinutes: number;
  difficulty: string;
  description: string;
}

const workoutSchema = new mongoose.Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    difficulty: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const Workout = mongoose.models.Workout ?? mongoose.model<WorkoutDocument>("Workout", workoutSchema);
