import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import Login from "./components/loginsignup/login";
import Signup from "./components/loginsignup/signup";
import LoginHome from "./components/loginsignup/LoginHome";
import ContactUs from "./components/contactus/ContactUs";
import AboutUs from "./components/aboutus/AboutUs";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route  path='/loginhome'  element={<LoginHome/>}   />
         <Route path="/contactus" element={<ContactUs />} />
         <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
