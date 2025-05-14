import React, { useState, useEffect } from 'react';
import { Document, MindMapNode } from '../../types';
import { Network, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface MindMapViewProps {
  document: Document;
}

const MindMapView: React.FC<MindMapViewProps> = ({ document }) => {
  const [mindMap, setMindMap] = useState<MindMapNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    // Simulate API call to generate mind map
    const timer = setTimeout(() => {
      const mockMindMap: MindMapNode = {
        id: 'root',
        label: document.name.split('.')[0],
        children: [
          {
            id: 'node1',
            label: 'Main Concept 1',
            children: [
              { id: 'node1-1', label: 'Subconcept 1.1' },
              { id: 'node1-2', label: 'Subconcept 1.2' },
              { id: 'node1-3', label: 'Subconcept 1.3' }
            ]
          },
          {
            id: 'node2',
            label: 'Main Concept 2',
            children: [
              { id: 'node2-1', label: 'Subconcept 2.1' },
              { id: 'node2-2', label: 'Subconcept 2.2' }
            ]
          },
          {
            id: 'node3',
            label: 'Main Concept 3',
            children: [
              { id: 'node3-1', label: 'Subconcept 3.1' },
              { id: 'node3-2', label: 'Subconcept 3.2' },
              { id: 'node3-3', label: 'Subconcept 3.3' },
              { id: 'node3-4', label: 'Subconcept 3.4' }
            ]
          }
        ]
      };
      
      setMindMap(mockMindMap);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [document]);

  const increaseZoom = () => {
    if (zoomLevel < 1.5) {
      setZoomLevel(zoomLevel + 0.1);
    }
  };

  const decreaseZoom = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  const renderNode = (node: MindMapNode, level: number) => {
    const paddingLeft = level * 40;
    const bgColor = level === 0 
      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
      : level === 1 
        ? 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200'
        : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
    
    return (
      <div key={node.id} style={{ paddingLeft }} className="my-2">
        <div className={`inline-block px-4 py-2 rounded-lg ${bgColor} font-medium`}>
          {node.label}
        </div>
        
        {node.children && node.children.length > 0 && (
          <div className="mt-2 border-l-2 border-gray-300 dark:border-gray-600 ml-6">
            {node.children.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
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
        <p className="mt-4 text-gray-500 dark:text-gray-400">Generating mind map...</p>
      </div>
    );
  }

  if (!mindMap) {
    return (
      <div className="text-center py-10">
        <Network className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          Couldn't generate mind map
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          We had trouble creating a mind map from this document.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Network className="h-6 w-6 mr-2 text-purple-600 dark:text-purple-400" />
          Mind Map
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          This visual representation helps you understand relationships between key concepts.
        </p>
      </div>
      
      {/* Zoom controls */}
      <div className="flex items-center justify-end mb-4 gap-2">
        <button
          onClick={decreaseZoom}
          className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        
        <button
          onClick={resetZoom}
          className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        
        <button
          onClick={increaseZoom}
          className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(zoomLevel * 100)}%
        </span>
      </div>
      
      {/* Mind map visualization */}
      <div className="overflow-auto p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-850 min-h-[400px]">
        <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left', transition: 'transform 0.2s' }}>
          {renderNode(mindMap, 0)}
        </div>
      </div>
    </div>
  );
};

export default MindMapView;