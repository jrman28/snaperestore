
import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-2xl">
        {/* Before Image */}
        <img
          src="/lovable-uploads/b6f49195-6f51-44c5-9589-68cf06273ea1.png"
          alt="Before restoration"
          className="w-full h-80 object-cover"
        />
        
        {/* After Image */}
        <div 
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src="/lovable-uploads/b302a410-9a64-4b86-9188-b169b415522b.png"
            alt="After restoration"
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
        
        {/* Play/Pause Button */}
        <button 
          className="absolute bottom-4 left-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-lg"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
