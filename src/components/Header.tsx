
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { HelpCircle, Globe, Menu, X } from 'lucide-react';
import { SupportModal } from '@/components/SupportModal';

interface HeaderProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

const Header = ({ onSignInClick, onSignUpClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const handleHelpClick = () => {
    setIsSupportModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <header className="flex justify-between items-center px-4 sm:px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 relative">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 hover:text-gray-900 touch-target"
            onClick={handleHelpClick}
          >
            <HelpCircle size={18} className="mr-2" />
            Help
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 touch-target">
            <Globe size={18} className="mr-2" />
            English
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onSignInClick} className="touch-target">
              Sign In
            </Button>
            <Button onClick={onSignUpClick} className="bg-black hover:bg-gray-800 text-white touch-target">
              Sign Up
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost"
          size="icon"
          className="md:hidden touch-target"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="relative w-5 h-5">
            <Menu 
              size={20} 
              className={`absolute inset-0 transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`} 
            />
            <X 
              size={20} 
              className={`absolute inset-0 transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`} 
            />
          </div>
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-soft-lg z-50 md:hidden fade-in">
            <div className="p-4 space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-600 hover:text-gray-900 touch-target"
                onClick={handleHelpClick}
              >
                <HelpCircle size={18} className="mr-2" />
                Help
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-600 hover:text-gray-900 touch-target"
              >
                <Globe size={18} className="mr-2" />
                English
              </Button>
              
              <div className="pt-2 border-t border-gray-200 space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    onSignInClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full touch-target"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => {
                    onSignUpClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-black hover:bg-gray-800 text-white touch-target"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Support Modal */}
      <SupportModal 
        open={isSupportModalOpen} 
        onOpenChange={setIsSupportModalOpen} 
      />
    </>
  );
};

export default Header;
