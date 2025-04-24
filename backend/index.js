const express=require("express");
const cors= require("cors");
const bodyParser =require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");


const app=express();


const AuthRoutes = require('./Routes/AuthRoutes') ;
// const UserRoutes = require('./Routes/UserRoutes.js');
// const ContactUsRouter= require('./Routes/ContactUsRouter.js');
// const AsanasRouter =require('./Routes/AsanasRouter.js');
// const ReviewRoutes = require("./Routes/ReviewRoutes.js");
// const ReviewRoutes = require("./Routes/ReviewRoutes.js");
// const UserRoutes = require('./Routes/UserRoutes.js');
const ContactUsRouter= require('./Routes/ContactUsRouter.js');
const AsanasRouter =require('./Routes/AsanasRouter.js');
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

require('dotenv').config() ;
require('./config/db.js') ;

const PORT=process.env.PORT || 8080;
const allowedOrigins =['http://localhost:5173'];

//Middlewares
app.use(express.json()); // 👈 very important
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins , credentials:true}));


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
app.use('/venue', VenueRouter); // <-- Add this line
app.use('/venue-stats', VenueStatsRoutes); // For stats like count & users per venue-slot

//yoga streaming section
app.use('/yoga-stream', YogaStreamRoutes);
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
// app.use('/yoga-stream', express.static(path.join(__dirname, "backend", "uploads")));



app.listen(PORT , ()=>{
   console.log(`Server is running on PORT : => ${PORT}`);
});