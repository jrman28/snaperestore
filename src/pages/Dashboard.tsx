
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { MobileHeader } from '@/components/MobileHeader';
import { DesktopHeader } from '@/components/DesktopHeader';
import { PhotoUpload } from '@/components/PhotoUpload';
import { RestoreButton } from '@/components/RestoreButton';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { RestoreSlider } from '@/components/RestoreSlider';
import { SuccessResult } from '@/components/SuccessResult';
import { MobileNav } from '@/components/MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { RotateCcw, Sparkles } from 'lucide-react';

type RestoreState = 'upload' | 'ready' | 'loading' | 'comparing' | 'complete';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [restoreState, setRestoreState] = useState<RestoreState>('upload');
  const isMobile = useIsMobile();

  const handleImageSelect = (file: File, imageUrl: string) => {
    setSelectedFile(file);
    setImagePreview(imageUrl);
    setRestoreState(file ? 'ready' : 'upload');
  };

  const handleRestore = async () => {
    setRestoreState('loading');
    
    // Simulate restoration process
    setTimeout(() => {
      // For demo purposes, we'll use a placeholder restored image
      // In a real app, this would be the result from your AI restoration API
      setRestoredImage(imagePreview); // Using same image for demo
      setRestoreState('comparing');
    }, 3000);
  };

  const handleViewResult = () => {
    setRestoreState('complete');
  };

  const handleDownload = () => {
    if (restoredImage) {
      const link = document.createElement('a');
      link.href = restoredImage;
      link.download = `restored_${selectedFile?.name || 'image.jpg'}`;
      link.click();
    }
  };

  const handleShare = () => {
    if (navigator.share && restoredImage) {
      navigator.share({
        title: 'My Restored Photo',
        text: 'Check out my restored photo!',
        url: restoredImage,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleStartOver = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setRestoredImage(null);
    setRestoreState('upload');
  };

  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <MobileHeader />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 lg:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Restore Your <span className="text-purple-600">Memories</span>
              </h1>
              <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Transform your old, damaged photos into stunning restored memories with 
                our AI-powered restoration technology.
              </p>
            </div>

            {restoreState === 'upload' || restoreState === 'ready' ? (
              <>
                <PhotoUpload 
                  onImageSelect={handleImageSelect}
                  selectedFile={selectedFile}
                  imagePreview={imagePreview}
                />
                {restoreState === 'ready' && (
                  <div className="mb-6">
                    <RestoreButton onRestore={handleRestore} />
                  </div>
                )}
              </>
            ) : restoreState === 'loading' ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 lg:p-12 shadow-lg">
                <LoadingSpinner />
              </div>
            ) : restoreState === 'comparing' ? (
              <div className="space-y-6 mb-6">
                <RestoreSlider 
                  originalImage={imagePreview!}
                  restoredImage={restoredImage!}
                />
                <div className="text-center">
                  <button
                    onClick={handleViewResult}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 lg:px-8 py-2 lg:py-3 rounded-lg font-medium text-sm lg:text-base"
                  >
                    View Final Result
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 mb-6">
                <SuccessResult 
                  restoredImage={restoredImage!}
                  onDownload={handleDownload}
                  onShare={handleShare}
                />
                <div className="text-center">
                  <Button
                    onClick={handleStartOver}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <RotateCcw className="mr-2" size={16} />
                    <Sparkles className="mr-2" size={16} />
                    Restore Another Photo
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <MobileNav />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <DesktopHeader />
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

              {restoreState === 'upload' || restoreState === 'ready' ? (
                <>
                  <PhotoUpload 
                    onImageSelect={handleImageSelect}
                    selectedFile={selectedFile}
                    imagePreview={imagePreview}
                  />
                  {restoreState === 'ready' && (
                    <RestoreButton onRestore={handleRestore} />
                  )}
                </>
              ) : restoreState === 'loading' ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 shadow-lg">
                  <LoadingSpinner />
                </div>
              ) : restoreState === 'comparing' ? (
                <div className="space-y-6">
                  <RestoreSlider 
                    originalImage={imagePreview!}
                    restoredImage={restoredImage!}
                  />
                  <div className="text-center">
                    <button
                      onClick={handleViewResult}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium"
                    >
                      View Final Result
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <SuccessResult 
                    restoredImage={restoredImage!}
                    onDownload={handleDownload}
                    onShare={handleShare}
                  />
                  <div className="text-center">
                    <Button
                      onClick={handleStartOver}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <RotateCcw className="mr-2" size={20} />
                      <Sparkles className="mr-2" size={20} />
                      Restore Another Photo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
