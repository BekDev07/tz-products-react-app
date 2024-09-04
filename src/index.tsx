import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

// Create a root container using the new API
const container = document.getElementById('root');
const root = createRoot(container!); // ! is used to assert that container is not null

// Render the app with the root container
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
