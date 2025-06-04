
import React, { useState } from 'react';

interface RestoreSliderProps {
  originalImage: string;
  restoredImage: string;
}

export function RestoreSlider({ originalImage, restoredImage }: RestoreSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-2xl">
        {/* Before Image */}
        <img
          src={originalImage}
          alt="Before restoration"
          className="w-full h-96 object-cover"
        />
        
        {/* After Image */}
        <div 
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={restoredImage}
            alt="After restoration"
            className="w-full h-96 object-cover"
          />
        </div>
        
        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
          After
        </div>
        
        {/* Slider */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            className="w-full opacity-0 cursor-pointer"
          />
          <div 
            className="absolute w-1 h-full bg-white shadow-lg pointer-events-none"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-gray-600 mt-4">
        Drag the slider or use arrow keys to compare the original and restored images
      </p>
    </div>
  );
}
