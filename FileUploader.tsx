import React, { useState } from 'react';
import { ChevronLeft, Upload, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '../context/DocumentContext';
import { Document } from '../types';

interface FileUploaderProps {
  source: 'computer' | 'google-drive' | 'image' | 'video';
  onBack: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ source, onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { addDocument } = useDocuments();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    
    // Simulate file reading and processing
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      // Create intervals to simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // Create a mock document object
          const newDocument: Document = {
            id: Date.now().toString(),
            name: file.name,
            type: file.type,
            content: event.target?.result as string || 'Sample content',
            dateAdded: new Date(),
            source: source
          };
          
          addDocument(newDocument);
          
          // Navigate to the document page
          setTimeout(() => {
            setIsUploading(false);
            navigate(`/document/${newDocument.id}`);
          }, 500);
        }
      }, 100);
    };
    
    reader.readAsText(file);
  };

  const sourceLabel = {
    'computer': 'Computer',
    'google-drive': 'Google Drive',
    'image': 'Image',
    'video': 'Video'
  }[source];

  return (
    <div className="w-full">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        <span>Back</span>
      </button>
      
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Upload from {sourceLabel}
      </h3>
      
      {isUploading ? (
        <div className="space-y-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-center">
            <Loader className="animate-spin h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-gray-700 dark:text-gray-300">Processing document...</span>
          </div>
        </div>
      ) : (
        <>
          <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
          >
            <Upload className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-gray-700 dark:text-gray-300 text-center mb-2">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
              Supported formats: PDF, DOCX, TXT, JPG, PNG
              {source === 'video' && ', MP4, MOV'}
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept={
                source === 'image' 
                  ? 'image/*' 
                  : source === 'video'
                    ? 'video/*'
                    : '.pdf,.docx,.txt,.md'
              }
            />
            <label 
              htmlFor="file-upload" 
              className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer transition-colors"
            >
              Browse Files
            </label>
          </div>
          
          {file && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                Selected file:
              </p>
              <p className="text-gray-600 dark:text-gray-400 truncate">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
              <button
                onClick={handleUpload}
                className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Upload & Analyze
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FileUploader;