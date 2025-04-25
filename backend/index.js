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



const AuthRoutes = require('./Routes/AuthRoutes') ;
// const UserRoutes = require('./Routes/UserRoutes.js');
// const ContactUsRouter= require('./Routes/ContactUsRouter.js');
// const AsanasRouter =require('./Routes/AsanasRouter.js');
// const ReviewRoutes = require("./Routes/ReviewRoutes.js");
// const ReviewRoutes = require("./Routes/ReviewRoutes.js");
// const UserRoutes = require('./Routes/UserRoutes.js');
const ContactUsRouter= require('./Routes/ContactUsRouter.js');
const AsanasRouter =require('./Routes/AsanasRouter.js');
const MusicRoutes = require('./Routes/MusicRoutes.js');
// const ReviewRoutes = require("./Routes/ReviewRoutes.js");
// const ReviewRoutes = require("./Routes/ReviewRoutes.js");
// const bodyParser =require("body-parser");
// const cors= require("cors");

// const AuthRouter = require('./Routes/AuthRouter') ;
// const ContactUsRouter= require('./Routes/ContactUsRouter');
// const AsanasRouter =require('./Routes/AsanasRouter');
// const ContactUsRouter= require('./Routes/ContactUsRouter');
// const AsanasRouter =require('./Routes/AsanasRouter');
const UsersRouter = require('./Routes/UsersRouter'); // <-- Add this line
const VenueRouter = require('./Routes/venueRouter'); // <-- Add this line
const VenueStatsRoutes = require('./Routes/venueStatsRoutes'); // <-- Add this line
const YogaStreamRoutes = require('./Routes/yogaStreamRoutes.js'); // <-- Add this line
const LiveStreamRoutes = require("./Routes/liveStreamRoutes.js"); // <-- Add this line


// const loadMusicData = require('./config/music.js');

// loadMusicData();

require('dotenv').config() ;
require('./config/db.js') ;
// require('./config/music.js');

const PORT=process.env.PORT || 8080;
const allowedOrigins =['http://localhost:5173'];

app.use(express.json());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins , credentials:true}));
app.use('/uploads', express.static(path.join(__dirname, "uploads")));


//Routes
app.get('/',(req , res)=>{
    res.send("Server is running...") ;
});

app.use('/auth', AuthRoutes);
// app.use('/user',UserRoutes) ; 
app.use('/contactus', ContactUsRouter) ;
app.use('/asanas', AsanasRouter) ;
// app.use('/users', UsersRouter); // <-- Add this line
// app.use("/reviews",ReviewRoutes);
app.use('/users', UsersRouter); // <-- Add this line

//map related routes
app.use('/venue', VenueRouter); // <-- Add this line
app.use('/venue-stats', VenueStatsRoutes); // For stats like count & users per venue-slot

//yoga streaming section
app.use('/yoga-stream', YogaStreamRoutes);

//live streaming section
app.use("/live-stream", LiveStreamRoutes);

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

//music routes 
app.use('/music', MusicRoutes) ;


// app.listen(PORT , ()=>{
//    console.log(`Server is running on PORT : => ${PORT}`);
// });

// Start the server
server.listen(5050, () => {
    console.log("Server running on http://localhost:5050");
  });

//app.listen(PORT , ()=>{
 //  console.log(`Server is running on PORT : => ${PORT}`);
//});

