const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);

dotenv.config();
require("./config/db.js");

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://yoga-healix-1.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));

app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Initialize socket.io with open CORS (optional: restrict in production)
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// ⛔ Don't remove any routes
const AuthRoutes = require('./Routes/AuthRoutes');
const ContactUsRouter = require('./Routes/ContactUsRouter.js');
const AsanasRouter = require('./Routes/AsanasRouter.js');
const MusicRoutes = require('./Routes/MusicRoutes.js');
const UserRoutes = require("./Routes/UserRoutes.js");
const Streak = require('./Routes/StreakRoutes.js');
const InstructorRoutes = require('./Routes/InstructorRoutes.js');
const Instructor = require('./Routes/Instructor.js');
const ReviewRoutes = require('./Routes/ReviewRoutes.js');
const DailyTaskRoutes = require('./Routes/DailyTaskRoutes.js');
const UsersRouter = require('./Routes/UsersRouter');
const NotificationsRouter = require('./Routes/NotificationsRouter');
const VenueRouter = require('./Routes/venueRouter');
const VenueStatsRoutes = require('./Routes/venueStatsRoutes');
const YogaStreamRoutes = require('./Routes/yogaStreamRoutes.js');
const LiveStreamRoutes = require("./Routes/liveStreamRoutes.js");
const adminRouter = require("./Routes/adminRoutes.js");

// ✅ Test route
app.get('/', (req, res) => {
  res.send("Server is running...");
});

// ✅ Route bindings
app.use('/auth', AuthRoutes);
app.use('/contactus', ContactUsRouter);
app.use('/asanas', AsanasRouter);
app.use('/music', MusicRoutes);
app.use('/user', UserRoutes);
app.use('/streak', Streak);
app.use('/auth/instructor', InstructorRoutes);
app.use('/instructor', Instructor);
app.use('/reviews', ReviewRoutes);
app.use('/daily', DailyTaskRoutes);
app.use('/users', UsersRouter);
app.use('/notifications', NotificationsRouter);
app.use('/venue', VenueRouter);
app.use('/venue-stats', VenueStatsRoutes);
app.use('/yoga-stream', YogaStreamRoutes);
app.use('/live-stream', LiveStreamRoutes);
app.use('/admin', adminRouter);

// ✅ Socket.io setup
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("stream-chunk", (chunk) => {
    socket.broadcast.emit("receive-stream", chunk);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5050;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
