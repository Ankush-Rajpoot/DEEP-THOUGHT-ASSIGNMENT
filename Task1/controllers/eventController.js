import { ObjectId } from 'mongodb';
import { getDB } from '../db/index.js';

// Get event by ID
export const getEventById = async (req, res) => {
    const db = getDB();
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Event ID required" });

    try {
        const event = await db.collection('events').findOne({ _id: new ObjectId(id) });
        if (event) res.json(event);
        else res.status(404).json({ error: "Event not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get latest events with pagination
export const getLatestEvents = async (req, res) => {
    const db = getDB();
    const { type, limit = 5, page = 1 } = req.query;

    if (type !== 'latest') return res.status(400).json({ error: 'Invalid query parameters' });

    try {
        const skip = (page - 1) * limit;
        const events = await db.collection('events')
            .find({})
            .sort({ schedule: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .toArray();

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new event
export const createEvent = async (req, res) => {
    const db = getDB();
    const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;
    const image = req.file;

    const newEvent = {
        type: "event",
        uid: 18,
        name,
        tagline,
        schedule: new Date(schedule),
        description,
        files: { image: image ? image.path : null },
        moderator,
        category,
        sub_category,
        rigor_rank: parseInt(rigor_rank),
        attendees: []
    };

    try {
        const result = await db.collection('events').insertOne(newEvent);
        res.json({ newEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update event by ID
export const updateEventById = async (req, res) => {
    const db = getDB();
    const { id } = req.params;
    const { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank } = req.body;
    const image = req.file;

    const updateFields = {
        name, tagline, schedule: new Date(schedule), description, moderator,
        category, sub_category, rigor_rank: parseInt(rigor_rank)
    };

    if (image) updateFields.files = { image: image.path };

    try {
        const result = await db.collection('events').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
        );
        if (result.matchedCount) res.json({ message: "Event updated" });
        else res.status(404).json({ error: "Event not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete event by ID
export const deleteEventById = async (req, res) => {
    const db = getDB();
    const { id } = req.params;

    try {
        const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount) res.json({ message: "Event deleted" });
        else res.status(404).json({ error: "Event not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
