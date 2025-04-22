import React, { useState } from 'react';
import DiseaseSidebar from './sidebar/DiseaseSidebar';
import Watch from '../clock/Watch';
import YogaCardsByDisease from './cards/YogaCardsByDisease';

export default function Disease() {
  const [selectedDisease, setSelectedDisease] = useState('');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-green-50">
      {/* Sidebar */}
      <DiseaseSidebar
        selectedDisease={selectedDisease}
        onSelect={setSelectedDisease}
      />

      {/* Main content: Clock + Cards */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-green-50">
          {/* <Watch /> */}
        </div>
        <div className="flex-1 overflow-auto p-6">
          <YogaCardsByDisease selectedDisease={selectedDisease} />
        </div>
      </div>
    </div>
  );
}
