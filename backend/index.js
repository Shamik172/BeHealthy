const express=require("express");
const app=express();

const bodyParser =require("body-parser");
const cors= require("cors");

const AuthRouter = require('./Routes/AuthRouter') ;
const ContactUsRouter= require('./Routes/ContactUsRouter');
// const AsanasRouter = require('./Routes/AsanasRouter') ;
const AsanasRouter =require('./Routes/AsanasRouter');




require('dotenv').config() ;
require('./Models/db') ;

const PORT=process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req , res)=>{
    res.send("Server is running...") ;
});

// app.use('/asanas',(req, res)=>{
//     res.send("Asanas is running...") ;
// })

app.use('/auth' , AuthRouter);


app.use('/contactus', ContactUsRouter) ;

app.use('/asanas', AsanasRouter) ;

app.listen(PORT , ()=>{
   console.log(`Server is running on PORT : => ${PORT}`);
});