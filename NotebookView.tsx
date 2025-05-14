import React, { useState, useEffect } from 'react';
import { Document, NotebookPage } from '../../types';
import { Book, ChevronLeft, ChevronRight } from 'lucide-react';

interface NotebookViewProps {
  document: Document;
}

const NotebookView: React.FC<NotebookViewProps> = ({ document }) => {
  const [pages, setPages] = useState<NotebookPage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to generate notebook pages
    const timer = setTimeout(() => {
      const generatedPages: NotebookPage[] = [
        {
          id: '1',
          title: 'Summary',
          content: `This notebook summarizes key points from "${document.name}". The document covers important concepts that we've organized into a structured format for easier learning and retention.`,
          order: 1
        },
        {
          id: '2',
          title: 'Key Concepts',
          content: 'Here are the main concepts covered in the document:\n\n- Concept 1: Description and explanation\n- Concept 2: Description and explanation\n- Concept 3: Description and explanation',
          order: 2
        },
        {
          id: '3',
          title: 'Important Details',
          content: 'This section highlights important details that support the main concepts:\n\n1. Detail point one\n2. Detail point two\n3. Detail point three\n\nThese details provide context and depth to the key concepts.',
          order: 3
        },
        {
          id: '4',
          title: 'Study Questions',
          content: 'Test your understanding with these questions:\n\n1. Question about concept 1?\n2. Question about concept 2?\n3. Question about the relationship between concepts?',
          order: 4
        }
      ];
      
      setPages(generatedPages);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [document]);

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Generating notebook layout...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Book className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
          Notebook Layout
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          We've created a structured notebook for better organization and understanding of the document.
        </p>
      </div>
      
      {/* Notebook view */}
      <div className="mt-6 flex flex-col items-center">
        {/* Page navigation */}
        <div className="flex items-center justify-between w-full mb-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className={`flex items-center px-3 py-2 rounded-lg ${
              currentPage === 0
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous Page
          </button>
          
          <span className="text-gray-700 dark:text-gray-300">
            Page {currentPage + 1} of {pages.length}
          </span>
          
          <button
            onClick={goToNextPage}
            disabled={currentPage === pages.length - 1}
            className={`flex items-center px-3 py-2 rounded-lg ${
              currentPage === pages.length - 1
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Next Page
            <ChevronRight className="h-5 w-5 ml-1" />
          </button>
        </div>
        
        {/* Notebook page */}
        <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Page header */}
          <div className="bg-blue-50 dark:bg-blue-900 p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {pages[currentPage]?.title || 'Untitled Page'}
            </h3>
          </div>
          
          {/* Page content */}
          <div className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              {pages[currentPage]?.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotebookView;