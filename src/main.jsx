import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// Create a client with transition support
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      refetchOnWindowFocus: true,
      suspense: true // Enable suspense mode
    },
    mutations: {
      useErrorBoundary: true
    }
  }
});

// Create root with concurrent features
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render with Suspense and transitions
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.Suspense>
  </React.StrictMode>
);
