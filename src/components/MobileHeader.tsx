import React, { useState } from 'react';
import { Logo } from '@/components/ui/logo';
import { UserDropdown } from '@/components/UserDropdown';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, RotateCcw, Crown, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SupportModal } from '@/components/SupportModal';

const navItems = [
  { 
    href: '/dashboard', 
    icon: Home, 
    label: 'Home' 
  },
  { 
    href: '/restorations', 
    icon: RotateCcw, 
    label: 'My Restorations' 
  },
];

export function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center space-x-2">
            <UserDropdown />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="relative touch-target"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <Menu 
                  size={20} 
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  )} 
                />
                <X 
                  size={20} 
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  )} 
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-soft-lg z-50 fade-in">
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 touch-target",
                      isActive 
                        ? "text-purple-600 bg-purple-50" 
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
              <button
                onClick={() => {
                  setIsSupportModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left touch-target"
              >
                <MessageCircle size={20} />
                <span className="font-medium">Support</span>
              </button>

              <div className="pt-2 border-t border-gray-200">
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 touch-target flex items-center justify-center px-4 py-3 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Crown size={18} className="mr-3" />
                  <span>Upgrade to Pro</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <SupportModal 
        open={isSupportModalOpen} 
        onOpenChange={setIsSupportModalOpen} 
      />
    </>
  );
}
