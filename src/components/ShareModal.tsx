
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Mail, MessageCircle, Share2, Eye, Clock, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restoration: {
    id: string;
    originalName: string;
    restoredImageUrl: string;
  };
}

export function ShareModal({ open, onOpenChange, restoration }: ShareModalProps) {
  const { toast } = useToast();
  const [shareSettings, setShareSettings] = useState({
    allowDownload: true,
    expiresIn: '7days',
    password: ''
  });

  const shareUrl = `https://snaprestore.app/shared/${restoration.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Share link has been copied to your clipboard"
    });
  };

  const handleEmailShare = () => {
    const subject = `Check out my restored photo: ${restoration.originalName}`;
    const body = `I've restored this old photo using SnapRestore! Take a look: ${shareUrl}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleSocialShare = (platform: string) => {
    const text = `Check out my restored photo: ${restoration.originalName}`;
    const url = shareUrl;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`);
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share Restored Photo</span>
          </DialogTitle>
          <DialogDescription>
            Share your beautifully restored photo with friends and family
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded border overflow-hidden shadow-soft">
                  <img 
                    src={restoration.restoredImageUrl} 
                    alt={restoration.originalName} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {restoration.originalName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Restored with SnapRestore
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share Options */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Share Settings</Label>
              <div className="mt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Allow download</span>
                  </div>
                  <Switch
                    checked={shareSettings.allowDownload}
                    onCheckedChange={(checked) => 
                      setShareSettings(prev => ({ ...prev, allowDownload: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Link expires in 7 days</span>
                  </div>
                  <Eye className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Share Link */}
            <div className="space-y-2">
              <Label htmlFor="share-link" className="text-sm font-medium">Share Link</Label>
              <div className="flex space-x-2">
                <Input
                  id="share-link"
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                />
                <Button size="sm" onClick={handleCopyLink} className="px-3">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Quick Share</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEmailShare}
                  className="justify-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSocialShare('whatsapp')}
                  className="justify-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleCopyLink} className="bg-purple-600 hover:bg-purple-700">
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
