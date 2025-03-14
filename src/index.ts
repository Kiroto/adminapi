import express from 'express';
import mongoose from "mongoose";
import dotenv from '@dotenvx/dotenvx';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
    console.log('Received request at /create-profile:', req.body);
    res.status(200).json({ message: 'Profile creation endpoint hit' });
});

app.put('/update-profile', async (req, res) => {
    console.log('Received request at /update-profile:', req.body);
    res.status(200).json({ message: 'Profile update endpoint hit' });
});

app.get('/get-profile', async (req, res) => {
    console.log('Received request at /get-profile:', req.query);
    res.status(200).json({ message: 'Profile retrieval endpoint hit' });
});

app.delete('/delete-profile', async (req, res) => {
    console.log('Received request at /delete-profile:', req.query);
    res.status(200).json({ message: 'Profile deletion endpoint hit' });
});


app.listen(PORT, async () => {
    console.log(`Profile service running at port ${PORT}`);
});
