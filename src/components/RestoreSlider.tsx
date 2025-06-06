
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

interface RestoreSliderProps {
  originalImage: string;
  restoredImage: string;
  className?: string;
}

export function RestoreSlider({ originalImage, restoredImage, className = '' }: RestoreSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && sliderPosition > 0) {
      setSliderPosition(prev => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight' && sliderPosition < 100) {
      setSliderPosition(prev => Math.min(100, prev + 5));
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

  const reset = () => {
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

  const handleTouchStart = () => {
    setIsDragging(true);
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
      <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
        <div className="relative overflow-hidden rounded-xl shadow-soft-lg bg-gray-100 h-80 sm:h-96 flex items-center justify-center">
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
    <div className={`relative w-full max-w-2xl mx-auto group ${className}`}>
      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-xl shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        tabIndex={0}
        role="img"
        aria-label="Before and after restoration comparison"
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
          alt="Before restoration"
          className="w-full h-80 sm:h-96 object-cover transition-opacity duration-300"
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
            alt="After restoration"
            className="w-full h-80 sm:h-96 object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
        
        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
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
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-full opacity-0 cursor-pointer touch-target"
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

        {/* Reset Button */}
        <button 
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2.5 transition-all duration-200 shadow-lg hover:shadow-xl touch-target group-hover:opacity-100 opacity-75"
          onClick={reset}
          aria-label="Reset slider to center"
        >
          <RotateCcw size={16} className="text-gray-700" />
        </button>
      </div>
      
      <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
        Drag the slider or use arrow keys to compare the original and restored images
      </p>
    </div>
  );
}
