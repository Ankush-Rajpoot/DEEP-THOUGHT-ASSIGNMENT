import express from 'express';
import multer from 'multer';
import {
    getEventById,
    getLatestEvents,
    createEvent,
    updateEventById,
    deleteEventById
} from '../controllers/eventController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/events', getEventById);                 // Get event by ID
router.get('/events', getLatestEvents);              // Get latest events with pagination
router.post('/events', upload.single('image'), createEvent);  // Create an event
router.put('/events/:id', upload.single('image'), updateEventById); // Update an event by ID
router.delete('/events/:id', deleteEventById);       // Delete an event by ID

export default router;
