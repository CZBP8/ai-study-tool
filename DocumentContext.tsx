import React, { createContext, useContext, useState, useEffect } from 'react';
import { Document } from '../types';

interface DocumentContextType {
  documents: Document[];
  currentDocument: Document | null;
  addDocument: (document: Document) => void;
  setCurrentDocument: (id: string) => void;
  isLoading: boolean;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocument, setCurrentDocumentState] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load documents from localStorage on initial render
  useEffect(() => {
    const storedDocuments = localStorage.getItem('documents');
    if (storedDocuments) {
      setDocuments(JSON.parse(storedDocuments));
    }
  }, []);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents));
  }, [documents]);

  const addDocument = (document: Document) => {
    setDocuments((prev) => [...prev, document]);
  };

  const setCurrentDocument = (id: string) => {
    setIsLoading(true);
    const document = documents.find((doc) => doc.id === id) || null;
    setCurrentDocumentState(document);
    setIsLoading(false);
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        currentDocument,
        addDocument,
        setCurrentDocument,
        isLoading,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};