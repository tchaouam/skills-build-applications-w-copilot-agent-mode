import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessGoal: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    focus: { type: String, required: true },
    members: { type: Number, default: 0 },
    captain: { type: String, default: '' },
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: String, required: true },
    focus: { type: String, default: 'General fitness' },
    isRecommended: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || model('User', userSchema);
export const Team = mongoose.models.Team || model('Team', teamSchema);
export const Activity = mongoose.models.Activity || model('Activity', activitySchema);
export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry || model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.models.Workout || model('Workout', workoutSchema);
