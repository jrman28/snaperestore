
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, RotateCcw, Crown, MessageCircle } from 'lucide-react';
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
    label: 'Restorations' 
  },
];

export const MobileNav = () => {
  const location = useLocation();
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors",
                  isActive 
                    ? "text-purple-600 bg-purple-50" 
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
          
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
          >
            <MessageCircle size={20} />
            <span className="text-xs font-medium">Support</span>
          </button>

          <button
            className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors text-purple-600 hover:text-purple-700"
          >
            <Crown size={20} />
            <span className="text-xs font-medium">Upgrade</span>
          </button>
        </div>
      </nav>

      <SupportModal 
        open={isSupportModalOpen} 
        onOpenChange={setIsSupportModalOpen} 
      />
    </>
  );
};
