import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/loginsignup/Login";
import Signup from "./components/loginsignup/Signup";
import LoginHome from "./components/loginsignup/LoginHome";
import ContactUs from "./components/contactus/ContactUs";
import AboutUs from "./components/aboutus/AboutUs";
import History from "./components/history/History";
import BodyParts from "./components/asanas/bodyParts/BodyParts";
import Disease from "./components/asanas/diseases/Disease";
import Footer from "./components/footer/Footer";
import YogaVenuePage from "./components/findyogamate/YogaVenuePage";
import '@fortawesome/fontawesome-free/css/all.min.css';


// Notification components
import { NotificationProvider } from "./NotificationContext";
import NotificationPopup from "./components/Notification/NotificationPopup";
import NotificationHistory from "./components/Notification/NotificatioHistory";
import NotificationButton from "./Testx/NotificationButton";
import AdminDashboard from "../../admin/src/components/AdminDashboard";

// Admin Components
// import AdminDashboard from "./components/admin/AdminDashboard";
// import AdminRoute from "./components/admin/AdminRoute";
// import AdminUsers from "./components/admin/AdminUsers";
// import AdminAsanas from "./components/admin/AdminAsanas";
// import AdminSettings from "./components/admin/AdminSettings";

function App() {
  return (
    <Router>
      <NotificationProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <NotificationPopup />
          
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/loginhome" element={<LoginHome />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/aboutus" element={<AboutUs />} />
              {/* <Route path="/asanas" element={<Asanas />} /> */}
              <Route path="/bodyparts" element={<BodyParts />} />
              <Route path="/diseases" element={<Disease />} />
              <Route path="/history" element={<History />} />
              <Route path="/notifications" element={<NotificationHistory />} />
              <Route path="/testx" element={<NotificationButton />} />
              <Route path="/test" element={<YogaVenuePage />} />

              {/* Admin Routes */}
              {/* <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/users" element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              } />
              <Route path="/admin/asanas" element={
                <AdminRoute>
                  <AdminAsanas />
                </AdminRoute>
              } />
              <Route path="/admin/settings" element={
                <AdminRoute>
                  <AdminSettings />
                </AdminRoute>
              } /> */}
            </Routes>
          </main>

          <Footer />
        </div>
      </NotificationProvider>
    </Router>
  );
}

export default App;
