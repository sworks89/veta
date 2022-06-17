import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import ErrorBoundary from './components/error_boundary';
import { VetaIdentityProvider } from './contexts/VetaIdentityContext';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <VetaIdentityProvider>
        <App />
      </VetaIdentityProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('app')
);