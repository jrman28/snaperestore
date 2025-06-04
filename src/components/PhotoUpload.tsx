
import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Camera, X } from 'lucide-react';

interface PhotoUploadProps {
  onImageSelect: (file: File, imageUrl: string) => void;
  selectedFile: File | null;
  imagePreview: string | null;
}

export function PhotoUpload({ onImageSelect, selectedFile, imagePreview }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);

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
      const file = e.dataTransfer.files[0];
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(file, imageUrl);
    }
  }, [onImageSelect]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(file, imageUrl);
    }
  };

  const handleReplaceImage = () => {
    const input = document.getElementById('photo-upload') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleRemoveImage = () => {
    onImageSelect(null as any, null as any);
  };

  if (imagePreview) {
    return (
      <Card className="max-w-2xl mx-auto p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <img
            src={imagePreview}
            alt="Selected photo"
            className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
          />
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button
              onClick={handleReplaceImage}
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white text-xs sm:text-sm"
            >
              <Upload size={14} className="mr-1" />
              Replace
            </Button>
            <Button
              onClick={handleRemoveImage}
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white"
            >
              <X size={14} />
            </Button>
          </div>
        </div>
        
        <div className="mt-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium text-sm sm:text-base truncate">
            {selectedFile?.name}
          </p>
          <p className="text-green-600 text-xs sm:text-sm">
            Ready to restore! Click the restore button below.
          </p>
        </div>

        <input
          type="file"
          id="photo-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto p-6 sm:p-8 lg:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 sm:p-8 lg:p-12 text-center transition-colors
          ${dragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4 lg:space-y-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-lg flex items-center justify-center">
            <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Upload Your Photo
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-md px-4">
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
            className="bg-purple-600 hover:bg-purple-700 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
          >
            <label htmlFor="photo-upload" className="cursor-pointer flex items-center space-x-2">
              <Upload size={16} />
              <span>Choose Image</span>
            </label>
          </Button>

          <p className="text-xs sm:text-sm text-gray-500">
            Supports JPG, PNG, and other common image formats
          </p>
        </div>
      </div>
    </Card>
  );
}
