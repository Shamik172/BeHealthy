const express=require("express");
const cors= require("cors");
const bodyParser =require("body-parser");
const cookieParser = require('cookie-parser');
const dotenv=require('dotenv');

const app=express();

const AuthRoutes = require('./Routes/AuthRoutes') ;
const UserRoutes = require('./Routes/UserRoutes.js');
const ContactUsRouter= require('./Routes/ContactUsRouter.js');
const AsanasRouter =require('./Routes/AsanasRouter.js');
const MusicRoutes = require('./Routes/MusicRoutes.js');
// const ReviewRoutes = require("./Routes/ReviewRoutes.js");
const ReviewRoutes = require("./Routes/ReviewRoutes.js");

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

app.get('/',(req , res)=>{
    res.send("Server is running...") ;
});

app.use('/auth', AuthRoutes);

app.use('/user',UserRoutes) ; 

app.use('/contactus', ContactUsRouter) ;
app.use('/asanas', AsanasRouter) ;
// app.use('/users', UsersRouter); // <-- Add this line

app.use("/reviews",ReviewRoutes);

app.use('/music', MusicRoutes) ;

app.listen(PORT , ()=>{
   console.log(`Server is running on PORT : => ${PORT}`);
});