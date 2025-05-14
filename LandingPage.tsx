import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, HardDrive, Image, Video } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import FileUploader from '../components/FileUploader';

const LandingPage: React.FC = () => {
  const [uploadSource, setUploadSource] = useState<'computer' | 'google-drive' | 'image' | 'video' | null>(null);
  const { documents } = useDocuments();
  const navigate = useNavigate();

  const handlePastDocumentsClick = () => {
    navigate('/past-documents');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Your AI-Powered Learning Assistant
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Upload your study materials and let our AI help you understand, organize, and retain information more effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Upload option */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-6">
              <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
              Upload Document
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Upload a new document from your device, Google Drive, or extract text from images and videos.
            </p>
            
            {uploadSource ? (
              <FileUploader source={uploadSource} onBack={() => setUploadSource(null)} />
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setUploadSource('computer')}
                  className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <HardDrive className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300">From Computer</span>
                </button>
                
                <button
                  onClick={() => setUploadSource('google-drive')}
                  className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <FileText className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300">From Google Drive</span>
                </button>
                
                <button
                  onClick={() => setUploadSource('image')}
                  className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Image className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300">From Image</span>
                </button>
                
                <button
                  onClick={() => setUploadSource('video')}
                  className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Video className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300">From Video</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Past documents option */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full mx-auto mb-6">
              <FileText className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
              Past Documents
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Access your previously uploaded documents and continue where you left off.
            </p>
            
            {documents.length > 0 ? (
              <div className="space-y-4">
                <ul className="space-y-2 mb-4">
                  {documents.slice(0, 3).map((doc) => (
                    <li key={doc.id} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-gray-700 dark:text-gray-300 truncate">{doc.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                {documents.length > 3 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    +{documents.length - 3} more documents
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center italic">
                No documents uploaded yet
              </p>
            )}
            
            <button
              onClick={handlePastDocumentsClick}
              className="mt-6 w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors"
            >
              View All Documents
            </button>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Powerful Learning Tools at Your Fingertips
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "External Resources",
              description: "Discover relevant books, articles, and videos related to your document.",
              icon: <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            },
            {
              title: "Notebook Layout",
              description: "Get a structured notebook layout to help organize your thoughts and notes.",
              icon: <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            },
            {
              title: "Mind Maps",
              description: "Visualize concepts and their relationships for better understanding.",
              icon: <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
            },
            {
              title: "Knowledge Testing",
              description: "Chat with our AI to test and reinforce your understanding of the material.",
              icon: <FileText className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;