
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Share2, CheckCircle } from 'lucide-react';

interface SuccessResultProps {
  restoredImage: string;
  onDownload: () => void;
  onShare: () => void;
}

export function SuccessResult({ restoredImage, onDownload, onShare }: SuccessResultProps) {
  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-2 text-green-600 mb-4">
        <CheckCircle size={24} />
        <h3 className="text-xl font-semibold">Restoration Complete</h3>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          <span>Completed on {new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Completed</span>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <Button onClick={onDownload} className="bg-purple-600 hover:bg-purple-700 flex-1">
          <Download size={16} className="mr-2" />
          Download Restored Image
        </Button>
        <Button onClick={onShare} variant="outline" className="flex-1">
          <Share2 size={16} className="mr-2" />
          Share Result
        </Button>
      </div>

      <div className="border-t pt-6">
        <h4 className="font-semibold text-gray-900 mb-3">Restoration Details</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Enhanced image clarity and sharpness</li>
          <li>• Reduced noise and artifacts</li>
          <li>• Improved color balance and contrast</li>
          <li>• Preserved original image dimensions</li>
        </ul>
      </div>
    </Card>
  );
}
