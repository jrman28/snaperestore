
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';
import { UserDropdown } from '@/components/UserDropdown';

export function DesktopHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="lg:hidden">
            <Menu size={20} />
          </SidebarTrigger>
        </div>

        <div className="flex items-center space-x-4">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
