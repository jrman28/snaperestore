
import React, { useState } from 'react';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-2xl">
        {/* After Image (base layer) */}
        <img
          src="/lovable-uploads/b6f49195-6f51-44c5-9589-68cf06273ea1.png"
          alt="After restoration"
          className="w-full h-80 object-cover"
        />
        
        {/* Before Image (overlay layer) */}
        <div 
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src="/lovable-uploads/b302a410-9a64-4b86-9188-b169b415522b.png"
            alt="Before restoration"
            className="w-full h-80 object-cover"
          />
        </div>
        
        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
          After
        </div>
        
        {/* Slider positioned at the bottom */}
        <div className="absolute bottom-6 left-0 w-full px-6">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${sliderPosition}%, #d1d5db ${sliderPosition}%, #d1d5db 100%)`
              }}
            />
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-purple-600 rounded-full shadow-lg pointer-events-none border-2 border-white"
              style={{ left: `calc(${sliderPosition}% - 12px)` }}
            >
              <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
        
        {/* Divider line */}
        <div 
          className="absolute top-0 w-0.5 h-full bg-white shadow-lg pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        />
      </div>
      
      <p className="text-center text-gray-600 mt-4">
        Drag the slider to compare before and after restoration
      </p>
      
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #8b5cf6;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #8b5cf6;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default BeforeAfterSlider;
