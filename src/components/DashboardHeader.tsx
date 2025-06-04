
import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="lg:hidden">
            <Menu size={20} />
          </SidebarTrigger>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/dashboard" className="text-purple-600 font-medium">Dashboard</a>
          <a href="/profile" className="text-gray-600 hover:text-gray-900">Profile</a>
          <a href="/settings" className="text-gray-600 hover:text-gray-900">Settings</a>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            SJ
          </div>
        </div>
      </div>
    </header>
  );
}
