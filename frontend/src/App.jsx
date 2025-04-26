import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
import "@fortawesome/fontawesome-free/css/all.min.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';

// Notification components
import { NotificationProvider } from "./NotificationContext";
import NotificationPopup from "./components/Notification/NotificationPopup";
import NotificationHistory from "./components/Notification/NotificatioHistory";
import NotificationButton from "./Testx/NotificationButton";

import AdminDashboard from "../../admin/src/components/AdminDashboard";
import axios from "axios";

import AuthPage from "./components/auth/AuthPage";
import EmailVerify from "./components/auth/EmailVerify";
import ResetPassword from "./components/auth/ResetPassword";
import QuoteMarquee from "./components/quoteTicker/QuoteTicker";
import Review from "./components/reviews/Review";

import LiveStream from "./components/yogastreaming/LiveStream";
import ViewLiveStream from "./components/yogastreaming/ViewLiveStream";
import YogaUpload from "./components/yogastreaming/YogaUpload";
import ProfilePage from "./components/auth/ProfilePage";

import Task from "./components/task/Task";
// import YogaStream from "./components/yogastreaming/YogaStream";

function App() {
  const [unseenCount, setUnseenCount] = useState(0);

  useEffect(() => {
    const lastSeenId = localStorage.getItem("lastSeenNotificationId");
    const fetchNotifications = () => {
      axios.get("http://localhost:5050/notifications").then((res) => {
        if (res.data.success) {
          const notifs = res.data.notifications;
          if (notifs.length > 0) {
            const idx = notifs.findIndex((n) => n._id === lastSeenId);
            setUnseenCount(idx === -1 ? notifs.length : idx);
          } else {
            setUnseenCount(0);
          }
        }
      });
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const markNotificationsSeen = () => {
    if (notifications.length > 0) {
      localStorage.setItem("lastSeenNotificationId", notifications[0].id);
      setUnseenCount(0);
    }
  };

  return (
    <Router>
      <NotificationProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar
            unseenCount={unseenCount}
            markNotificationsSeen={markNotificationsSeen}
          />
          {/* // <Navbar /> */}
          <QuoteMarquee />
          <NotificationPopup />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}

              <Route path="/" element={<Home />} />

              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/reviews" element={<Review />} />

              <Route path="/auth" element={<AuthPage />} />
              <Route path="/email-verify" element={<EmailVerify />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              {/* <Route path="/profile-page" element={<ProfilePage/>} /> */}

              <Route path="/auth" element={<AuthPage />} />
              <Route path="/email-verify" element={<EmailVerify />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile-page" element={<ProfilePage />} />

              <Route path="/bodyparts" element={<BodyParts />} />
              <Route path="/diseases" element={<Disease />} />
              <Route path="/testx" element={<NotificationButton />} />
              <Route path="/history" element={<History />} />
              <Route path="/notifications" element={<NotificationHistory />} />
              {/* <Route path="/testx" element={<NotificationButton />} /> */}
              <Route path="/task" element={<Task />} />
              <Route path="/test" element={<YogaVenuePage />} />
              <Route path="/yogaupload" element={<YogaUpload />} />
              <Route path="/livestreaming" element={<LiveStream />} />
              <Route path="/viewlivestream" element={<ViewLiveStream />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </NotificationProvider>
    </Router>
  );
}

export default App;
