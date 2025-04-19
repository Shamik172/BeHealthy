import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/loginsignup/Login";
import Signup from "./components/loginsignup/Signup";
import LoginHome from "./components/loginsignup/LoginHome";

import ContactUs from "./components/contactus/ContactUs";
import AboutUs from "./components/aboutus/AboutUs";
import History from "./components/history/History";
// import Asanas from "./components/asanas/Asanas";
import BodyParts from "./components/asanas/bodyParts/BodyParts";
import Disease from "./components/asanas/diseases/Disease";

import Footer from "./components/footer/Footer";
import YogaVenuePage from "./components/findyogamate/YogaVenuePage";

// Notification components
import { NotificationProvider } from "./NotificationContext";
import NotificationPopup from "./components/Notification/NotificationPopup";
import NotificationHistory from "./components/Notification/NotificatioHistory";
import NotificationButton from "./Testx/NotificationButton";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <NotificationProvider>
          {/* Top Sticky Navbar */}
          <Navbar />
          <NotificationPopup />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/loginhome" element={<LoginHome />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/aboutus" element={<AboutUs />} />
              {/* <Route path="/asanas" element={<Asanas />} /> */}
              <Route path="/bodyparts" element={<BodyParts />} />
              <Route path="/diseases" element={<Disease />} />
              <Route path="/testx" element={<NotificationButton />} />
              <Route path="/history" element={<History />} />
              <Route path="/notifications" element={<NotificationHistory />} />
              <Route path="/test" element={<YogaVenuePage />} />
            </Routes>
          </main>

          {/* Sticky Footer */}
          <Footer />
        </NotificationProvider>
      </Router>
    </div>
  );
}

export default App;
