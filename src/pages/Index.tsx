
import React, { useState } from 'react';
import Header from '@/components/Header';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import AuthModal from '@/components/AuthModal';
import FeatureList from '@/components/FeatureList';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleSignInClick = () => {
    setAuthMode('signin');
    setIsModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthMode('signup');
    setIsModalOpen(true);
  };

  const handleSwitchMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header onSignInClick={handleSignInClick} onSignUpClick={handleSignUpClick} />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Restore the Heart of
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  Your Family Photos
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Give any photo—from faded black & white to timeworn snapshots—a fresh, modern look with our elegant AI-powered restoration. Rediscover the beauty in every memory, no matter its age or condition.
              </p>
            </div>
            
            <FeatureList />
            
            <div className="pt-4">
              <button
                onClick={handleSignUpClick}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Restoring Photos
              </button>
            </div>
          </div>
          
          {/* Right Column - Before/After Demo */}
          <div className="space-y-6">
            <BeforeAfterSlider />
            
            <div className="text-center space-y-2">
              <p className="text-gray-600">
                ✨ Powered by advanced AI technology
              </p>
              <p className="text-sm text-gray-500">
                See the transformation in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © 2024 Reminiscence. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
      
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={authMode}
        onSwitchMode={handleSwitchMode}
      />
    </div>
  );
};

export default Index;
