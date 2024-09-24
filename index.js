const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/college_events', { useNewUrlParser: true, useUnifiedTopology: true });

const eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    description: String,
    summary: String,
    link: String,
});

const Event = mongoose.model('Event', eventSchema);

// Create Event
app.post('/api/events', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).send(event);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get All Events
app.get('/api/events', async (req, res) => {
    const events = await Event.find();
    res.status(200).send(events);
});

// Delete Event
app.delete('/api/events/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
