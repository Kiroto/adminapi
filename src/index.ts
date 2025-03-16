import express from 'express';
import mongoose from "mongoose";
import fs from 'fs';
import https from 'https';
import dotenv from '@dotenvx/dotenvx';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 443;

const options: https.ServerOptions = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt'),
    minVersion: 'TLSv1.2'
};

app.use(express.json()); // Allow JSON parsing

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log('User Profile Service connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the user schema
const userProfileSchema = new mongoose.Schema({
    profileName: String,
    profileLastName: String,
    cellphoneNumber: String,
    emailAddress: String
});

// Create a model
const UserProfileModel = mongoose.model('UserProfile', userProfileSchema);

app.put('/create-profile', async (req, res) => {
    try {
        const userProfile = new UserProfileModel(req.body);
        await userProfile.save();
        res.status(201).json({ message: 'Profile created successfully', userProfile });
    } catch (error: any) {
        console.error('Error creating profile:', error);
        res.status(400).json({ error: error.message });
    }
});

app.put('/update-profile/:id', async (req, res) => {
    try {
        const updatedProfile = await UserProfileModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProfile) {
            res.status(404).json({ message: 'Profile not found' });
            return;
        }
        res.status(204).json({ message: 'Profile updated successfully', updatedProfile });
    } catch (error: any) {
        console.error('Error updating profile:', error);
        res.status(400).json({ error: error.message });
    }
});

app.get('/get-profile/:id', async (req, res) => {
    try {
        const userProfile = await UserProfileModel.findById(req.params.id);
        if (!userProfile) {
            res.status(404).json({ message: 'Profile not found' });
            return;
        }
        res.status(200).json(userProfile);
    } catch (error: any) {
        console.error('Error retrieving profile:', error);
        res.status(400).json({ error: error.message });
    }
});

app.delete('/delete-profile/:id', async (req, res) => {
    try {
        const deletedProfile = await UserProfileModel.findByIdAndDelete(req.params.id);
        if (!deletedProfile) {
            res.status(404).json({ message: 'Profile not found' });
            return;
        }
        res.status(200).json({ message: 'Profile deleted successfully', deletedProfile });
    } catch (error: any) {
        console.error('Error deleting profile:', error);
        res.status(400).json({ error: error.message });
    }
});

// Start HTTPS server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Secure Profile Service running at https://localhost:${PORT}`);
});
