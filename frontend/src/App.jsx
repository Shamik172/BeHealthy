import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/loginsignup/Login";
import Signup from "./components/loginsignup/Signup";
import LoginHome from "./components/loginsignup/LoginHome";
import ContactUs from "./components/contactus/ContactUs";
import AboutUs from "./components/aboutus/AboutUs";
import Asanas from "./components/asanas/Asanas";
import Footer from "./components/footer/Footer";
import YogaVenuePage from "./components/findyogamate/YogaVenuePage";
// import QuoteTicker from "./components/quoteTicker/QuoteTicker";

// Notification components
import { NotificationProvider } from "./NotificationContext";
import NotificationPopup from "./components/Notification/NotificationPopup";
import NotificationHistory from "./components/Notification/NotificatioHistory"; // ✅ import added
import NotificationButton from "./Testx/NotificationButton";

function App() {
  return (
    <Router>
      <NotificationProvider>
        <Navbar />
        <NotificationPopup />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/loginhome" element={<LoginHome />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/asanas" element={<Asanas />} />
          <Route path="/testx" element={<NotificationButton />} />
          <Route path="/notifications" element={<NotificationHistory />} /> {/* ✅ added route */}
          <Route path="/test" element={<YogaVenuePage/>} />
        </Routes>

        <Footer />
      </NotificationProvider>
    </Router>
  );
}

export default App;
