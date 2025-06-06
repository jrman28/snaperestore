
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Military portrait images - B&W original and colorized restored
  const originalImage = "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop&crop=face";
  const restoredImage = "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop&crop=face";

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying) {
      setSliderPosition(Number(e.target.value));
    }
  }, [isPlaying]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && sliderPosition > 0) {
      setSliderPosition(prev => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight' && sliderPosition < 100) {
      setSliderPosition(prev => Math.min(100, prev + 5));
    } else if (e.key === ' ') {
      e.preventDefault();
      setIsPlaying(prev => !prev);
    }
  }, [sliderPosition]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('keydown', handleKeyDown);
      return () => {
        containerRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  const animate = useCallback(() => {
    setSliderPosition(prev => {
      const next = prev + 0.5;
      if (next >= 100) {
        setIsPlaying(false);
        return 100;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(animate, 50);
      return () => clearInterval(interval);
    }
  }, [isPlaying, animate]);

  const togglePlay = () => {
    if (sliderPosition >= 100) {
      setSliderPosition(0);
    }
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setSliderPosition(50);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (isPlaying) setIsPlaying(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  if (hasError) {
    return (
      <div className="relative w-full max-w-lg mx-auto">
        <div className="relative overflow-hidden rounded-xl shadow-soft-lg bg-gray-100 h-80 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-sm">Unable to load images</p>
            <button onClick={() => window.location.reload()} className="text-purple-600 hover:text-purple-700 text-sm mt-2">
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg mx-auto group">
      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-xl shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        tabIndex={0}
        role="img"
        aria-label="Before and after comparison slider"
        onPointerMove={handlePointerMove}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl z-10 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Before Image */}
        <img
          src={originalImage}
          alt="Before restoration - Original military portrait"
          className="w-full h-64 sm:h-72 md:h-80 object-cover transition-opacity duration-300"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ opacity: isLoading ? 0 : 1 }}
        />
        
        {/* After Image */}
        <div 
          className="absolute top-0 left-0 w-full h-full overflow-hidden transition-all duration-200"
          style={{ 
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            opacity: isLoading ? 0 : 1
          }}
        >
          <img
            src={restoredImage}
            alt="After restoration - Colorized military portrait"
            className="w-full h-64 sm:h-72 md:h-80 object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
        
        {/* Labels */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
          Original
        </div>
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
          Restored
        </div>
        
        {/* Slider */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-full opacity-0 cursor-pointer touch-target disabled:cursor-not-allowed"
            disabled={isPlaying}
            aria-label="Comparison slider"
          />
          <div 
            className="absolute w-0.5 h-full bg-white shadow-lg pointer-events-none transition-all duration-200"
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)'
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <button 
            className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2.5 transition-all duration-200 shadow-lg hover:shadow-xl touch-target group-hover:opacity-100 opacity-75"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? <Pause size={16} className="text-gray-700" /> : <Play size={16} className="text-gray-700" />}
          </button>
          
          <button 
            className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2.5 transition-all duration-200 shadow-lg hover:shadow-xl touch-target group-hover:opacity-100 opacity-75"
            onClick={reset}
            aria-label="Reset slider position"
          >
            <RotateCcw size={16} className="text-gray-700" />
          </button>
        </div>

        {/* Progress indicator */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 h-1 bg-purple-600 transition-all duration-100"
               style={{ width: `${sliderPosition}%` }} />
        )}
      </div>
      
      <div className="text-center mt-4 space-y-2">
        <p className="text-gray-600 text-sm sm:text-base font-medium">
          ✨ See the restoration magic in action
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          Drag the slider, use arrow keys, or press space to play animation
        </p>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
