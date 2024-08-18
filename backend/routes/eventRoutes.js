const express = require('express');
const {
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  cancelRegistration,
  getEventsForUser,
  getMyEvents,
  getEventById,
  getEventStats,
  searchEvent,
} = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, admin, createEvent);
router.put('/:id', protect, admin, updateEvent);
router.delete('/:id', protect, admin, deleteEvent);

// router.post('/:id/register', protect, registerForEvent);
// router.delete('/:id/cancel', protect, cancelRegistration);

router.get('/', getEventsForUser);

router.get('/my-events', protect, getMyEvents);


router.get('/:id', getEventById);

// Register for an event
router.post('/:id/register', protect, registerForEvent);

router.post('/:id/cancel', protect, cancelRegistration);
router.get('/stats', protect, admin, getEventStats);

// router.put('/events/:id', , updateEvent);
// router.delete('/events/:id', verifyAdmin, deleteEvent);

router.get('/search-event',searchEvent)


// router.get('/allEvents')


module.exports = router;
