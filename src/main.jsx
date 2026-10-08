import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource-variable/sora';
import '@fontsource-variable/space-grotesk';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/600.css';

import '../tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';

import App from './App.jsx';
import AuthProvider from './auth/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
