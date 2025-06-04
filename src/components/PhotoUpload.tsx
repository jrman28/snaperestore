
import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera } from 'lucide-react';

export function PhotoUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-12">
      <div
        className={`
          border-2 border-dashed rounded-lg p-12 text-center transition-colors
          ${dragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300'}
          ${selectedFile ? 'border-green-400 bg-green-50' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
            <Camera className="w-8 h-8 text-purple-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              Upload Your Photo
            </h3>
            <p className="text-gray-600 max-w-md">
              Drag and drop your image here, or click to browse. We'll restore it to its former glory.
            </p>
          </div>

          <input
            type="file"
            id="photo-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
          
          <Button 
            asChild
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3"
          >
            <label htmlFor="photo-upload" className="cursor-pointer flex items-center space-x-2">
              <Upload size={16} />
              <span>Choose Image</span>
            </label>
          </Button>

          <p className="text-sm text-gray-500">
            Supports JPG, PNG, and other common image formats
          </p>
        </div>
      </div>

      {selectedFile && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            Selected: {selectedFile.name}
          </p>
          <p className="text-green-600 text-sm">
            Ready to restore! Click process to begin.
          </p>
        </div>
      )}
    </Card>
  );
}
