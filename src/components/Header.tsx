
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { HelpCircle, Globe, Menu, X } from 'lucide-react';

interface HeaderProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

const Header = ({ onSignInClick, onSignUpClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-4 sm:px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200 relative">
      <Logo />
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors touch-target">
          <HelpCircle size={20} />
          <span>Help</span>
        </button>
        
        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors touch-target">
          <Globe size={20} />
          <span>English</span>
        </button>
        
        <div className="flex space-x-2">
          <Button variant="ghost" onClick={onSignInClick} className="touch-target">
            Sign In
          </Button>
          <Button onClick={onSignUpClick} className="bg-purple-600 hover:bg-purple-700 touch-target">
            Sign Up
          </Button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors touch-target"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-soft-lg z-50 md:hidden fade-in">
          <div className="p-4 space-y-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors w-full text-left touch-target">
              <HelpCircle size={20} />
              <span>Help</span>
            </button>
            
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors w-full text-left touch-target">
              <Globe size={20} />
              <span>English</span>
            </button>
            
            <div className="pt-2 border-t border-gray-200 space-y-3">
              <Button 
                variant="ghost" 
                onClick={() => {
                  onSignInClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start touch-target"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => {
                  onSignUpClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 touch-target"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
