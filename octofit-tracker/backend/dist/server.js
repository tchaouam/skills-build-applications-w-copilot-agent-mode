import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
const app = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use(express.json());
const buildCollectionResponse = (resource, data) => ({
    resource,
    apiBaseUrl,
    count: data.length,
    data,
});
app.get('/api', (_req, res) => {
    res.json({
        message: 'Octofit Tracker API',
        apiBaseUrl,
        routes: [
            '/api/users/',
            '/api/teams/',
            '/api/activities/',
            '/api/leaderboard/',
            '/api/workouts/',
        ],
    });
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', port: PORT, apiBaseUrl });
});
app.get('/api/users/', async (_req, res) => {
    const users = await User.find({}).lean();
    res.json(buildCollectionResponse('users', users));
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await Team.find({}).lean();
    res.json(buildCollectionResponse('teams', teams));
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await Activity.find({}).lean();
    res.json(buildCollectionResponse('activities', activities));
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find({}).sort({ score: -1 }).lean();
    res.json(buildCollectionResponse('leaderboard', leaderboard));
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await Workout.find({}).lean();
    res.json(buildCollectionResponse('workouts', workouts));
});
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db');
        console.log('Connected to MongoDB octofit_db');
        app.listen(PORT, () => {
            console.log(`Octofit API listening on port ${PORT}`);
            console.log(`API base URL: ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start Octofit API:', error);
        process.exit(1);
    }
};
startServer();
export default app;
