import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  team: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.models.User ?? mongoose.model<UserDocument>("User", userSchema);
