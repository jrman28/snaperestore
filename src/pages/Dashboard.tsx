
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { PhotoUpload } from '@/components/PhotoUpload';

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <DashboardHeader />
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Restore Your <span className="text-purple-600">Memories</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Transform your old, damaged photos into stunning restored memories with 
                  our AI-powered restoration technology.
                </p>
              </div>
              <PhotoUpload />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
