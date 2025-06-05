
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
    <div 
      className="min-h-screen relative"
      style={{
        backgroundColor: '#faf9ff',
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.15) 1px, transparent 0),
          radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0)
        `,
        backgroundSize: '24px 24px, 48px 48px',
        backgroundPosition: '0 0, 12px 12px'
      }}
    >
      <Header onSignInClick={handleSignInClick} onSignUpClick={handleSignUpClick} />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Hero Content */}
          <div className="space-y-8 fade-in">
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
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-soft-lg hover:shadow-soft-xl touch-target"
              >
                Start Restoring Photos
              </button>
            </div>
          </div>
          
          {/* Right Column - Before/After Demo */}
          <div className="space-y-6 fade-in">
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
      <footer className="bg-white/90 backdrop-blur-sm border-t border-gray-200 mt-20 relative z-10 shadow-soft">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © 2024 SnapRestore. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors touch-target">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors touch-target">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors touch-target">Contact</a>
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
