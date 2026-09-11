import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Ava Patel',
                email: 'ava.patel@octofit.com',
                fitnessGoal: 'Marathon prep',
                isActive: true,
            },
            {
                name: 'Leo Kim',
                email: 'leo.kim@octofit.com',
                fitnessGoal: 'Strength gain',
                isActive: true,
            },
            {
                name: 'Maya Chen',
                email: 'maya.chen@octofit.com',
                fitnessGoal: 'Mobility and recovery',
                isActive: true,
            },
        ]);
        const teams = await Team.insertMany([
            {
                name: 'Trail Blazers',
                focus: 'Endurance',
                members: 12,
                captain: 'Ava Patel',
            },
            {
                name: 'Iron Circuit',
                focus: 'Strength',
                members: 9,
                captain: 'Leo Kim',
            },
            {
                name: 'Recovery Crew',
                focus: 'Mobility',
                members: 7,
                captain: 'Maya Chen',
            },
        ]);
        await User.updateMany({}, {
            $set: {
                teamId: teams[0]._id,
            },
        });
        const userIds = users.map((user) => user._id);
        await Activity.insertMany([
            {
                userId: userIds[0],
                type: 'Run',
                durationMinutes: 34,
                calories: 420,
                date: new Date('2026-09-01T06:00:00Z'),
            },
            {
                userId: userIds[1],
                type: 'Weight Training',
                durationMinutes: 52,
                calories: 580,
                date: new Date('2026-09-02T18:30:00Z'),
            },
            {
                userId: userIds[2],
                type: 'Yoga',
                durationMinutes: 28,
                calories: 180,
                date: new Date('2026-09-03T07:15:00Z'),
            },
        ]);
        await LeaderboardEntry.insertMany([
            {
                userId: userIds[0],
                name: 'Ava Patel',
                score: 980,
                streak: 12,
            },
            {
                userId: userIds[1],
                name: 'Leo Kim',
                score: 940,
                streak: 9,
            },
            {
                userId: userIds[2],
                name: 'Maya Chen',
                score: 885,
                streak: 7,
            },
        ]);
        await Workout.insertMany([
            {
                name: 'Hill Interval',
                level: 'Intermediate',
                duration: '30 minutes',
                focus: 'Cardio endurance',
                isRecommended: true,
            },
            {
                name: 'Upper Body Burn',
                level: 'Advanced',
                duration: '40 minutes',
                focus: 'Strength',
                isRecommended: true,
            },
            {
                name: 'Core Flow',
                level: 'Beginner',
                duration: '20 minutes',
                focus: 'Mobility',
                isRecommended: true,
            },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
