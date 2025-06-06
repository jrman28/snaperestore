
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-6">
        <div className="text-center text-gray-600">
          <p className="text-sm">
            © 2025 SnapRestore. All rights reserved.
          </p>
          <p className="text-sm mt-2 flex items-center justify-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-current" /> by raglandlabs
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
