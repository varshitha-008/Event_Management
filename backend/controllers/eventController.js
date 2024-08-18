const Event = require('../models/Event');

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};


// Create a new event (Admin only)
exports.createEvent = async (req, res) => {
  const { name, date, time, location, description, participantLimit } = req.body;

  try {
    const event = new Event({
      name,
      date,
      time,
      location,
      description,
      participantLimit,
      createdBy: req.user.id,
    });

    await event.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an event (Admin only)
exports.updateEvent = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting event', error: error.message });
  }
};


// Register for an event (User)
// exports.registerForEvent = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);

//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     // Ensure arrays are initialized
//     if (!event.registeredParticipants) event.registeredParticipants = [];
//     if (!event.waitlistedParticipants) event.waitlistedParticipants = [];

//     const userId = req.user._id;

//     // Check if the user is already registered
//     if (event.registeredParticipants.includes(userId)) {
//       return res.status(400).json({ message: 'Already registered for this event' });
//     }

//     // Check if the user is on the waitlist
//     if (event.waitlistedParticipants.includes(userId)) {
//       return res.status(400).json({ message: 'You are already waitlisted for this event' });
//     }

//     if (event.registeredParticipants.length < event.participantLimit) {
//       event.registeredParticipants.push(userId);
//       res.status(200).json({ message: 'Successfully registered for the event' });
//     } else {
//       event.waitlistedParticipants.push(userId);
//       res.status(200).json({ message: 'Event is full, you are added to the waitlist' });
//     }

//     await event.save();
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };



// // Cancel event registration (User)
// exports.cancelRegistration = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);

//     event.participants = event.participants.filter(
//       (participant) => participant.toString() !== req.user.id
//     );

//     event.waitlist = event.waitlist.filter(
//       (waitlisted) => waitlisted.toString() !== req.user.id
//     );

//     await event.save();

//     res.json({ message: 'Registration canceled' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// Get events for user
exports.getEventsForUser = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getMyEvents = async (req, res) => {
  try {
    // Find events where the `createdBy` field matches the logged-in user's ID
    const events = await Event.find({ createdBy: req.user.id });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const userId = req.user._id;

    // Ensure arrays are initialized
    if (!event.registeredParticipants) event.registeredParticipants = [];
    if (!event.waitlistedParticipants) event.waitlistedParticipants = [];

    // Check if the user is already registered
    if (event.registeredParticipants.includes(userId)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Check if the user is on the waitlist
    if (event.waitlistedParticipants.includes(userId)) {
      return res.status(400).json({ message: 'You are already waitlisted for this event' });
    }

    if (event.registeredParticipants.length < event.participantLimit) {
      event.registeredParticipants.push(userId);
      res.status(200).json({ message: 'Successfully registered for the event' });
    } else {
      event.waitlistedParticipants.push(userId);
      res.status(200).json({ message: 'Event is full, you are added to the waitlist' });
    }

    await event.save();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const userId = req.user._id;

    // Remove user from registeredParticipants
    if (event.registeredParticipants.includes(userId)) {
      event.registeredParticipants = event.registeredParticipants.filter(id => !id.equals(userId));
    } else if (event.waitlistedParticipants.includes(userId)) {
      event.waitlistedParticipants = event.waitlistedParticipants.filter(id => !id.equals(userId));
    } else {
      return res.status(400).json({ message: 'User is not registered for this event' });
    }

    await event.save();
    res.status(200).json({ message: 'Successfully canceled registration' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// controller/eventController.js

exports.getEventStats = async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Event.find().populate('participants').populate('waitlist').exec();

    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }

    // Map events to extract statistics
    const stats = events.map(event => ({
      eventName: event.name,
      totalParticipants: event.participants.length,
      waitlistedParticipants: event.waitlist.length,
    }));

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching event stats:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



exports.searchEvent = async (req, res) => {
  const { query } = req.query;
  try {
    const events = await Event.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        // Add more fields as necessary
      ]
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from the database
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error, could not fetch events' });
  }
};



