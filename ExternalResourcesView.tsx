import React, { useState, useEffect } from 'react';
import { Document, ExternalResource } from '../../types';
import { Link, BookOpen, Video, Laptop, ExternalLink, Filter } from 'lucide-react';

interface ExternalResourcesViewProps {
  document: Document;
}

const ExternalResourcesView: React.FC<ExternalResourcesViewProps> = ({ document }) => {
  const [resources, setResources] = useState<ExternalResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to get external resources
    const timer = setTimeout(() => {
      const mockResources: ExternalResource[] = [
        {
          id: '1',
          title: 'Complete Guide to the Topic',
          type: 'article',
          url: 'https://example.com/article1',
          description: 'A comprehensive article covering all aspects of the topic with examples and case studies.'
        },
        {
          id: '2',
          title: 'Video Tutorial Series',
          type: 'video',
          url: 'https://example.com/video1',
          description: 'An in-depth video series explaining key concepts with visual demonstrations.'
        },
        {
          id: '3',
          title: 'Advanced Concepts Textbook',
          type: 'book',
          url: 'https://example.com/book1',
          description: 'A well-reviewed textbook that covers advanced topics and includes practice problems.'
        },
        {
          id: '4',
          title: 'Interactive Learning Course',
          type: 'course',
          url: 'https://example.com/course1',
          description: 'An online course with quizzes, assignments, and guided practice to master the material.'
        },
        {
          id: '5',
          title: 'Recent Research Paper',
          type: 'article',
          url: 'https://example.com/article2',
          description: 'A recent academic paper presenting new findings and analysis on the topic.'
        }
      ];
      
      setResources(mockResources);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [document]);

  const filteredResources = filter 
    ? resources.filter(resource => resource.type === filter)
    : resources;
    
  const resourceTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Link className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'book':
        return <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'course':
        return <Laptop className="h-5 w-5 text-green-600 dark:text-green-400" />;
      default:
        return <Link className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
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
        <p className="mt-4 text-gray-500 dark:text-gray-400">Finding relevant resources...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Link className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
          External Resources
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          We've found these resources that complement and expand on the document content.
        </p>
      </div>
      
      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <div className="text-gray-700 dark:text-gray-300 flex items-center">
            <Filter className="h-4 w-4 mr-1" />
            <span>Filter:</span>
          </div>
          
          <button
            onClick={() => setFilter(null)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === null
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          
          {['article', 'book', 'video', 'course'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-full text-sm flex items-center ${
                filter === type
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {resourceTypeIcon(type)}
              <span className="ml-1 capitalize">{type}s</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Resources list */}
      <div className="space-y-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <div 
              key={resource.id} 
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  {resourceTypeIcon(resource.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {resource.description}
                  </p>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize mr-4">
                      {resource.type}
                    </span>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium flex items-center"
                    >
                      Visit Resource
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <Link className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No resources found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try changing your filter or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExternalResourcesView;