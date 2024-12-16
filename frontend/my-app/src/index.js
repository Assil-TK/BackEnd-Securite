import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from react-dom/client
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Use createRoot instead of render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
