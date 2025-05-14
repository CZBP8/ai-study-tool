import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Link, FileSpreadsheet, Network, MessageSquare, ArrowLeft } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import NotebookView from '../components/document/NotebookView';
import ExternalResourcesView from '../components/document/ExternalResourcesView';
import MindMapView from '../components/document/MindMapView';
import ChatView from '../components/document/ChatView';
import LoadingSpinner from '../components/ui/LoadingSpinner';

type ViewType = 'notebook' | 'resources' | 'mindmap' | 'chat';

const DocumentViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { documents, setCurrentDocument, currentDocument, isLoading } = useDocuments();
  const [activeView, setActiveView] = useState<ViewType>('notebook');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setCurrentDocument(id);
    }
  }, [id, setCurrentDocument]);

  const handleBack = () => {
    navigate('/past-documents');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!currentDocument) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Document not found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The document you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            Back to Documents
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Documents</span>
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          {currentDocument.name}
        </h1>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-x-4">
          <span>Added {new Date(currentDocument.dateAdded).toLocaleDateString()}</span>
          <span>Source: <span className="capitalize">{currentDocument.source}</span></span>
        </div>
      </div>
      
      {/* View selection tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex -mb-px overflow-x-auto" aria-label="Tabs">
          {[
            { id: 'notebook', label: 'Notebook', icon: <BookOpen className="h-5 w-5" /> },
            { id: 'resources', label: 'External Resources', icon: <Link className="h-5 w-5" /> },
            { id: 'mindmap', label: 'Mind Map', icon: <Network className="h-5 w-5" /> },
            { id: 'chat', label: 'Chat', icon: <MessageSquare className="h-5 w-5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as ViewType)}
              className={`group inline-flex items-center py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeView === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Content area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          {activeView === 'notebook' && <NotebookView document={currentDocument} />}
          {activeView === 'resources' && <ExternalResourcesView document={currentDocument} />}
          {activeView === 'mindmap' && <MindMapView document={currentDocument} />}
          {activeView === 'chat' && <ChatView document={currentDocument} />}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewPage;