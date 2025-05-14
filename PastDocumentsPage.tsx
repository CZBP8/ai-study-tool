import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Calendar, Clock, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import { Document } from '../types';

const PastDocumentsPage: React.FC = () => {
  const { documents } = useDocuments();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterSource, setFilterSource] = useState<string | null>(null);

  const handleDocumentClick = (documentId: string) => {
    navigate(`/document/${documentId}`);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get unique sources for filtering
  const uniqueSources = Array.from(new Set(documents.map(doc => doc.source)));

  // Filter and sort documents
  let filteredDocuments = [...documents];
  
  // Apply search filter
  if (searchTerm) {
    filteredDocuments = filteredDocuments.filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Apply source filter
  if (filterSource) {
    filteredDocuments = filteredDocuments.filter(doc => 
      doc.source === filterSource
    );
  }
  
  // Apply sorting
  filteredDocuments.sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.dateAdded).getTime();
      const dateB = new Date(b.dateAdded).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Past Documents
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          {/* Search and filter controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={filterSource || ''}
                  onChange={(e) => setFilterSource(e.target.value || null)}
                  className="appearance-none pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Sources</option>
                  {uniqueSources.map((source) => (
                    <option key={source} value={source}>
                      {source.charAt(0).toUpperCase() + source.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <button
                onClick={() => setSortBy('name')}
                className={`px-3 py-2 border rounded-lg flex items-center ${
                  sortBy === 'name' 
                    ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <FileText className="h-5 w-5 mr-1" />
                <span>Name</span>
              </button>
              
              <button
                onClick={() => setSortBy('date')}
                className={`px-3 py-2 border rounded-lg flex items-center ${
                  sortBy === 'date' 
                    ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Calendar className="h-5 w-5 mr-1" />
                <span>Date</span>
              </button>
              
              <button
                onClick={toggleSortOrder}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {sortOrder === 'asc' ? (
                  <SortAsc className="h-5 w-5" />
                ) : (
                  <SortDesc className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          {/* Documents list */}
          {filteredDocuments.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDocuments.map((document: Document) => (
                <li 
                  key={document.id}
                  onClick={() => handleDocumentClick(document.id)}
                  className="py-4 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors rounded-lg px-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        {document.name}
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Added {formatDate(document.dateAdded)}</span>
                        </div>
                        <div className="mx-2 text-gray-300 dark:text-gray-600">•</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {document.source}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No documents found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {documents.length === 0 
                  ? "You haven't uploaded any documents yet." 
                  : "No documents match your search or filter criteria."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastDocumentsPage;