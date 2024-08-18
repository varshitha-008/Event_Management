const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const authRoutes =require('./routes/authRoutes')
// const authRoutes
const eventRoutes = require('./routes/eventRoutes');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

connectDB();

const app = express();
app.use(cors()); 

app.use(express.json());
app.use('/api/auth',authRoutes)
// app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);


app.get('/', async (req,res)=>{
  try {
       res.send('this is home route')
  } catch (error) {
      res.send('got error in the home route')
  }
})

const PORT = process.env.PORT || 2100;

const server = http.createServer(app);
const io = new Server(server, {

  cors: {
    origin: '*',
  },
});


io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('register', (eventData) => {
    socket.broadcast.emit('eventUpdate', eventData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});







