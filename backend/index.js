const express=require("express");
const cors= require("cors");
const bodyParser =require("body-parser");
const cookieParser = require('cookie-parser');
const dotenv=require('dotenv');
const path = require("path");
const socketIo = require("socket.io");
const http = require("http"); // <-- ADD THIS


const app = express();
const server = http.createServer(app); // <-- ADD THIS

// Initialize socket.io with CORS config
const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

// <<Anantesh >>   Dont't remove anything from here

const AuthRoutes = require('./Routes/AuthRoutes') ;
const ContactUsRouter= require('./Routes/ContactUsRouter.js');
const AsanasRouter =require('./Routes/AsanasRouter.js');
const MusicRoutes = require('./Routes/MusicRoutes.js');
const UserRoutes = require("./Routes/UserRoutes.js");          // for front end use
const Streak = require('./Routes/StreakRoutes.js');
const InstructorRoutes = require('./Routes/InstructorRoutes.js');
const Instructor = require('./Routes/Instructor.js');    // to get instructor personal info
const ReviewRoutes = require('./Routes/ReviewRoutes.js');
const DailyTaskRoutes = require('./Routes/DailyTaskRoutes.js');

const UsersRouter = require('./Routes/UsersRouter');           // for fetching data on admin side
const NotificationsRouter = require('./Routes/NotificationsRouter');
const VenueRouter = require('./Routes/venueRouter'); // <-- Add this line
const VenueStatsRoutes = require('./Routes/venueStatsRoutes'); // <-- Add this line
const YogaStreamRoutes = require('./Routes/yogaStreamRoutes.js'); // <-- Add this line
const LiveStreamRoutes = require("./Routes/liveStreamRoutes.js"); // <-- Add this line

const adminRouter = require("./Routes/adminRoutes.js"); // <-- Add this line


require('dotenv').config() ;
require('./config/db.js') ;


const PORT=process.env.PORT || 8080;
const allowedOrigins =['http://localhost:5173','http://localhost:5174',"https://yoga-healix.onrender.com"];

app.use(express.json());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins , credentials:true}));
app.use('/uploads', express.static(path.join(__dirname, "uploads")));


//Routes  just to check wether server is runnig or not
app.get('/',(req , res)=>{
    res.send("Server is running...") ;
});



// Anantesh                                 << !!   Don't delete anything from here !!!!>>
app.use('/auth', AuthRoutes);                          // user login-signup
app.use('/contactus', ContactUsRouter) ;               // contact us section
app.use('/asanas', AsanasRouter) ;                     // for asanas based on disease or body-part
app.use('/music', MusicRoutes) ;                       // for music component
app.use('/user',UserRoutes) ;                         // for fetchhing user data on frontend
app.use('/streak',Streak);                           // for maintaining streak data
app.use('/auth/instructor',InstructorRoutes) ;
app.use('/instructor',Instructor);
app.use('/reviews', ReviewRoutes);
app.use('/daily',DailyTaskRoutes);


app.use('/users', UsersRouter); // <-- Add this line
app.use('/notifications', NotificationsRouter);

//map related routes
app.use('/venue', VenueRouter); // <-- Add this line
app.use('/venue-stats', VenueStatsRoutes); // For stats like count & users per venue-slot

//yoga streaming section
app.use('/yoga-stream', YogaStreamRoutes);

//live streaming section
app.use("/live-stream", LiveStreamRoutes);
app.use('/admin', adminRouter); // <-- Add this line;

// Socket.IO Events
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("stream-chunk", (chunk) => {
    socket.broadcast.emit("receive-stream", chunk);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Your auth routes here...
// app.use('/api/streak', streaksRoutes);


// Start the server
server.listen(5050, () => {
    console.log("Server running on http://localhost:5050");
  });



