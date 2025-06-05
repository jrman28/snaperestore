
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { MobileHeader } from '@/components/MobileHeader';
import { DesktopHeader } from '@/components/DesktopHeader';
import { MobileNav } from '@/components/MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, Image, Calendar, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Restoration {
  id: string;
  originalName: string;
  restoredImageUrl: string;
  completedAt: string;
  status: 'completed' | 'processing' | 'failed';
}

const Restorations = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [restorations, setRestorations] = useState<Restoration[]>([]);

  useEffect(() => {
    // Load restorations from localStorage
    const savedRestorations = localStorage.getItem('reminiscence-restorations');
    if (savedRestorations) {
      setRestorations(JSON.parse(savedRestorations));
    } else {
      // Add some sample data for demonstration
      const sampleRestorations: Restoration[] = [
        {
          id: '1',
          originalName: 'family_photo_1950.jpg',
          restoredImageUrl: '/placeholder.svg',
          completedAt: new Date().toISOString(),
          status: 'completed'
        },
        {
          id: '2',
          originalName: 'wedding_photo_1960.jpg',
          restoredImageUrl: '/placeholder.svg',
          completedAt: new Date(Date.now() - 86400000).toISOString(),
          status: 'completed'
        }
      ];
      setRestorations(sampleRestorations);
      localStorage.setItem('reminiscence-restorations', JSON.stringify(sampleRestorations));
    }
  }, []);

  const handleDownload = (restoration: Restoration) => {
    // Simulate download
    toast({
      title: "Download started",
      description: `Downloading ${restoration.originalName}`,
    });
  };

  const handleShare = (restoration: Restoration) => {
    if (navigator.share) {
      navigator.share({
        title: 'Restored Photo',
        text: `Check out my restored photo: ${restoration.originalName}`,
        url: restoration.restoredImageUrl,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(restoration.restoredImageUrl);
      toast({
        title: "Link copied",
        description: "Restoration link copied to clipboard",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const restorationsContent = (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">My Restorations</h1>
      
      {restorations.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent className="pt-6">
            <Image className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No restorations yet</h3>
            <p className="text-gray-600 mb-4">Upload your first photo to get started with restoration</p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Start Restoring
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restorations.map((restoration) => (
            <Card key={restoration.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video bg-gray-100 relative">
                <img
                  src={restoration.restoredImageUrl}
                  alt={restoration.originalName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  {getStatusBadge(restoration.status)}
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-base truncate" title={restoration.originalName}>
                  {restoration.originalName}
                </CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(restoration.completedAt).toLocaleDateString()}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleDownload(restoration)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleShare(restoration)}
                    className="flex-1"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <MobileHeader />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-20">
          {restorationsContent}
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
            {restorationsContent}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Restorations;
