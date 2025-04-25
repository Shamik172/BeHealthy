import React from "react";

const Settings = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#f59e42] to-[#f472b6] py-10 px-2">
    <div className="max-w-2xl mx-auto p-8 bg-[#232136] rounded-2xl shadow-2xl border border-pink-400/30">
      <h2 className="text-3xl font-bold mb-8 text-center text-pink-300 tracking-wide drop-shadow-lg">
        ⚙️ Settings
      </h2>
      {/* Your settings form or content here */}
      <div className="text-pink-100">Settings content goes here...</div>
    </div>
  </div>
);

export default Settings;