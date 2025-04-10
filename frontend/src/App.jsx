import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import Login from "./components/loginsignup/login";
import Signup from "./components/loginsignup/signup";
import LoginHome from "./components/loginsignup/LoginHome";
import ContactUs from "./components/contactus/ContactUs";
import AboutUs from "./components/aboutus/AboutUs";
import Asanas from "./components/Asanas/Asanas";
import Footer from "./components/footer/Footer";
// import QuoteTicker from "./components/quoteTicker/QuoteTicker";


function App() {
  return (
    <Router>
      <Navbar />
      {/* <QuoteTicker/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route  path='/loginhome'  element={<LoginHome/>}   />
         <Route path="/contactus" element={<ContactUs />} />
         <Route path="/aboutus" element={<AboutUs />} />
         <Route path="/asanas" element={<Asanas />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
