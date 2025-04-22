import { motion } from "framer-motion";

const Header = () => (
  <motion.div
    className="flex justify-center mb-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <h1 className="text-3xl font-bold text-green-700 tracking-tight">
      🧘‍♀️ Nearby Yoga Venues
    </h1>
  </motion.div>
);

export default Header;
