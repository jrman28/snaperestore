
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { MobileHeader } from '@/components/MobileHeader';
import { DesktopHeader } from '@/components/DesktopHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from '@/components/ui/empty-state';
import { LoadingTableRow } from '@/components/ui/loading-card';
import { ShareModal } from '@/components/ShareModal';
import { Download, Share2, Image, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Restoration {
  id: string;
  originalName: string;
  restoredImageUrl: string;
  completedAt: string;
  status: 'completed' | 'processing';
}

const Restorations = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [restorations, setRestorations] = useState<Restoration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedRestoration, setSelectedRestoration] = useState<Restoration | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // Load restorations from localStorage
      const savedRestorations = localStorage.getItem('snaprestore-restorations');
      if (savedRestorations) {
        setRestorations(JSON.parse(savedRestorations));
      } else {
        // Add some sample data for demonstration
        const sampleRestorations: Restoration[] = [{
          id: 'RST-001',
          originalName: 'family_photo_1950.jpg',
          restoredImageUrl: '/placeholder.svg',
          completedAt: new Date().toISOString(),
          status: 'completed'
        }, {
          id: 'RST-002',
          originalName: 'wedding_photo_1960.jpg',
          restoredImageUrl: '/placeholder.svg',
          completedAt: new Date(Date.now() - 86400000).toISOString(),
          status: 'completed'
        }, {
          id: 'RST-003',
          originalName: 'graduation_1975.jpg',
          restoredImageUrl: '/placeholder.svg',
          completedAt: new Date(Date.now() - 172800000).toISOString(),
          status: 'processing'
        }];
        setRestorations(sampleRestorations);
        localStorage.setItem('snaprestore-restorations', JSON.stringify(sampleRestorations));
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = (restoration: Restoration) => {
    // Simulate download
    toast({
      title: "Download started",
      description: `Downloading ${restoration.originalName}`
    });
  };

  const handleShare = (restoration: Restoration) => {
    setSelectedRestoration(restoration);
    setShareModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const restorationsContent = (
    <div className="max-w-7xl mx-auto fade-in">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Restorations</h1>
      </div>
      
      {isLoading ? (
        <Card className="shadow-soft-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Restorations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Restoration ID</TableHead>
                    <TableHead className="font-medium">Original Filename</TableHead>
                    <TableHead className="font-medium">Completion Date</TableHead>
                    <TableHead className="font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <LoadingTableRow key={index} columns={5} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : restorations.length === 0 ? (
        <EmptyState
          icon={Image}
          title="No restorations yet"
          description="Upload your first photo to get started with restoration"
          actionLabel="Start Restoring"
          onAction={() => {/* Navigate to upload */}}
          className="shadow-soft-lg"
        />
      ) : (
        <Card className="shadow-soft-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Restorations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Restoration ID</TableHead>
                    <TableHead className="font-medium">Original Filename</TableHead>
                    <TableHead className="font-medium">Completion Date</TableHead>
                    <TableHead className="font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restorations.map(restoration => (
                    <TableRow key={restoration.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        {getStatusBadge(restoration.status)}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {restoration.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded border overflow-hidden shadow-soft">
                            <img src={restoration.restoredImageUrl} alt={restoration.originalName} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium truncate max-w-xs">
                            {restoration.originalName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(restoration.completedAt).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDownload(restoration)} 
                            disabled={restoration.status !== 'completed'}
                            className="touch-target"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleShare(restoration)} 
                            disabled={restoration.status !== 'completed'}
                            className="touch-target"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedRestoration && (
        <ShareModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          restoration={selectedRestoration}
        />
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <MobileHeader />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {restorationsContent}
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
            {restorationsContent}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Restorations;
