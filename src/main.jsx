import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './style.css'



// Function to initialize React
const initReact = () => {
  // Try to find the projects-root element first
  let container = document.getElementById('projects-root');
  
  if (!container) {
    console.log('Creating projects-root element...');
    // Create the projects-root element if it doesn't exist
    container = document.createElement('div');
    container.id = 'projects-root';
    container.style.position = 'relative'; // ✅ Add positioning
    
    // Append it to the main element or body
    const mainElement = document.getElementById('main');
    if (mainElement) {
      mainElement.appendChild(container);
    } else {
      document.body.appendChild(container);
    }
  }

  // ✅ Wait for next tick to ensure DOM is ready
  setTimeout(() => {
    try {
      ReactDOM.createRoot(container).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } catch (error) {
      console.error('Failed to render React app:', error);
    }
  }, 100);
};

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReact);
} else {
  initReact();
}