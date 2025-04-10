import { useEffect, useRef, useState } from "react";

function BodyPartSidebar({ selectedPart, onSelect }) {
  const [search, setSearch] = useState("");
  const listRef = useRef(null);

  const bodyParts = [
    "Head", "Eyes", "Neck", "Shoulders", "Arms", "Wrists", "Back", "Spine",
    "Chest", "Lungs", "Heart", "Core", "Abdomen", "Hips", "Legs", "Knees",
    "Ankles", "Feet", "Full Body", "Upper Back", "Forearms", "Side Body",
    "Hamstrings", "Calves", "Groin", "Thighs", "Balance"
  ];

  const filteredParts = bodyParts.filter(part =>
    part.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const selectedEl = listRef.current?.querySelector(".selected-body-part");
    if (selectedEl) {
      selectedEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedPart]);

  return (
    <div className="w-64 p-4 bg-green-100 shadow-md overflow-y-auto max-h-screen">
      <h2 className="text-xl font-bold text-green-700 mb-4">Target Area</h2>
      <input
        type="text"
        placeholder="Search body part..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <ul className="space-y-2" ref={listRef}>
        {filteredParts.map((part, index) => (
          <li
            key={index}
            onClick={() => onSelect(part)}
            className={`cursor-pointer px-3 py-2 rounded-md transition font-medium ${
              selectedPart === part
                ? "bg-green-400 text-white selected-body-part"
                : "bg-white text-green-800 hover:bg-green-200"
            }`}
          >
            {part}
          </li>
        ))}
        <li
          onClick={() => onSelect("")}
          className={`cursor-pointer px-3 py-2 rounded-md transition font-medium ${
            selectedPart === "" ? "bg-green-300 text-white" : "bg-gray-200 hover:bg-green-200"
          }`}
        >
          Show All
        </li>
      </ul>
    </div>
  );
}

export default BodyPartSidebar;
