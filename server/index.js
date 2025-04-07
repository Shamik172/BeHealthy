const express=require("express");
const app=express();

const bodyParser =require("body-parser");
const cors= require("cors");

const AuthRouter = require('./Routes/AuthRouter') ;
const ContactUsRouter= require('./Routes/ContactUsRouter');

require('dotenv').config() ;
require('./Models/db') ;

const PORT=process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req , res)=>{
    res.send("Server is running...") ;
});

// app.use('/api',(req, res)=>{
//     res.send("API is running...") ;
// })

app.use('/auth' , AuthRouter);

app.post("/contactus", (req, res) => {
    const { name, email, msg } = req.body;
  
    if (!name || !email || !msg) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }
  
    res.status(200).json({ success: true, message: "Message received!" });
  });
  

// app.use('/contactus', ContactUsRouter) ;


app.listen(PORT , ()=>{
   console.log(`Server is running on PORT : => ${PORT}`);
});