import Hero from "./Hero";
import YogaCardsHome from "./YogaCardsHome";
import YogaCategories from "./YogaCategories";
import YogaSidebar from "./YogaSidebar";

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Welcome Section */}
      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold text-green-700">Welcome to Yoga Portal</h2>
        <p className="mt-4 text-gray-600">
          Discover the benefits of yoga, learn from expert instructors, and find inner balance.
        </p>
      </div>

      {/* Yoga Categories Section */}
      <YogaCategories />

      {/* Responsive Layout: Sidebar First in Mobile/Tablet, Right in Laptop */}
      <div className="flex flex-col-reverse lg:flex-row gap-8 px-6">
        {/* Yoga Cards Section */}
        <div className="w-full lg:w-3/4">
          <YogaCardsHome />
        </div>

        {/* Sidebar (Calendar) */}
        <div className="w-full lg:w-1/4">
          <YogaSidebar />
        </div>
      </div>
    </div>
  );
}
