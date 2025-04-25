import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-green-600 dark:bg-green-800 text-white dark:text-gray-200 py-10 px-8 sm:px-12 pb-28 transition-all duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo & Tagline */}
        <div>
          <h1 className="text-3xl font-bold mb-3 text-white">Yoga-Verse</h1>
          <p className="text-sm text-green-100 opacity-90">
            Discover balance and clarity through mindful yoga practices tailored for you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">Explore</h2>
          <ul className="space-y-2 text-sm text-green-100">
            <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
            <li><Link to="/asanas" className="hover:text-yellow-300 transition">Asanas</Link></li>
            <li><Link to="/reviews" className="hover:text-yellow-300 transition">Reviews</Link></li>
            <li><Link to="/aboutus" className="hover:text-yellow-300 transition">About Us</Link></li>
            <li><Link to="/contactus" className="hover:text-yellow-300 transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Benefits or Resources */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">Wellness</h2>
          <ul className="space-y-2 text-sm text-green-100">
            <li><Link to="#" className="hover:text-yellow-300 transition">Flexibility</Link></li>
            <li><Link to="#" className="hover:text-yellow-300 transition">Mental Clarity</Link></li>
            <li><Link to="#" className="hover:text-yellow-300 transition">Balance</Link></li>
            <li><Link to="#" className="hover:text-yellow-300 transition">Posture Correction</Link></li>
          </ul>
        </div>

        {/* Social Media & Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">Connect</h2>
          <div className="flex space-x-4 text-2xl mb-4 text-green-200">
            <a href="#" className="hover:text-yellow-300 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-300 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-300 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-300 transition"><FaYoutube /></a>
          </div>
          <p className="text-sm">Email: contact@yogaverse.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-green-500 pt-4 text-center text-xs text-green-200">
        © {new Date().getFullYear()} Yoga-Verse. All rights reserved. | Breathe. Stretch. Evolve | Crafted with ❤️.
      </div>
    </footer>
  );
}

export default Footer;


