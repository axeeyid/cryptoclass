import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './store.js';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'; // ✅ Ganti HashRouter ke BrowserRouter

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter> {/* ✅ Gunakan BrowserRouter untuk Vercel */}
          <App />
          <ToastContainer position="top-left" />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
} else {
  console.error('Root element not found');
}
