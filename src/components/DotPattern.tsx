
import React from 'react';

const DotPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="dot-pattern"
            x="0"
            y="0"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="6"
              cy="6"
              r="2.5"
              fill="currentColor"
              className="text-gray-400 opacity-50"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-pattern)"
        />
      </svg>
    </div>
  );
};

export default DotPattern;
