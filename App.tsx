import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import PastDocumentsPage from './pages/PastDocumentsPage';
import DocumentViewPage from './pages/DocumentViewPage';
import { DocumentProvider } from './context/DocumentContext';

function App() {
  return (
    <DocumentProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/past-documents" element={<PastDocumentsPage />} />
            <Route path="/document/:id" element={<DocumentViewPage />} />
          </Routes>
        </Layout>
      </Router>
    </DocumentProvider>
  );
}

export default App;