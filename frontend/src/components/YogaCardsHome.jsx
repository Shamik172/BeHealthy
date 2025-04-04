import { motion } from "framer-motion";
import yogaPose1 from "../assets/yoga1.jpg";
import yogaPose2 from "../assets/yoga2.jpg";
import yogaPose3 from "../assets/yoga3.jpg";
import yogaPose4 from "../assets/yoga4.jpg";
import yogaPose5 from "../assets/yoga5.jpg";
import yogaPose6 from "../assets/yoga6.jpg";

const yogaData = [
  { id: 1, image: yogaPose1, title: "Mountain Pose (Tadasana)", description: "A foundational pose that improves posture and balance." },
  { id: 2, image: yogaPose2, title: "Downward Dog (Adho Mukha Svanasana)", description: "Strengthens the arms and legs while stretching the body." },
  { id: 3, image: yogaPose3, title: "Warrior Pose (Virabhadrasana)", description: "Boosts endurance and strengthens legs, arms, and core." },
  { id: 4, image: yogaPose4, title: "Tree Pose (Vrksasana)", description: "Enhances concentration, balance, and stability." },
  { id: 5, image: yogaPose5, title: "Cobra Pose (Bhujangasana)", description: "Improves spinal flexibility and opens the chest." },
  { id: 6, image: yogaPose6, title: "Child’s Pose (Balasana)", description: "Relieves stress and gently stretches the back and hips." },
];

function YogaCardsHome() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center lg:text-left">
        Yoga Poses & Benefits
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {yogaData.map((pose, index) => (
          <motion.div
            key={pose.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
          >
            <img src={pose.image} alt={pose.title} className="w-full h-44 sm:h-52 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-green-600">
                {pose.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">{pose.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default YogaCardsHome;
