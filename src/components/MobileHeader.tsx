
import React from 'react';
import { Logo } from '@/components/ui/logo';
import { UserDropdown } from '@/components/UserDropdown';

export function MobileHeader() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <Logo size="sm" />
        <UserDropdown />
      </div>
    </header>
  );
}
