import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";


import ContactUs from "./components/contactus/ContactUs";
import AboutUs from "./components/aboutus/AboutUs";
import History from "./components/history/History";
// import Asanas from "./components/asanas/Asanas";
//resolved
import BodyParts from "./components/asanas/bodyParts/BodyParts";
import Disease from "./components/asanas/diseases/Disease";

import Footer from "./components/footer/Footer";
import YogaVenuePage from "./components/findyogamate/YogaVenuePage";
// import '@fortawesome/fontawesome-free/css/all.min.css';

// Notification components
import { NotificationProvider } from "./NotificationContext";
import NotificationPopup from "./components/Notification/NotificationPopup";
import NotificationHistory from "./components/Notification/NotificatioHistory";
import NotificationButton from "./Testx/NotificationButton";

import AuthPage from "./components/auth/AuthPage";
import EmailVerify from "./components/auth/EmailVerify";
import ResetPassword from "./components/auth/ResetPassword";
import QuoteMarquee from "./components/quoteTicker/QuoteTicker";
import Review from "./components/reviews/Review";

//import ProfilePage from "./components/auth/ProfilePage";

import Task from "./components/task/Task";
import YogaStream from "./components/yogastreaming/YogaStream";


// import YogaStream from "./components/yogastreaming/YogaStream";

function App() {
  return (
    <Router>
      <NotificationProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <QuoteMarquee />
          <NotificationPopup />

          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}

              <Route path="/" element={<Home />} />
             
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/aboutus" element={<AboutUs />} />

              <Route path="/reviews" element={<Review/>} />

              <Route path="/auth" element={<AuthPage/>}/>
              <Route path="/email-verify" element={<EmailVerify/>}/>
              <Route path="/reset-password" element={<ResetPassword/>}/>
             // <Route path="/profile-page" element={<ProfilePage/>} />


              <Route path="/bodyparts" element={<BodyParts />} />
              <Route path="/diseases" element={<Disease />} />
              <Route path="/testx" element={<NotificationButton />} />
              <Route path="/history" element={<History />} />
              <Route path="/notifications" element={<NotificationHistory />} />
              {/* <Route path="/testx" element={<NotificationButton />} /> */}
              <Route path="/task" element={<Task />} />
              <Route path="/test" element={<YogaVenuePage />} />
              <Route path="/yogastreaming" element={<YogaStream />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </NotificationProvider>
    </Router>
  );
}

export default App;
