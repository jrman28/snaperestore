
import React, { useState } from 'react';
import { RotateCcw, Download, Share2 } from 'lucide-react';

interface RestoreSliderProps {
  originalImage: string;
  restoredImage: string;
}

export function RestoreSlider({ originalImage, restoredImage }: RestoreSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && sliderPosition > 0) {
      setSliderPosition(Math.max(0, sliderPosition - 5));
    } else if (e.key === 'ArrowRight' && sliderPosition < 100) {
      setSliderPosition(Math.min(100, sliderPosition + 5));
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gray-900">
        {/* Before Image */}
        <img
          src={originalImage}
          alt="Original photo before restoration"
          className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          loading="eager"
        />
        
        {/* After Image with Smooth Transition */}
        <div 
          className="absolute top-0 left-0 w-full h-full overflow-hidden transition-all duration-200 ease-out"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={restoredImage}
            alt="Restored photo after AI enhancement"
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            loading="eager"
          />
        </div>
        
        {/* Enhanced Labels with Better Mobile Positioning */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-white/20 shadow-lg">
          Original
        </div>
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-white/20 shadow-lg">
          Restored
        </div>
        
        {/* Quality Indicator */}
        <div className="absolute top-12 left-3 sm:top-16 sm:left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium shadow-lg">
          4K Enhanced
        </div>
        
        {/* Interactive Slider with Enhanced Accessibility */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            onKeyDown={handleKeyDown}
            className="w-full opacity-0 cursor-pointer touch-target"
            aria-label="Compare original and restored images"
            tabIndex={0}
          />
          
          {/* Enhanced Slider Handle */}
          <div 
            className="absolute w-0.5 sm:w-1 h-full bg-white shadow-2xl pointer-events-none transition-all duration-200"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Main Handle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-3 border-purple-600 transition-all duration-300 hover:scale-110">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-600 rounded-full"></div>
            </div>
            
            {/* Directional Arrows */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-white text-xs opacity-70">←</div>
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-white text-xs opacity-70">→</div>
            </div>
            
            {/* Vertical Line Extensions */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-6 sm:h-8 bg-white/60"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-6 sm:h-8 bg-white/60"></div>
          </div>
        </div>
        
        {/* Action Buttons - Mobile Optimized */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex gap-2">
          <button 
            className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 sm:p-2.5 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 touch-target group"
            aria-label="Reset comparison"
            onClick={() => setSliderPosition(50)}
          >
            <RotateCcw size={14} className="sm:w-4 sm:h-4 text-gray-700 group-hover:text-purple-600" />
          </button>
          
          <button 
            className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 sm:p-2.5 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 touch-target group"
            aria-label="Download restored image"
          >
            <Download size={14} className="sm:w-4 sm:h-4 text-gray-700 group-hover:text-green-600" />
          </button>
          
          <button 
            className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 sm:p-2.5 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 touch-target group"
            aria-label="Share restored image"
          >
            <Share2 size={14} className="sm:w-4 sm:h-4 text-gray-700 group-hover:text-blue-600" />
          </button>
        </div>

        {/* Slider Position Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
          <div 
            className="h-full bg-gradient-to-r from-gray-400 to-purple-500 transition-all duration-200"
            style={{ width: `${sliderPosition}%` }}
          ></div>
        </div>
      </div>
      
      {/* Enhanced Instructions */}
      <div className="text-center mt-4 space-y-3">
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span>Original</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Restored</span>
          </div>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
          Drag the slider, use arrow keys, or tap the action buttons to compare your original photo with the AI-enhanced restoration
        </p>
        
        {/* Technical Details */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-gray-400 pt-2">
          <span className="bg-gray-100 px-2 py-1 rounded">AI Enhanced</span>
          <span className="bg-gray-100 px-2 py-1 rounded">Color Restored</span>
          <span className="bg-gray-100 px-2 py-1 rounded">Damage Repaired</span>
          <span className="bg-gray-100 px-2 py-1 rounded">4K Quality</span>
        </div>
      </div>
    </div>
  );
}
