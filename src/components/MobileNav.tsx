
import React, { useState } from 'react';
import { Home, RotateCcw, User, Crown } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SupportModal } from '@/components/SupportModal';

const menuItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
    type: 'link' as const,
  },
  {
    title: "Restorations", 
    url: "/restorations",
    icon: RotateCcw,
    type: 'link' as const,
  },
  {
    title: "Support",
    url: "/support", 
    icon: User,
    type: 'modal' as const,
  },
  {
    title: "Upgrade",
    url: "/upgrade", 
    icon: Crown,
    type: 'link' as const,
  },
];

export function MobileNav() {
  const location = useLocation();
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.type === 'modal' && item.title === 'Support') {
      setSupportModalOpen(true);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 safe-area-inset-bottom">
        <div className="flex items-center justify-around">
          {menuItems.map((item) => {
            if (item.type === 'modal') {
              return (
                <button
                  key={item.title}
                  onClick={() => handleItemClick(item)}
                  className="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                >
                  <item.icon size={20} />
                  <span className="text-xs font-medium">{item.title}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.title}
                to={item.url}
                className={cn(
                  "flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors",
                  location.pathname === item.url
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <item.icon size={20} />
                <span className="text-xs font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <SupportModal 
        open={supportModalOpen} 
        onOpenChange={setSupportModalOpen} 
      />
    </>
  );
}
