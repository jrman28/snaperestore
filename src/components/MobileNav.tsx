
import React from 'react';
import { Home, RotateCcw, User, Crown } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Restorations", 
    url: "/restorations",
    icon: RotateCcw,
  },
  {
    title: "Support",
    url: "/support", 
    icon: User,
  },
  {
    title: "Upgrade",
    url: "/upgrade", 
    icon: Crown,
  },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        {menuItems.map((item) => (
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
        ))}
      </div>
    </nav>
  );
}
