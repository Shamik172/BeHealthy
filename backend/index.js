const express=require("express");
const app=express();

const bodyParser =require("body-parser");
const cors= require("cors");

const AuthRouter = require('./Routes/AuthRouter') ;
const ContactUsRouter= require('./Routes/ContactUsRouter');
const AsanasRouter =require('./Routes/AsanasRouter');
const UsersRouter = require('./Routes/UsersRouter'); // <-- Add this line

require('dotenv').config() ;
require('./Models/db') ;

const PORT=process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req , res)=>{
    res.send("Server is running...") ;
});

app.use('/auth' , AuthRouter);
app.use('/contactus', ContactUsRouter) ;
app.use('/asanas', AsanasRouter) ;
app.use('/users', UsersRouter); // <-- Add this line

app.listen(PORT , ()=>{
   console.log(`Server is running on PORT : => ${PORT}`);
});