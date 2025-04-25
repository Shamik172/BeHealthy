import React, { useState } from 'react';
import BodyPartSidebar from './sidebar/BodyPartSidebar';
import YogaCardsByBodyPart from './cards/YogaCardsByBodyPart';

export default function BodyParts() {
  const [selectedBodyPart, setSelectedBodyPart] = useState('');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-green-50">
      {/* Sidebar */}
      <BodyPartSidebar
        selectedBodyPart={selectedBodyPart}
        onSelect={setSelectedBodyPart}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-green-50">
          {/* Optional header or clock area */}
        </div>
        <div className="flex-1 overflow-auto p-6">
          <YogaCardsByBodyPart selectedBodyPart={selectedBodyPart} />
        </div>
      </div>
    </div>
  );
}
