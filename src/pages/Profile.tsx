
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { MobileHeader } from '@/components/MobileHeader';
import { DesktopHeader } from '@/components/DesktopHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Crown, User, Mail, Calendar, Image, Download, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleUpdateProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Please contact support to complete account deletion.",
      variant: "destructive",
    });
  };

  const profileContent = (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Profile</h1>
      
      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Account Information</span>
          </CardTitle>
          <CardDescription>
            Manage your personal information and account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" defaultValue="Sarah" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" defaultValue="Johnson" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="sarah.johnson@example.com" />
          </div>
          <Button onClick={handleUpdateProfile} className="bg-purple-600 hover:bg-purple-700">
            Update Profile
          </Button>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Image className="w-5 h-5" />
            <span>Usage Statistics</span>
          </CardTitle>
          <CardDescription>
            Track your photo restoration activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600">Photos Restored</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Downloads</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Days Active</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="w-5 h-5" />
            <span>Plan Information</span>
          </CardTitle>
          <CardDescription>
            Your current subscription and billing details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Free Plan</span>
                <Badge variant="secondary">Current</Badge>
              </div>
              <div className="text-sm text-gray-600 mt-1">5 restorations per month</div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>
          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Next billing date: Not applicable (Free Plan)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>
            Manage your account settings and data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              className="flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <MobileHeader />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {profileContent}
        </div>
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
            {profileContent}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
