"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/toast";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  maxSize?: number; // in MB
}

const ImageUpload = ({ 
  value, 
  onChange, 
  multiple = false, 
  maxFiles = 1,
  accept = "image/*",
  maxSize = 5 
}: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string[]>(value ? [value] : []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    // Validate file size
    const oversizedFiles = fileArray.filter(file => file.size > maxSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      showToast.error(`Some files exceed ${maxSize}MB limit`);
      return;
    }

    // Validate file count
    if (fileArray.length > maxFiles) {
      showToast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setIsUploading(true);
    
    try {
      // For demo purposes, we'll use a placeholder URL
      // In production, you'd upload to your cloud storage
      const uploadPromises = fileArray.map(async (file) => {
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create object URL for preview
        const objectUrl = URL.createObjectURL(file);
        return objectUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      if (multiple) {
        setPreview(prev => [...prev, ...uploadedUrls]);
        onChange(uploadedUrls.join(','));
      } else {
        setPreview([uploadedUrls[0]]);
        onChange(uploadedUrls[0]);
      }

      showToast.success('Images uploaded successfully!');
    } catch {
      showToast.error('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const removeImage = (index: number) => {
    const newPreview = preview.filter((_, i) => i !== index);
    setPreview(newPreview);
    onChange(newPreview.join(','));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
            {isUploading ? (
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
          </div>
          
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {accept} up to {maxSize}MB {multiple && `(max ${maxFiles} files)`}
            </p>
          </div>
        </div>
      </div>

      {/* URL Input Alternative */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
        <span className="text-xs text-gray-500 dark:text-gray-400 px-2">OR</span>
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
      </div>
      
      <input
        type="url"
        placeholder="Enter image URL"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        onChange={(e) => {
          if (e.target.value) {
            onChange(e.target.value);
            setPreview([e.target.value]);
          }
        }}
      />

      {/* Preview */}
      {preview.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Preview</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {preview.map((url, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={() => {
                      // Handle image load error
                      setPreview(prev => prev.filter((_, i) => i !== index));
                      showToast.error('Failed to load image');
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                </div>
                
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;