// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './store.js'; // Import default export dari Redux store
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext'; // Pastikan path yang benar


const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <AuthProvider>
          <ToastContainer position="top-left" />
          <App />
      </AuthProvider>
    </Provider>
  );
} else {
  console.error('Root element not found');
}
