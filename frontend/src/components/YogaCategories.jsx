function YogaCategories() {
    const categories = ["Body-Part Specific" ,"Strength", "Flexibility", "Relaxation", "Balance", "Posture", "Core" , "Disease Specific"];
  
    return (
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 text-center mb-6">
          Yoga Categories
        </h2>
  
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-green-100 text-green-700 font-medium sm:font-semibold text-xs sm:text-sm md:sm px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md hover:bg-green-200 transition"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default YogaCategories;
  