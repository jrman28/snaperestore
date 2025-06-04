
import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, Globe } from 'lucide-react';

interface HeaderProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

const Header = ({ onSignInClick, onSignUpClick }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold text-gray-900">Reminiscence</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
          <HelpCircle size={20} />
          <span>Help</span>
        </button>
        
        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
          <Globe size={20} />
          <span>English</span>
        </button>
        
        <div className="flex space-x-2">
          <Button variant="ghost" onClick={onSignInClick}>
            Sign In
          </Button>
          <Button onClick={onSignUpClick}>
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
