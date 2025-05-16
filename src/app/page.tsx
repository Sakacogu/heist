'use client';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './app';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}