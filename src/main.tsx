import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register service worker for PWA capabilities
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('Service worker registration skipped:', err);
    });
  });
}

// Global Diagnostics Event Hub
export interface DiagnosticLog {
  id: string;
  time: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  source?: string;
}

const initialLogs: DiagnosticLog[] = [];

if (typeof window !== 'undefined') {
  (window as unknown as { __SAI_LOGS__: DiagnosticLog[] }).__SAI_LOGS__ = initialLogs;

  window.addEventListener('error', (event) => {
    const log: DiagnosticLog = {
      id: Math.random().toString(36).substring(2, 9),
      time: new Date().toLocaleTimeString(),
      type: 'error',
      message: event.message || 'Script error',
      source: event.filename ? `${event.filename}:${event.lineno}` : undefined,
    };
    (window as unknown as { __SAI_LOGS__: DiagnosticLog[] }).__SAI_LOGS__.push(log);
    window.dispatchEvent(new CustomEvent('saipratap_log_added', { detail: log }));
  });

  window.addEventListener('unhandledrejection', (event) => {
    const log: DiagnosticLog = {
      id: Math.random().toString(36).substring(2, 9),
      time: new Date().toLocaleTimeString(),
      type: 'error',
      message: typeof event.reason === 'string' ? event.reason : event.reason?.message || 'Unhandled Promise rejection',
      source: 'Promise Async',
    };
    (window as unknown as { __SAI_LOGS__: DiagnosticLog[] }).__SAI_LOGS__.push(log);
    window.dispatchEvent(new CustomEvent('saipratap_log_added', { detail: log }));
  });
}

const rootEl = document.getElementById('root');

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // Smoothly dismiss the preloader once React has mounted
  setTimeout(() => {
    const preloader = document.getElementById('app-preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.pointerEvents = 'none';
      setTimeout(() => preloader.remove(), 400);
    }
  }, 150);
}
