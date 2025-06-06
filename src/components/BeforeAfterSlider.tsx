
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const startAutoPlay = () => {
    if (intervalRef.current) return;
    
    intervalRef.current = setInterval(() => {
      setSliderPosition(prev => {
        if (prev >= 95) return 5;
        return prev + 2;
      });
    }, 100);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gray-900">
        {/* Before Image - Black & White Military Portrait */}
        <img
          src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop"
          alt="Original black and white military portrait"
          className="w-full h-72 sm:h-80 lg:h-96 object-cover"
          loading="eager"
        />
        
        {/* After Image - Colorized Version */}
        <div 
          className="absolute top-0 left-0 w-full h-full overflow-hidden transition-all duration-300 ease-out"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&h=400&fit=crop"
            alt="Restored and colorized military portrait"
            className="w-full h-72 sm:h-80 lg:h-96 object-cover"
            loading="eager"
          />
        </div>
        
        {/* Enhanced Labels */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium border border-white/20">
          Before
        </div>
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium border border-white/20">
          After
        </div>
        
        {/* Interactive Slider */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            className="w-full opacity-0 cursor-pointer touch-target"
            aria-label="Compare before and after images"
          />
          
          {/* Enhanced Slider Handle */}
          <div 
            className="absolute w-0.5 sm:w-1 h-full bg-white shadow-2xl pointer-events-none transition-all duration-300"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-purple-600 transition-all duration-300 hover:scale-110">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-600 rounded-full"></div>
            </div>
            
            {/* Vertical Line Extensions */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-8 bg-white/50"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-8 bg-white/50"></div>
          </div>
        </div>
        
        {/* Enhanced Play/Pause Button */}
        <button 
          onClick={togglePlay}
          className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 sm:p-2.5 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 touch-target group"
          aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
        >
          {isPlaying ? (
            <Pause size={16} className="sm:w-5 sm:h-5 text-purple-600 group-hover:text-purple-700" />
          ) : (
            <Play size={16} className="sm:w-5 sm:h-5 text-purple-600 group-hover:text-purple-700 ml-0.5" />
          )}
        </button>

        {/* Progress Indicator */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-100"
              style={{ width: `${sliderPosition}%` }}
            ></div>
          </div>
        )}
      </div>
      
      {/* Enhanced Description */}
      <div className="text-center mt-4 space-y-2">
        <p className="text-gray-700 font-medium text-sm sm:text-base">
          ✨ AI-Powered Photo Restoration
        </p>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          Drag the slider or use the play button to see the transformation from faded memories to vibrant restored photos
        </p>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
