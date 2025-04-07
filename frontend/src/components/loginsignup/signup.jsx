import { useState } from "react";
import { motion } from "framer-motion";
import { Link ,useNavigate} from "react-router-dom"; // Import Link
import { handleSuccess, handleError } from "../../utils"; // Import utility
import {ToastContainer} from 'react-toastify' ;

function Signup() {

  const navigate = useNavigate(); // Initialize navigation
  const [signupInfo , setSignupInfo] = useState({
    name:'',
    email:'',
    password:''
});

const handleChange = (e)=>{
 const {name , value} = e.target ;
//   console.log(name , value);
 const copySignupInfo ={...signupInfo} ;
 copySignupInfo[name]=value;
 setSignupInfo(copySignupInfo);
}

// console.log('signupInfo -> ' , signupInfo) ;

const handleSignup =async (e)=>{
   e.preventDefault();

   const {name , email , password} = signupInfo ;

   if(!name || !email || ! password){
    //  console.log("error :-> name , email and password are required") ;
      return handleError('name , email and password are required') ;
   }

   try{
     const url="http://localhost:5050/auth/signup";
     const response = await fetch(url , {
        method:"POST",
        headers : {
           'Content-Type': 'application/json'
        },
        body : JSON.stringify(signupInfo)
     })
    const result=await response.json();
    const {success , message , error} =result ;

    if(success){
        handleSuccess(message);
        setTimeout( ()=>{
            navigate('/login');
        },2000);
    }
    else if(error){
        const details = error?.details[0].message;
        console.log("error" , details);
        // handleError(message);
        handleError(details);
    }
    else{
        handleError(message);
    }

    console.log(result);

   }catch(err){

   }

}

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-teal-400 to-green-600">
      {/* Floating Yoga-Themed Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-20 w-24 h-24 bg-white/30 backdrop-blur-md rounded-full shadow-lg"
      ></motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-20 w-32 h-32 bg-white/20 backdrop-blur-md rounded-full shadow-lg"
      ></motion.div>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center relative overflow-hidden"
      >
        {/* Decorative Floating Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute w-20 h-20 bg-teal-300 opacity-20 rounded-full -top-5 -right-5"
        ></motion.div>

        <h2 className="text-3xl font-bold text-green-800 mb-6">Yoga-Verse Signup</h2>
        <p className="text-gray-500 mb-4">Join us and find your peace 🧘</p>

        {/* Form Fields */}
        <form onSubmit={handleSignup} className="space-y-4">
          <motion.input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 transition-transform duration-200 hover:scale-105"
            value={signupInfo.name}
            name='name'
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 transition-transform duration-200 hover:scale-105"
            value={signupInfo.email}
            onChange={handleChange}
            name='email'
            required
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 transition-transform duration-200 hover:scale-105"
            value={signupInfo.password}
            onChange={handleChange}
            name="password"
            required
            whileFocus={{ scale: 1.05 }}
          />

          {/* Animated Signup Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
      <ToastContainer /> 
    </div>
  );
}

export default Signup;
