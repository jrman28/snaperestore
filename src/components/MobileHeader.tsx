
import React from 'react';
import { UserDropdown } from '@/components/UserDropdown';

export function MobileHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold text-gray-900">Reminiscence</h1>
        </div>

        <div className="flex items-center space-x-4">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
