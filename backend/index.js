const express=require("express");
const cors= require("cors");
const bodyParser =require("body-parser");
const cookieParser = require('cookie-parser');


const app=express();
app.use(express.json()); // 👈 very important


const AuthRoutes = require('./Routes/AuthRoutes') ;
const UserRoutes = require('./Routes/UserRoutes.js');
const ContactUsRouter= require('./Routes/ContactUsRouter.js');
const AsanasRouter =require('./Routes/AsanasRouter.js');
// const ReviewRoutes = require("./Routes/ReviewRoutes.js");
const ReviewRoutes = require("./Routes/ReviewRoutes.js");
const bodyParser =require("body-parser");
const cors= require("cors");

const AuthRouter = require('./Routes/AuthRouter') ;
const ContactUsRouter= require('./Routes/ContactUsRouter');
const AsanasRouter =require('./Routes/AsanasRouter');
const UsersRouter = require('./Routes/UsersRouter'); // <-- Add this line
const VenueRouter = require('./Routes/venueRouter'); // <-- Add this line
const VenueStatsRoutes = require('./Routes/venueStatsRoutes'); // <-- Add this line

require('dotenv').config() ;
require('./config/db.js') ;

const PORT=process.env.PORT || 8080;
const allowedOrigins =['http://localhost:5173'];

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins , credentials:true}));

app.get('/',(req , res)=>{
    res.send("Server is running...") ;
});

app.use('/auth', AuthRoutes);

app.use('/user',UserRoutes) ; 

app.use('/contactus', ContactUsRouter) ;
app.use('/asanas', AsanasRouter) ;
// app.use('/users', UsersRouter); // <-- Add this line

app.use("/reviews",ReviewRoutes);
app.use('/users', UsersRouter); // <-- Add this line
app.use('/venue', VenueRouter); // <-- Add this line
app.use('/venue-stats', VenueStatsRoutes); // For stats like count & users per venue-slot

app.listen(PORT , ()=>{
   console.log(`Server is running on PORT : => ${PORT}`);
});