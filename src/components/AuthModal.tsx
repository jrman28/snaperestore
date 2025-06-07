
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Github, Apple } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [showMagicLink, setShowMagicLink] = useState(false);

  const handleMagicLinkSend = () => {
    console.log('Sending magic link to:', email);
    setShowMagicLink(true);
    // Here you would integrate with Supabase to send the magic link
  };

  const handleOAuthProvider = (provider: string) => {
    console.log(`Authenticating with ${provider}`);
    // Here you would integrate with Supabase OAuth
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Get Started
          </DialogTitle>
          <p className="text-center text-gray-600">
            Sign in or create your account to start restoring photos
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-4">
            {/* Primary OAuth Options */}
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full h-12 text-base"
                onClick={() => handleOAuthProvider('google')}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full h-12 text-base"
                onClick={() => handleOAuthProvider('github')}
              >
                <Github className="w-5 h-5 mr-3" />
                Continue with GitHub
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full h-12 text-base"
                onClick={() => handleOAuthProvider('apple')}
              >
                <Apple className="w-5 h-5 mr-3" />
                Continue with Apple
              </Button>
            </div>
            
            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">or</span>
              </div>
            </div>
            
            {/* Magic Link Section */}
            {!showMagicLink ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <Button 
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700"
                  onClick={handleMagicLinkSend}
                  disabled={!email}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Continue with Email
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-3 py-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg">Check your email</h3>
                <p className="text-gray-600 text-sm">
                  We've sent a magic link to <strong>{email}</strong>
                </p>
                <p className="text-gray-500 text-xs">
                  Click the link in your email to continue
                </p>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowMagicLink(false)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  Use a different email
                </Button>
              </div>
            )}
            
            <div className="text-center text-xs text-gray-500 pt-4">
              <p>Your photos are private, secure, and never shared</p>
              <p className="mt-1">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
